"""Аутентификация пользователей — регистрация и вход"""
import json
import os
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    raw_body = event.get("body") or "{}"
    if isinstance(raw_body, dict):
        body = raw_body
    else:
        try:
            body = json.loads(raw_body)
            if isinstance(body, str):
                body = json.loads(body)
        except Exception:
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Invalid JSON"})}

    action = body.get("action")
    username = (body.get("username") or "").strip()
    password = body.get("password") or ""

    if not username or not password:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Логин и пароль обязательны"})}

    conn = get_conn()
    cur = conn.cursor()

    if action == "register":
        cur.execute("SELECT id FROM users WHERE username = %s", (username,))
        if cur.fetchone():
            conn.close()
            return {"statusCode": 409, "headers": headers, "body": json.dumps({"error": "Пользователь уже существует"})}

        cur.execute(
            "INSERT INTO users (username, password) VALUES (%s, %s) RETURNING id",
            (username, password)
        )
        user_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"ok": True, "user": {"id": user_id, "username": username}})
        }

    elif action == "login":
        cur.execute("SELECT id, username FROM users WHERE username = %s AND password = %s", (username, password))
        row = cur.fetchone()
        conn.close()
        if not row:
            return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Неверный логин или пароль"})}
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"ok": True, "user": {"id": row[0], "username": row[1]}})
        }

    else:
        conn.close()
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Unknown action"})}