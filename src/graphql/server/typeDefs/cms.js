const { gql } = require('apollo-server-micro')

export default gql`
  type Content {
    id: ID!
    createdAt: String
    updatedAt: String
    slug: String
    title: String
    description: String
    content: String
    image: ContentImage
    localeCode: String
  }

  type Area {
    id: ID
    description: String
    key: String
    localeCode: String
    createdAt: String
    updatedAt: String
    content: String
  }

  type ContentImage {
    id: ID!
    createdAt: String
    updatedAt: String
    fileName: String
    url: String
    title: String
    height: Int
    width: Int
    description: String
    contentType: String
    localeCode: String
  }

  type Query {
    content(slug: String!, format: String = "html"): Content!
    area(key: String!, format: String = "html", preview: Boolean = false): Area!
  }
`
