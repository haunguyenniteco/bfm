import { useQuery } from '@apollo/client'

export const queryWithVariablesFactory = query => (variables, options) => useQuery(query, { variables, ...options })
export const queryFactory = query => options => useQuery(query, { ...options })
