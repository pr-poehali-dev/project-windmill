import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"

const DOC_TYPES = [
  { id: "business", label: "Бизнес-документы", price: 25 },
  { id: "legal", label: "Юридические тексты", price: 35 },
  { id: "technical", label: "Техническая документация", price: 30 },
  { id: "marketing", label: "Маркетинг и реклама", price: 20 },
]

const URGENCY = [
  { id: "standard", label: "Стандарт", days: "5–7 дней", multiplier: 1 },
  { id: "express", label: "Экспресс", days: "2–3 дня", multiplier: 1.5 },
  { id: "urgent", label: "Срочно", days: "24 часа", multiplier: 2 },
]

export function CalculatorSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.2)
  const [pages, setPages] = useState(5)
  const [docType, setDocType] = useState("business")
  const [urgency, setUrgency] = useState("standard")

  const selectedDoc = DOC_TYPES.find((d) => d.id === docType)!
  const selectedUrgency = URGENCY.find((u) => u.id === urgency)!
  const total = Math.round(pages * selectedDoc.price * selectedUrgency.multiplier)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-10 transition-all duration-700 md:mb-14 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Калькулятор
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Рассчитайте стоимость</p>
        </div>

        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:gap-16 lg:gap-24">
          <div className="space-y-8">
            {/* Тип документа */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <p className="mb-3 font-mono text-xs text-foreground/60">Тип документа</p>
              <div className="flex flex-wrap gap-2">
                {DOC_TYPES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDocType(d.id)}
                    className={`rounded-full border px-4 py-1.5 font-sans text-sm transition-all duration-200 ${
                      docType === d.id
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/20 bg-foreground/5 text-foreground/70 hover:border-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Объём */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="mb-3 flex items-baseline justify-between">
                <p className="font-mono text-xs text-foreground/60">Объём документа</p>
                <span className="font-sans text-sm text-foreground">
                  {pages} {pages === 1 ? "страница" : pages < 5 ? "страницы" : "страниц"}
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={pages}
                  onChange={(e) => setPages(Number(e.target.value))}
                  className="w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-px [&::-webkit-slider-runnable-track]:bg-foreground/30 [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground"
                />
                <div className="mt-1 flex justify-between font-mono text-xs text-foreground/30">
                  <span>1</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            {/* Срочность */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <p className="mb-3 font-mono text-xs text-foreground/60">Срок выполнения</p>
              <div className="flex flex-wrap gap-2">
                {URGENCY.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setUrgency(u.id)}
                    className={`rounded-full border px-4 py-1.5 font-sans text-sm transition-all duration-200 ${
                      urgency === u.id
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/20 bg-foreground/5 text-foreground/70 hover:border-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {u.label}
                    <span className="ml-1.5 font-mono text-xs opacity-60">{u.days}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Итог */}
          <div
            className={`flex flex-col justify-center transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="min-w-[200px] border-l border-foreground/20 pl-8 md:pl-12">
              <p className="mb-1 font-mono text-xs text-foreground/50">Стоимость</p>
              <div className="mb-1 font-sans text-5xl font-light text-foreground md:text-6xl lg:text-7xl">
                ${total}
              </div>
              <p className="mb-6 font-mono text-xs text-foreground/40">
                {selectedDoc.label} · {pages} стр. · {selectedUrgency.label}
              </p>
              <MagneticButton variant="primary" onClick={() => scrollToSection?.(4)}>
                Заказать
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
