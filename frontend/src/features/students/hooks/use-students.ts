import { useQuery } from "@tanstack/react-query"

import { getStudents } from "../api/get-students"

type UseStudentsParams = {
  page?: number
  per_page?: number
  search?: string
}

export function useStudents({
  page = 1,
  per_page = 10,
  search = ""
}: UseStudentsParams = {}) {
  return useQuery({
    queryKey: ["students", page, per_page, search],
    queryFn: () =>
      getStudents({
        page,
        per_page,
        search
      })
  })
}