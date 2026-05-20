import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createAssessment } from "../api/create-assessment"

export function useCreateAssessment(studentId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAssessment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assessments", studentId]
      })

      queryClient.invalidateQueries({
        queryKey: ["student", studentId]
      })
    }
  })
}