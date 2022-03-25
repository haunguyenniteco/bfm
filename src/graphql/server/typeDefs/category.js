const { gql } = require('apollo-server-micro')

export default gql`
  type Category {
    """
    Category the product is associated with.
    """
    parentExtId: String
    parentName: LocaleField
    extId: String!
    name: LocaleField
    tree: String
    level: Int
    path: String
    isRoot: Boolean
    visible: Boolean
    order: String
  }

  type Query {
    categories(
      tree: String = "online"
      levels: String
      page_size: Int
      store_id: String
      direct_children: Boolean
      category_id: String
    ): [Category]
    category(
      category_id: String
      tree: String = "online"
      store_id: String
      page_size: Int = 500
      get_parent: Boolean
    ): Category
  }
`
