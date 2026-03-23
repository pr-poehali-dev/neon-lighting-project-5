import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "MajesticGuard влияет на производительность в игре?",
      answer:
        "Нет. Утилита работает в фоне с минимальной нагрузкой на систему — менее 1% CPU. Вы не заметите никакой разницы в FPS или отклике.",
    },
    {
      question: "С какими играми совместим MajesticGuard?",
      answer:
        "MajesticGuard поддерживает все популярные онлайн-игры: CS2, Rust, GTA:SA-MP, MTA, Minecraft и многие другие. Список постоянно пополняется.",
    },
    {
      question: "Может ли читер обойти защиту?",
      answer:
        "Многоуровневая архитектура с ИИ-анализом поведения делает обход крайне сложным. База сигнатур обновляется в облаке в режиме реального времени.",
    },
    {
      question: "Как происходит бан нарушителя?",
      answer:
        "При обнаружении нарушения система автоматически фиксирует доказательства, формирует отчёт и применяет бан. Администратор получает уведомление с деталями.",
    },
    {
      question: "Как скачать и установить MajesticGuard?",
      answer:
        "Достаточно нажать кнопку «Скачать» на сайте, запустить установщик и следовать инструкциям. Весь процесс занимает менее двух минут.",
    },
    {
      question: "MajesticGuard бесплатный?",
      answer:
        "Базовая версия абсолютно бесплатна. Для игровых серверов и организаторов турниров доступна Pro-версия с расширенными функциями и API.",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Частые вопросы</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Всё, что нужно знать о MajesticGuard — установка, совместимость и принцип работы защиты.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-red-500/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-space-mono">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}