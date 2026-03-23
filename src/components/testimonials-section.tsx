import Icon from "@/components/ui/icon"
import { Button } from "@/components/ui/button"

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">
          Скачать <span className="text-red-500">MajesticGuard</span>
        </h2>
        <p className="text-gray-300 text-lg mb-12 leading-relaxed">
          Официальная утилита для проверки на читы. Одно нажатие — и вы защищены.
        </p>

        <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-10 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <Icon name="ShieldCheck" size={32} className="text-red-500" />
          </div>

          <div>
            <p className="text-white font-bold text-lg">MajesticGuard.zip</p>
            <p className="text-red-400 text-sm mt-1">Windows 10 / 11 · x64</p>
          </div>

          <Button className="bg-red-500 hover:bg-red-600 text-white font-bold text-base px-10 py-4 h-auto rounded-xl flex items-center gap-2">
            <Icon name="Download" size={18} />
            Скачать сейчас
          </Button>

          <div className="flex items-center gap-2 text-green-400 text-sm">
            <Icon name="CheckCircle" size={16} />
            <span>Официальный файл — безопасно</span>
          </div>
        </div>
      </div>
    </section>
  )
}
