import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import {
  createStudentSchema,
  type CreateStudentData,
  type CreateStudentFormData
} from "../schemas/create-student-schema"

import { useCreateStudent } from "../hooks/use-create-student"

type Props = {
  open: boolean
  onClose: () => void
}

export function CreateStudentModal({ open, onClose }: Props) {
  const mutation = useCreateStudent()

const {
  register,
  handleSubmit,
  reset,
  formState: { errors }
} = useForm<CreateStudentFormData, unknown, CreateStudentData>({
  resolver: zodResolver(createStudentSchema)
})

async function onSubmit(data: CreateStudentData) {
  await mutation.mutateAsync(data)

  reset()
  onClose()
}

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-blue-950">
              Cadastrar novo aluno
            </h2>

            <p className="text-sm text-zinc-500">
              Preencha os dados iniciais do acompanhamento.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100"
          >
            Fechar
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Nome do aluno
            </label>

            <input
              {...register("name")}
              className="w-full rounded-xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Ex: João Silva"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Idade
            </label>

            <input
              type="number"
              {...register("age")}
              className="w-full rounded-xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Ex: 12"
            />

            {errors.age && (
              <p className="mt-1 text-sm text-red-500">
                {errors.age.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Data de nascimento
            </label>

            <input
              type="date"
              {...register("birth_date")}
              className="w-full rounded-xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
            />

            {errors.birth_date && (
              <p className="mt-1 text-sm text-red-500">
                {errors.birth_date.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Diagnóstico
            </label>

            <input
              {...register("diagnosis")}
              className="w-full rounded-xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Ex: TEA, DI, TDAH..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Escola
            </label>

            <input
              {...register("school_name")}
              className="w-full rounded-xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Nome da escola"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Responsável
            </label>

            <input
              {...register("guardian_name")}
              className="w-full rounded-xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Nome do responsável"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Telefone do responsável
            </label>

            <input
              {...register("guardian_phone")}
              className="w-full rounded-xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Comunicação
            </label>

            <textarea
              {...register("communication_notes")}
              className="min-h-24 w-full rounded-xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Como o aluno se comunica? Usa fala, gestos, PECS, comunicação alternativa?"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Sensibilidade sensorial
            </label>

            <textarea
              {...register("sensory_notes")}
              className="min-h-24 w-full rounded-xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Sensibilidades auditivas, visuais, táteis, alimentares..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Observações gerais
            </label>

            <textarea
              {...register("general_observations")}
              className="min-h-24 w-full rounded-xl border border-blue-100 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Informações importantes para o acompanhamento."
            />
          </div>

          <div className="mt-2 flex justify-end gap-3 md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {mutation.isPending ? "Salvando..." : "Cadastrar aluno"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}