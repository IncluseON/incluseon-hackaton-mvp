import type { Student } from "@/features/auth/types/student"

type Props = {
  student: Student
}

export function StudentHeader({ student }: Props) {
  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <h1 className="text-3xl font-bold text-blue-950">
            {student.name}
          </h1>

          <p className="mt-1 text-sm text-blue-600">
            {student.diagnosis || "Sem diagnóstico informado"}
          </p>
        </div>

        <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          {student.age} anos
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <InfoItem
          label="Escola"
          value={student.school_name}
        />

        <InfoItem
          label="Responsável"
          value={student.guardian_name}
        />

        <InfoItem
          label="Telefone"
          value={student.guardian_phone}
        />
      </div>
    </section>
  )
}

function InfoItem({
  label,
  value
}: {
  label: string
  value?: string | null
}) {
  return (
    <div>
      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="font-medium text-blue-950">
        {value || "-"}
      </p>
    </div>
  )
}