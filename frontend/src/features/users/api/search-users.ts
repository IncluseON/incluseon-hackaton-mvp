import { api } from "../../../api/client"

import type {
  UserSearchResult
} from "../types/user-search-result"

export async function searchUsers(
  search: string
) {
  if (search.length < 2) {
    return []
  }

  const response =
    await api.get<UserSearchResult[]>(
      "/users/search",
      {
        params: {
          search
        }
      }
    )

  return response.data
}