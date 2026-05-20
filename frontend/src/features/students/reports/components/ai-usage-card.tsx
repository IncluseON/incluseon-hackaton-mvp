import { Sparkles } from "lucide-react"

import type {
  AIUsage
} from "../types/ai-usage"

type Props = {
  usage: AIUsage
}

export function AIUsageCard({
  usage
}: Props) {
  const percentage =
    usage.monthly_limit > 0
      ? Math.min(
          (usage.used_this_month / usage.monthly_limit) * 100,
          100
        )
      : 0

  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Sparkles size={20} />
        </div>

        <div>
          <h3 className="font-bold text-blue-950">
            Uso de IA neste mês
          </h3>

          <p className="text-sm text-blue-700">
            Controle mensal de relatórios gerados
          </p>
        </div>
      </div>

      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-blue-950">
            {usage.used_this_month}
            <span className="text-base font-medium text-blue-600">
              /{usage.monthly_limit}
            </span>
          </p>

          <p className="text-sm text-blue-700">
            relatórios utilizados
          </p>
        </div>

        <p className="rounded-full bg-white px-3 py-1 text-sm font-medium text-blue-700">
          {usage.remaining} restantes
        </p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{
            width: `${percentage}%`
          }}
        />
      </div>
    </div>
  )
}