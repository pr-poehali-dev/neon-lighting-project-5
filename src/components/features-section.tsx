import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Детекция читов в реальном времени",
    description: "Система мгновенно обнаруживает запрещённое ПО, инъекции и модификации памяти без задержек в игре.",
    icon: "brain",
    badge: "Real-time",
  },
  {
    title: "Защита от обхода",
    description: "Многоуровневая архитектура не позволяет читерам обойти проверку — даже с использованием спуферов.",
    icon: "lock",
    badge: "Anti-bypass",
  },
  {
    title: "Лёгкий запуск",
    description: "Одно нажатие — утилита запускается и работает в фоне, не влияя на производительность системы.",
    icon: "globe",
    badge: "Просто",
  },
  {
    title: "ИИ-анализ поведения",
    description: "Машинное обучение отслеживает подозрительные паттерны действий и автоматически блокирует нарушителей.",
    icon: "zap",
    badge: "AI",
  },
  {
    title: "Облачная база данных",
    description: "Постоянно обновляемая облачная база сигнатур защищает от новых читов сразу после их появления.",
    icon: "link",
    badge: "Облако",
  },
  {
    title: "Совместимость с играми",
    description: "Поддержка всех популярных игровых платформ и движков — без конфликтов с легитимным ПО.",
    icon: "target",
    badge: "Универсал",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Защита нового поколения</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            MajesticGuard использует передовые технологии, чтобы сделать читерство невозможным
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">
                    {feature.icon === "brain" && "&#129504;"}
                    {feature.icon === "lock" && "&#128274;"}
                    {feature.icon === "globe" && "&#127760;"}
                    {feature.icon === "zap" && "&#9889;"}
                    {feature.icon === "link" && "&#128279;"}
                    {feature.icon === "target" && "&#127919;"}
                  </span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}