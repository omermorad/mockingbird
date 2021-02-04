[![ISC license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![npm version](http://img.shields.io/npm/v/mockingbird-ts.svg?style=flat)](https://npmjs.org/package/faker.ts "View this project on npm")
[![Codecov Coverage](https://img.shields.io/codecov/c/github/omermorad/mockingbird-ts/master.svg?style=flat-square)](https://codecov.io/gh/omer-morad-ni/faker.ts)
[![CircleCI](https://circleci.com/gh/omermorad/mockingbird-ts.svg?style=shield)](https://circleci.com/gh/circleci/circleci-docs)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

<p align="center">
  <img width="450" src="https://github.com/omermorad/mockingbird-ts/blob/master/docs/logo.png" alt="Faker.ts Logo">

  <h1 align="center">Mockingbird</h1>

  <p align="center">
    <strong>Super Simple, Yet Powerful, TypeScript Oriented Mocks Library</strong>
  </p>
</p>

## Installation
Install the package alongside `faker` and `@types/faker` peer dependencies:

```bash
npm i -D mockingbird-ts faker @types/faker
```

## Playground 
**We have create a [REPL Playground](https://repl.it/@omermorad/Mockingbird-Playground) where you can see Faker.ts in action!**

## Usage

**Here is the simplest usage of Faker.ts:**

```typescript
import { Mock, MockFactory } from 'mockingbird-ts';

class Dog {
  @Mock(faker => faker.name.firstName())
  readonly name: string;
  
  @Mock()
  readonly birthday: Date;

  @Mock()
  readonly goodPoints: number;
}

const result = MockFactory.create<Dog>(Dog);
```

**A more complex example:**
```typescript
import { Mock, MockFactory } from 'mockingbird-ts';

class Person {
  @Mock(faker => faker.name.firstName())
  readonly name: string;
  
  @Mock()
  readonly birthday: Date;

  @Mock(faker => faker.internet.email())
  readonly email: string;

  @Mock({ type: Dog })
  readonly dog: Dog;
}

const result = MockFactory.create<Person>(Person);
```

**There are more options available to you in using `@Mock` decorator and also the `MockFactory` as well**

[Jump to the full documentation and explore the full API](https://github.com/omermorad/faker.ts/blob/master/docs/README.md)


## Motivation
When it comes to developing and especially writing unit tests of large projects
containing different and diverse entities, mocks are widely used to simulate real data.

Creating mocks can be a tedious and cumbersome process and is usually created
manually or by using libraries like Faker or Chance, which also do not offer a complete solution,
especially not when deciding to develop in TypeScript and most of the code becomes object oriented.

Therefore, we thought of a convenient and efficient solution that allows the use
of only one decorator, Mock decorator that allows to create mocks by placing it above the properties of the class.

Mockingbird offers several options for creating mocks, including the use of the
well-known library Faker, which allows you to create information such as a fake email, a fake username,
a fake address and more.

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements
[faker.js](https://github.com/marak/Faker.js)
