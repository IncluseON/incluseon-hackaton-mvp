import { useQuery } from "@tanstack/react-query"

import { getBehaviorRecords } from "../api/get-behavior-records"

export function useBehaviorRecords(studentId: string) {
  return useQuery({
    queryKey: ["behavior-records", studentId],
    queryFn: () => getBehaviorRecords(studentId),
    enabled: !!studentId
  })
}