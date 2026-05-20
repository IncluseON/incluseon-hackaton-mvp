import { useQuery } from "@tanstack/react-query"

import {
  searchUsers
} from "../api/search-users"

export function useSearchUsers(
  search: string
) {
  return useQuery({
    queryKey: [
      "users-search",
      search
    ],

    queryFn: () =>
      searchUsers(search),

    enabled: search.length >= 2
  })
}