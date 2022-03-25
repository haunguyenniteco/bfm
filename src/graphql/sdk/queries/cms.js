import { gql } from '@apollo/client'

export const getCmsContent = gql`
  query getCmsContent($slug: String!) {
    content(slug: $slug) {
      title
      description
      content
      image {
        url
        title
        description
        width
        height
      }
    }
  }
`

export const getCmsArea = gql`
  query getCmsArea($key: String!) {
    area(key: $key) {
      key
      content
    }
  }
`
