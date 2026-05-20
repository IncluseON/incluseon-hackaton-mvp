import {
  Users,
  Brain,
  Activity,
  FileText,
  Calendar,
  Sparkles,
  BarChart3
} from "lucide-react"

import { useStudents } from "@/features/students/hooks/use-students"

export function DashboardPage() {
  const {
    data: studentsData,
    isLoading: isLoadingStudents
  } = useStudents({
    page: 1,
    per_page: 5
  })

  const totalStudents = studentsData?.total ?? 0
  const recentStudents = studentsData?.items ?? []

  return (
    <div className="space-y-6">
      <section className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <Sparkles size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-blue-950">
              Bem-vindo ao IncluseON
            </h1>

            <p className="text-sm text-blue-700">
              Acompanhe alunos, registros ABA, avaliações e estudos de caso com IA.
            </p>
          </div>
        </div>

        <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Gerar estudo de caso IA
        </button>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Alunos ativos"
          value={isLoadingStudents ? "..." : String(totalStudents)}
          subtitle="alunos cadastrados"
          icon={<Users size={22} />}
        />

        <DashboardCard
          title="Registros ABA"
          value="0"
          subtitle="registros comportamentais"
          icon={<Activity size={22} />}
        />

        <DashboardCard
          title="Avaliações"
          value="0"
          subtitle="instrumentos preenchidos"
          icon={<Brain size={22} />}
        />

        <DashboardCard
          title="Relatórios IA"
          value="0"
          subtitle="estudos de caso gerados"
          icon={<FileText size={22} />}
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-blue-950">
              Sugestões inteligentes
            </h2>

            <button className="text-sm font-medium text-blue-600">
              Ver todas →
            </button>
          </div>

          <div className="space-y-4">
            <SuggestionItem
              icon={<Brain size={20} />}
              title="Preencher avaliação inicial"
              description="Comece criando o perfil cognitivo e comportamental do aluno."
              action="Criar"
            />

            <SuggestionItem
              icon={<Activity size={20} />}
              title="Registrar ocorrência ABA"
              description="Registre antecedentes, comportamento, consequência e manejo."
              action="Registrar"
            />

            <SuggestionItem
              icon={<BarChart3 size={20} />}
              title="Analisar padrões"
              description="Veja intensidade, frequência e contextos mais recorrentes."
              action="Ver analytics"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-bold text-blue-950">
            Ações rápidas
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <QuickAction
              icon={<Users size={20} />}
              title="Novo aluno"
              subtitle="Cadastrar"
              color="bg-blue-50 text-blue-700"
            />

            <QuickAction
              icon={<Activity size={20} />}
              title="Registro ABA"
              subtitle="Ocorrência"
              color="bg-emerald-50 text-emerald-700"
            />

            <QuickAction
              icon={<Brain size={20} />}
              title="Avaliação"
              subtitle="Instrumento"
              color="bg-purple-50 text-purple-700"
            />

            <QuickAction
              icon={<Calendar size={20} />}
              title="Agenda"
              subtitle="Atendimento"
              color="bg-orange-50 text-orange-700"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-blue-950">
            Meus alunos
          </h2>

          <a
            href="/students"
            className="text-sm font-medium text-blue-600"
          >
            Ver todos →
          </a>
        </div>

        {isLoadingStudents ? (
          <p className="text-sm text-zinc-500">
            Carregando alunos...
          </p>
        ) : recentStudents.length > 0 ? (
          <div className="space-y-3">
            {recentStudents.map((student) => (
              <a
                key={student.id}
                href={`/students/${student.id}`}
                className="flex items-center justify-between rounded-xl border border-blue-100 p-4 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <div>
                  <h3 className="font-semibold text-blue-950">
                    {student.name}
                  </h3>

                  <p className="text-sm text-zinc-500">
                    {student.diagnosis || "Sem diagnóstico"} •{" "}
                    {student.school_name || "Sem escola informada"}
                  </p>
                </div>

                <span className="text-sm font-medium text-blue-600">
                  Abrir →
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="flex min-h-56 flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Users size={24} />
            </div>

            <p className="text-sm text-zinc-500">
              Nenhum aluno cadastrado ainda.
            </p>

            <a
              href="/students"
              className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              + Cadastrar primeiro aluno
            </a>
          </div>
        )}
      </section>
    </div>
  )
}

function DashboardCard({
  title,
  value,
  subtitle,
  icon
}: {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          {title}
        </p>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>

      <h3 className="text-4xl font-bold text-blue-950">
        {value}
      </h3>

      <p className="mt-1 text-sm text-zinc-500">
        {subtitle}
      </p>
    </div>
  )
}

function SuggestionItem({
  icon,
  title,
  description,
  action
}: {
  icon: React.ReactNode
  title: string
  description: string
  action: string
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-100 p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-blue-950">
            {title}
          </h3>

          <p className="text-sm text-zinc-500">
            {description}
          </p>
        </div>
      </div>

      <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
        {action}
      </button>
    </div>
  )
}

function QuickAction({
  icon,
  title,
  subtitle,
  color
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  color: string
}) {
  return (
    <button className={`rounded-2xl p-4 text-left ${color}`}>
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/70">
        {icon}
      </div>

      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="text-sm opacity-80">
        {subtitle}
      </p>
    </button>
  )
}