import type { ReactNode } from "react"

import {
  Activity,
  BarChart3,
  MapPin,
  Sparkles
} from "lucide-react"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

import {
  useStudentBehaviorAnalytics
} from "../hooks/use-student-behavior-analytics"

type Props = {
  studentId: string
}

export function StudentAnalyticsPanel({
  studentId
}: Props) {
  const {
    data,
    isLoading,
    isError
  } = useStudentBehaviorAnalytics(studentId)

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-blue-100 bg-white p-6 text-sm text-zinc-500 shadow-sm">
        Carregando analytics comportamental...
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-600 shadow-sm">
        Não foi possível carregar os dados de analytics.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-blue-950">
            Analytics comportamental
          </h2>

          <p className="text-sm text-zinc-500">
            Métricas geradas a partir dos registros ABA do aluno.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <AnalyticsSummaryCard
            icon={<Activity size={20} />}
            title="Registros ABA"
            value={String(data.records_count)}
            description="eventos registrados"
          />

          <AnalyticsSummaryCard
            icon={<BarChart3 size={20} />}
            title="Intensidade média"
            value={
              data.average_intensity !== null
                ? data.average_intensity.toFixed(1)
                : "-"
            }
            description="escala de 1 a 10"
          />

          <AnalyticsSummaryCard
            icon={<MapPin size={20} />}
            title="Ambiente recorrente"
            value={data.most_common_environment || "-"}
            description="mais frequente"
          />

          <AnalyticsSummaryCard
            icon={<Sparkles size={20} />}
            title="Estratégia eficaz"
            value={data.most_effective_strategy || "-"}
            description="mais recorrente"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
        <ChartCard
          title="Evolução da intensidade"
          description="Mostra como a intensidade dos registros ABA varia ao longo do tempo."
        >
          {data.intensity_evolution.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={data.intensity_evolution}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  domain={[0, 10]}
                  allowDecimals={false}
                />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="intensity"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{
                    r: 4
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartMessage message="Ainda não há dados suficientes para exibir a evolução da intensidade." />
          )}
        </ChartCard>

        <ChartCard
          title="Registros por ambiente"
          description="Mostra em quais ambientes os comportamentos foram mais registrados."
        >
          {data.environment_distribution.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={data.environment_distribution}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="environment" />
                <YAxis allowDecimals={false} />
                <Tooltip />

                <Bar
                  dataKey="total"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartMessage message="Ainda não há dados suficientes para exibir os registros por ambiente." />
          )}
        </ChartCard>
      </section>

      <section className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
        <ChartCard
          title="Estratégias e eficácia"
          description="Compara quantas vezes cada estratégia funcionou ou não funcionou."
        >
          {data.strategy_effectiveness.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={data.strategy_effectiveness}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="strategy" />
                <YAxis allowDecimals={false} />
                <Tooltip />

                <Bar
                  dataKey="effective"
                  name="Funcionou"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="not_effective"
                  name="Não funcionou"
                  fill="#93c5fd"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartMessage message="Ainda não há dados suficientes para comparar as estratégias." />
          )}
        </ChartCard>

        <ChartCard
          title="Comportamentos mais registrados"
          description="Mostra quais comportamentos aparecem com maior frequência."
        >
          {data.behavior_frequency.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={data.behavior_frequency}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="behavior" />
                <YAxis allowDecimals={false} />
                <Tooltip />

                <Bar
                  dataKey="total"
                  fill="#60a5fa"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartMessage message="Ainda não há dados suficientes para exibir os comportamentos mais registrados." />
          )}
        </ChartCard>
      </section>

      <section>
        <ChartCard
          title="Antecedentes mais comuns"
          description="Mostra quais situações costumam acontecer antes dos comportamentos registrados."
          size="large"
        >
          {data.antecedent_frequency.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={data.antecedent_frequency}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="antecedent" />
                <YAxis allowDecimals={false} />
                <Tooltip />

                <Bar
                  dataKey="total"
                  fill="#1d4ed8"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartMessage message="Ainda não há dados suficientes para exibir os antecedentes mais comuns." />
          )}
        </ChartCard>
      </section>

      <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-blue-950">
            Leitura dos dados
          </h3>

          <p className="text-sm text-zinc-500">
            Resumo interpretativo das métricas comportamentais registradas.
          </p>
        </div>

        {data.records_count === 0 ? (
          <div className="rounded-2xl bg-blue-50/60 p-6 text-sm text-zinc-600">
            Ainda não há registros ABA suficientes para gerar uma análise
            comportamental. Cadastre registros para visualizar métricas do aluno.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <InsightCard
              title="Frequência de registros"
              description={`O aluno possui ${data.records_count} registro${
                data.records_count === 1 ? "" : "s"
              } ABA cadastrado${
                data.records_count === 1 ? "" : "s"
              } no sistema.`}
            />

            <InsightCard
              title="Intensidade observada"
              description={
                data.average_intensity !== null
                  ? `A intensidade média observada é ${data.average_intensity.toFixed(
                      1
                    )} em uma escala de 1 a 10.`
                  : "Ainda não há dados de intensidade suficientes."
              }
            />

            <InsightCard
              title="Ambiente mais recorrente"
              description={
                data.most_common_environment
                  ? `O ambiente com maior recorrência nos registros é: ${data.most_common_environment}.`
                  : "Ainda não há ambiente recorrente identificado."
              }
            />

            <InsightCard
              title="Estratégia com melhor resposta"
              description={
                data.most_effective_strategy
                  ? `A estratégia mais eficaz observada até o momento é: ${data.most_effective_strategy}.`
                  : "Ainda não há estratégia eficaz identificada."
              }
            />
          </div>
        )}
      </section>
    </div>
  )
}

function AnalyticsSummaryCard({
  icon,
  title,
  value,
  description
}: {
  icon: ReactNode
  title: string
  value: string
  description: string
}) {
  return (
    <div className="`min-h-[160px]` rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {title}
      </p>

      <h3 className="mt-2 line-clamp-2 text-2xl font-bold text-blue-950">
        {value}
      </h3>

      <p className="mt-1 text-sm text-zinc-500">
        {description}
      </p>
    </div>
  )
}

function ChartCard({
  title,
  description,
  children,
  size = "default"
}: {
  title: string
  description: string
  children: ReactNode
  size?: "default" | "large"
}) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-bold text-blue-950">
          {title}
        </h3>

        <p className="mt-1 text-sm text-zinc-500">
          {description}
        </p>
      </div>

      <div
        className={
          size === "large"
            ? "h-96 w-full"
            : "h-80 w-full"
        }
      >
        {children}
      </div>
    </div>
  )
}

function EmptyChartMessage({
  message
}: {
  message: string
}) {
  return (
    <div className="flex h-full items-center justify-center rounded-xl bg-blue-50/50 p-6 text-center">
      <p className="max-w-sm text-sm text-zinc-500">
        {message}
      </p>
    </div>
  )
}

function InsightCard({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-blue-50 bg-slate-50 p-5">
      <h4 className="font-bold text-blue-950">
        {title}
      </h4>

      <p className="mt-2 text-sm leading-relaxed text-zinc-600">
        {description}
      </p>
    </div>
  )
}