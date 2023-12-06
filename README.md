## Description

A nestjs implementation of ContainerApi from express.
The project is also upgraded with very much addition of:

# New Routes Methods

New routes and repository methods to deal with relations.

# Better validation.

Better validation using class validator.

## What it Includes??

1. Typeorm.
2. Class validator and transformer.
3. Repository pattern for entities and typeorm.
4. A unit test example for product service.
5. A custom findOptions class.
6. A custom entites type converter called entity assembler. Can be done using
   automapper or class transformer
7. Separate database config implementation with extra database options.
8. A base repository.
9. An env validation using custom validate class. Class throws error depending upon
   environment.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

```
─ container
│  ├─ .eslintrc.js
│  ├─ .prettierrc
│  ├─ nest-cli.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ README.md
│  ├─ src
│  │  ├─ app.controller.ts
│  │  ├─ app.module.ts
│  │  ├─ app.service.ts
│  │  ├─ common
│  │  │  ├─ config
│  │  │  │  ├─ env.validationClass.ts
│  │  │  │  └─ index.ts
│  │  │  ├─ constant
│  │  │  │  └─ index.ts
│  │  │  ├─ database
│  │  │  │  ├─ entity
│  │  │  │  │  └─ base.entity.ts
│  │  │  │  ├─ index.ts
│  │  │  │  └─ repository
│  │  │  │     └─ base.repository.ts
│  │  │  └─ findOptions
│  │  │     └─ index.ts
│  │  ├─ main.ts
│  │  ├─ modules
│  │  │  ├─ container
│  │  │  │  ├─ container.controller.ts
│  │  │  │  ├─ container.module.ts
│  │  │  │  ├─ container.service.ts
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ container.dto.ts
│  │  │  │  │  └─ updateContainer.dto.ts
│  │  │  │  ├─ entities
│  │  │  │  │  └─ container.entity.ts
│  │  │  │  └─ repositories
│  │  │  │     ├─ container.repository.ts
│  │  │  │     └─ interfaces
│  │  │  │        └─ container.interface.ts
│  │  │  ├─ customers
│  │  │  │  ├─ customer.controller.ts
│  │  │  │  ├─ customer.module.ts
│  │  │  │  ├─ customer.service.ts
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ customer.dto.ts
│  │  │  │  │  └─ updateCustomer.dto.ts
│  │  │  │  ├─ entities
│  │  │  │  │  └─ customer.entity.ts
│  │  │  │  └─ repositories
│  │  │  │     ├─ customer.repository.ts
│  │  │  │     └─ interface
│  │  │  │        └─ customer.interface.ts
│  │  │  ├─ order
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ order.dto.ts
│  │  │  │  │  └─ updateOrder.dto.ts
│  │  │  │  ├─ entities
│  │  │  │  │  └─ order.entity.ts
│  │  │  │  ├─ order.controller.ts
│  │  │  │  ├─ order.module.ts
│  │  │  │  ├─ order.service.ts
│  │  │  │  └─ repositories
│  │  │  │     ├─ interface
│  │  │  │     │  └─ order.interface.ts
│  │  │  │     └─ order.repository.ts
│  │  │  ├─ product
│  │  │  │  ├─ dto
│  │  │  │  │  ├─ product.dto.ts
│  │  │  │  │  └─ updateProduct.dto.ts
│  │  │  │  ├─ entities
│  │  │  │  │  └─ product.entity.ts
│  │  │  │  ├─ product.controller.ts
│  │  │  │  ├─ product.module.ts
│  │  │  │  ├─ product.service.spec.ts
│  │  │  │  ├─ product.service.ts
│  │  │  │  └─ repositories
│  │  │  │     ├─ interfaces
│  │  │  │     │  └─ product.interface.ts
│  │  │  │     └─ product.repository.ts
│  │  │  └─ saleAgent
│  │  │     ├─ dto
│  │  │     │  ├─ saleAgent.dto.ts
│  │  │     │  └─ updateSaleAgent.dto.ts
│  │  │     ├─ entities
│  │  │     │  └─ saleAgent.entity.ts
│  │  │     ├─ repositories
│  │  │     │  ├─ interface
│  │  │     │  │  └─ saleAgent.interface.ts
│  │  │     │  └─ saleAgent.repository.ts
│  │  │     ├─ saleAgent.controller.ts
│  │  │     ├─ saleAgent.module.ts
│  │  │     └─ saleAgent.service.ts
│  │  └─ utils
│  │     ├─ env.validation.ts
│  │     ├─ index.ts
│  │     └─ item.notfound.ts
│  ├─ test
│  │  ├─ app.e2e-spec.ts
│  │  └─ jest-e2e.json
│  ├─ tsconfig.build.json
│  └─ tsconfig.json
└─ README.md

```
