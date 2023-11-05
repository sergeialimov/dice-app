# Dice betting API

This project provides a GraphQL API for tracking betting data. It allows users to create bets, view their bets, and see a list of the best bets per user.

## Features

- Create new bets with associated user data
- Retrieve bets and associated outcomes
- Query for the best bet per user with a limit on the number of results

## Getting Started

These instructions will get you a copy of the project up and running on the machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (LTS version). The app tested with node.js version 20.9.0
- npm or Yarn as package managers
- PostgreSQL database running locally or remotely

### Installing

To install Bet Tracker API, follow these steps:

```bash
git clone https://github.com/sergeialimov/dice-app
cd bet-tracker-api
yarn install
```

## Configuring environment
Create a .env file in the root of the project and update it with the database credentials and other configuration settings:


```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=app_username
DB_PASSWORD=app_password
DB_DATABASE=app_db
```

## Database Setup

Before running the application, set up the initial database structure and optionally fill it with fake data for testing:

Populate the database with fixtures:
```bash
sh ./scripts/fixtures.sh
```

## Running the application
`yarn serve`


## Using the API
To access the GraphQL playground and start making queries, navigate to:

`http://localhost:3000/graphql`


## Example Queries

### Get a specific bet by ID
```
query {
  getBet(id: 1) {
    id
    userId
    betAmount
    chance
    payout
    win
    user {
      id
      name
    }
  }
}
```

### Get the best bets per user with a limit
```
query {
  getBestBetPerUser(limit: 3) {
    id
    userId
    betAmount
    chance
    payout
    win
    user {
      id
      name
      balance
    }
  }
}
```

# Development
## Running tests
To run the tests for this project:
`yarn test`

## Linting
Lint code with ESLint by running:
`yarn lint`

## Building the project
To build the project for production:
`yarn build`

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Limitations and Known Issues

While the project is fully functional, there are a few limitations and areas that are still under development:

- **Docker Compatibility:** The Docker setup has not been fully tested and might require additional adjustments for optimal performance.

- **Test Coverage:** Currently, the test coverage is not comprehensive. We aim to improve test coverage in future updates to ensure reliability and stability.

- **Configuration Refactoring:** The project configuration is functional; however, we plan to refactor it using `@nestjs/config` module for better environment variable management.

