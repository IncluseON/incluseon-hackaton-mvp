import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts"

import type { BehaviorRecord } from "../../behavior/types/behavior-record"

type Props = {
  records: BehaviorRecord[]
}

type StrategyData = {
  strategy: string
  total: number
  effective: number
  ineffective: number
}

export function StrategyEffectivenessChart({
  records
}: Props) {
  const strategyMap = records.reduce<
    Record<string, StrategyData>
  >((acc, record) => {
    if (!record.strategy_used) {
      return acc
    }

    const strategy = record.strategy_used

    if (!acc[strategy]) {
      acc[strategy] = {
        strategy,
        total: 0,
        effective: 0,
        ineffective: 0
      }
    }

    acc[strategy].total += 1

    if (record.strategy_effective === true) {
      acc[strategy].effective += 1
    }

    if (record.strategy_effective === false) {
      acc[strategy].ineffective += 1
    }

    return acc
  }, {})

  const chartData = Object.values(strategyMap)

  if (chartData.length === 0) {
    return (
      <div className="rounded-2xl border border-blue-100 bg-white p-6 text-sm text-zinc-500 shadow-sm">
        Ainda não há dados de estratégias suficientes para gerar o gráfico.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-blue-950">
          Estratégias e eficácia
        </h3>

        <p className="text-sm text-zinc-500">
          Comparação entre estratégias utilizadas e resultados observados.
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="strategy"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="effective"
              name="Funcionou"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="ineffective"
              name="Não funcionou"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}