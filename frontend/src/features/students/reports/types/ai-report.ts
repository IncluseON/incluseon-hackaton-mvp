export type GenerateCaseStudyResponse = {
  message: string
  task_id: string | null
  report_id?: number
  already_generated?: boolean
}

export type TaskStatusResponse = {
  task_id: string
  status: "PENDING" | "STARTED" | "SUCCESS" | "FAILURE"
  report?: string | null
  pdf_url?: string | null
  error?: string | null
}