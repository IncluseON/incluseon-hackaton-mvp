export type SavedAIReport = {
  id: number
  student_id: number
  report_type: string
  content: string
  pdf_path?: string | null
  model_used?: string | null
  prompt_tokens?: number | null
  completion_tokens?: number | null
  total_tokens?: number | null
  created_at: string
}