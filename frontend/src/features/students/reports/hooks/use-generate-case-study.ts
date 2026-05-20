import { useMutation } from "@tanstack/react-query"

import {
  generateCaseStudy
} from "../api/generate-case-study"

export function useGenerateCaseStudy() {
  return useMutation({
    mutationFn: generateCaseStudy
  })
}