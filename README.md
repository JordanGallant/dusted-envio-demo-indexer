# Dusted Envio indexer

*Please refer to the [documentation website](https://docs.envio.dev) for a thorough guide on all [Envio](https://envio.dev) indexer features*

## Run

```bash
pnpm envio dev
```

## Pre-requisites

- [Node.js (use v18 or newer)](https://nodejs.org/en/download/current)
- [pnpm (use v8 or newer)](https://pnpm.io/installation)
- [Docker desktop](https://www.docker.com/products/docker-desktop/)

## Example queries

Visit http://localhost:8080 to see the GraphQL Playground, local password is `testing`.

### Global data

```graphql
query MyQuery {
  GlobalStats(where: {id: {_eq: "global"}}) {
    tippingFee
    tippingOwner
    pointsOwner
    pointsClaimable
  }
}
```

### User data

```graphql
query MyQuery {
  User {
    address
    id
    points {
      totalPointsClaimed
    }
    tips {
      amount
      sender
    }
  }
}
```