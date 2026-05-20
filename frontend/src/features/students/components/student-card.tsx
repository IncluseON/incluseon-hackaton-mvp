import { Link } from "react-router-dom"

import type { Student } from "@/features/auth/types/student"

type Props = {
  student: Student
}

export function StudentCard({ student }: Props) {
  return (
    <Link to={`/students/${student.id}`}>
      <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-blue-950">
              {student.name}
            </h2>

            <p className="text-sm text-blue-600">
              {student.diagnosis || "Sem diagnóstico"}
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {student.age} anos
          </span>
        </div>

        <div className="space-y-1 text-sm text-zinc-600">
          <p>
            Escola:{" "}
            <span className="font-medium">
              {student.school_name || "-"}
            </span>
          </p>

          <p>
            Responsável:{" "}
            <span className="font-medium">
              {student.guardian_name || "-"}
            </span>
          </p>
        </div>
      </div>
    </Link>
  )
}