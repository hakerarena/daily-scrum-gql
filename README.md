# Daily Scrum GraphQL API

This project is a GraphQL API for managing daily scrum activities. It uses MongoDB as the database and Apollo Server with Express for the GraphQL server.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/hakerarena/daily-scrum-gql.git
cd daily-scrum-gql
```

2. Install dependencies:

```sh
npm install
```

3. Generate GraphQL types:

```sh
npm run generate
```

## Usage

1. Start the server:

```sh
npm start
```

2. The server will be running at `http://localhost:4000/graphql`.

## Scripts

- `start`: Start the server.
- `dev`: Start the server in development mode.
- `build`: Compile TypeScript files.
- `test`: Run tests (currently not implemented).
- `generate`: Generate GraphQL types.
- `codegen:watch`: Watch for changes and regenerate GraphQL types.
- `force-delete`: Force delete `node_modules` and `package-lock.json`.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
MONGO_URI=mongodb://localhost:27017
```

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

