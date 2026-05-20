import type { ReactNode } from "react";

import { Activity, BarChart3, Brain, MapPin } from "lucide-react";

import { useBehaviorRecords } from "../../behavior/hooks/use-behavior-records";
import { IntensityChart } from "./intensity-chart";
import { EnvironmentChart } from "./environment-chart";

import { useStudentBehaviorAnalytics } from "../hooks/use-student-behavior-analytics";
import { StrategyEffectivenessChart } from "./strategy-effectiveness-chart";

type Props = {
  studentId: string;
};

export function StudentAnalyticsPanel({ studentId }: Props) {
  const { data, isLoading, isError } = useStudentBehaviorAnalytics(studentId);

  const { data: behaviorRecords, isLoading: isLoadingBehaviorRecords } =
    useBehaviorRecords(studentId);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-blue-100 bg-white p-6 text-sm text-zinc-500">
        Carregando analytics...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-600">
        Não foi possível carregar os dados analíticos.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-blue-950">
          Analytics comportamental
        </h2>

        <p className="text-sm text-zinc-500">
          Métricas geradas a partir dos registros ABA do aluno.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          title="Registros ABA"
          value={String(data.records_count)}
          subtitle="eventos registrados"
          icon={<Activity size={22} />}
        />

        {!isLoadingBehaviorRecords && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <IntensityChart records={behaviorRecords ?? []} />

              <EnvironmentChart records={behaviorRecords ?? []} />
            </div>

            <StrategyEffectivenessChart records={behaviorRecords ?? []} />
          </div>
        )}

        <AnalyticsCard
          title="Intensidade média"
          value={
            data.average_intensity !== null
              ? data.average_intensity.toFixed(1)
              : "-"
          }
          subtitle="escala de 1 a 10"
          icon={<BarChart3 size={22} />}
        />

        <AnalyticsCard
          title="Ambiente recorrente"
          value={data.most_common_environment || "-"}
          subtitle="mais frequente"
          icon={<MapPin size={22} />}
        />

        <AnalyticsCard
          title="Estratégia eficaz"
          value={data.most_effective_strategy || "-"}
          subtitle="mais recorrente com sucesso"
          icon={<Brain size={22} />}
        />
      </div>

      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-blue-950">Leitura inicial</h3>

        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Estes dados ajudam a identificar padrões de comportamento, contextos
          mais sensíveis e estratégias que parecem funcionar melhor. Quanto mais
          registros ABA forem adicionados, mais útil será a análise.
        </p>
      </div>
    </div>
  );
}

function AnalyticsCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>

      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {title}
      </p>

      <h3 className="mt-2 truncate text-2xl font-bold text-blue-950">
        {value}
      </h3>

      <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
    </div>
  );
}
