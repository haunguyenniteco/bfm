[![CircleCI](https://circleci.com/bb/digitalfoodie/bunbury-storefront/tree/master.svg?style=svg&circle-token=561b699a8a0f958458895300a880c2972a7e9dcd)](https://circleci.com/bb/digitalfoodie/bunbury-storefront/tree/master)

# Storefront

Bunbury Storefront implementation for use with Headless Commerce Platform.

## Technologies

Built using a number of open source projects:

- [Yarn](https://yarnpkg.com/lang/en/) - Dependency management
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Next.js](https://github.com/vercel/next.js) - React Framework for Server-Rendered Apps.
- [Material UI](https://material-ui.com/) - React Components for Material Design (currently in transition to it)
- [GraphQL](https://graphql.org/) - Providing data for frontend
- [Cypress](https://www.cypress.io/) - End-to-end testing
- [Jest](https://facebook.github.io/jest/) - Unit testing (currently we are trying to achieve 80% test coverage)

## Getting Started

Create `.env` file in **project root** and fill with provided credentials:

```sh
DG_API_KEY=
DG_ORGANIZATION_ID=
DG_API_URL=
DEFAULT_STORE_ID=
LOOKUP_COUNTRY_CODE=au

NOTE: Get the complete list from your internal documentation page
```

```sh
yarn install             # Install dependencies (NodeJS 12.x or higher is recommended )
yarn dev                 # Start development server on port 3000
```

## Running in Production

```sh
yarn build:production    # Builds the application for production usage
yarn start               # Starts a Next.js production server
```

## Recommended Development Practices

- All feature development should happen in scoped feature branches
- Feature branches are created from the up-to-date master branch
- Merging to master branch only via pull requests

Branch naming convention:

```sh
feature/${JIRA_TICKET_ID}-${SHORT_DESCRIPTION}
```

## CI/CD

The project uses [CircleCI](https://app.circleci.com/) for test automation, version increments, building and pushing docker images to docker repository.

Test will be ran for all pushed branches.
Tests are required to pass in order to accept a pull request.

Commits to master branch initiate the following workflow:

1. Tests are run

2. Semantic version is incremented

   - package.json version number is increased
   - matching git tag is created and pushed

3. Manual approval is required for deploying to different environments

4. Once approved, a Docker image is built and pushed to Docker Repository

Docker image naming convention:

```sh
${REGISTRY}/${CLIENT-NAME}-${ENVIRONMENT}:${VERSION_NUMBER}
```

## Optional

### Components documentation

We have examples of our components in `Readme.md` files. You can list a docs with below command:

```sh
npx styleguidist server
```
