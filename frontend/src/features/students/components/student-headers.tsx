import type { Student } from "@/features/auth/types/student"

type Props = {
  student: Student
}

export function StudentHeader({
  student
}: Props) {

  return (

    <div
      className="

      bg-white

      rounded-2xl

      p-6

      shadow-sm

      border

      border-blue-100
    "
    >

      <div
        className="
        flex
        items-start
        justify-between
      "
      >

        <div>

          <h1
            className="

            text-3xl

            font-bold

            text-blue-950
          "
          >
            {student.name}
          </h1>

          <p
            className="
            text-blue-600
            mt-1
          "
          >
            {student.diagnosis ||
              "Sem diagnóstico"}
          </p>

        </div>

        <div
          className="
          bg-blue-100

          text-blue-700

          px-4
          py-2

          rounded-xl

          text-sm
          font-medium
        "
        >
          Perfil Clínico
        </div>

      </div>

      <div
        className="
        grid

        grid-cols-1
        md:grid-cols-3

        gap-4

        mt-6
      "
      >

        <div>

          <p
            className="
            text-sm
            text-zinc-500
          "
          >
            Escola
          </p>

          <p
            className="
            font-medium
          "
          >
            {student.school_name || "-"}
          </p>

        </div>

        <div>

          <p
            className="
            text-sm
            text-zinc-500
          "
          >
            Responsável
          </p>

          <p
            className="
            font-medium
          "
          >
            {student.guardian_name || "-"}
          </p>

        </div>

        <div>

          <p
            className="
            text-sm
            text-zinc-500
          "
          >
            Telefone
          </p>

          <p
            className="
            font-medium
          "
          >
            {student.guardian_phone || "-"}
          </p>

        </div>

      </div>

    </div>
  )
}