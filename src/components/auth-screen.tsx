import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Icon from "@/components/ui/icon"

const AUTH_URL = "https://functions.poehali.dev/8d3c32c4-d4be-4a50-aa01-439a9a50753e"

interface AuthScreenProps {
  onSuccess: (user: { id: number; username: string }) => void
}

export function AuthScreen({ onSuccess }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: mode, username, password }),
      })
      const data = await res.json()
      const parsed = typeof data === "string" ? JSON.parse(data) : data

      if (!res.ok) {
        setError(parsed.error || "Ошибка")
      } else {
        localStorage.setItem("mg_user", JSON.stringify(parsed.user))
        onSuccess(parsed.user)
      }
    } catch {
      setError("Ошибка соединения")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* bg glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-orbitron text-3xl font-bold text-white">
            Majestic<span className="text-red-500">Guard</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-space-mono">Программа для проверки на читы для MajesticRP</p>
        </div>

        {/* Card */}
        <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8">
          {/* Tabs */}
          <div className="flex rounded-lg overflow-hidden border border-white/10 mb-8">
            <button
              onClick={() => { setMode("login"); setError("") }}
              className={`flex-1 py-2.5 text-sm font-semibold font-orbitron transition-colors ${
                mode === "login" ? "bg-red-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => { setMode("register"); setError("") }}
              className={`flex-1 py-2.5 text-sm font-semibold font-orbitron transition-colors ${
                mode === "register" ? "bg-red-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5 font-space-mono">Логин</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите логин"
                className="bg-black border-white/10 text-white placeholder:text-gray-600 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5 font-space-mono">Пароль</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                className="bg-black border-white/10 text-white placeholder:text-gray-600 focus:border-red-500"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm font-space-mono bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <Icon name="AlertCircle" size={14} />
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold font-orbitron py-3 h-auto mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  {mode === "login" ? "Вход..." : "Регистрация..."}
                </span>
              ) : (
                mode === "login" ? "Войти" : "Зарегистрироваться"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
