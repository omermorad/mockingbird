[![ISC license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![npm version](http://img.shields.io/npm/v/mockingbird-ts.svg?style=flat)](https://npmjs.org/package/mockingbird-ts "View this project on npm")
[![Codecov Coverage](https://img.shields.io/codecov/c/github/omermorad/mockingbird-ts/master.svg?style=flat-square)](https://codecov.io/gh/omermorad/mockingbird-ts)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

<p align="center">
  <img width="450" src="https://raw.githubusercontent.com/omermorad/mockingbird-ts/master/docs/logo.png" alt="Mockingbird Logo" />

  <h1 align="center">Mockingbird</h1>

  <h3 align="center">
    The First TypeScript Mocking Framework
  </h3>

  <h4 align="center">
    Mockingbird allows you to create class mocks like a breeze with a simple yet powerful @Mock decorator (including <a href="https://github.com/marak/Faker.js/">faker.js</a> support)
  </h4>
</p>

## Installation
```bash
npm i -D mockingbird-ts
```

## Usage

**Here is the simplest usage of Mockingbird:**

```typescript
import { Mock, MockFactory } from 'mockingbird-ts';

class Dog {
  @Mock(faker => faker.name.firstName())
  readonly name: string;
  
  @Mock()
  readonly birthday: Date; // Will generate a recent date

  @Mock()
  readonly goodPoints: number; // Will generate a random number
}

const oneDog = MockFactory(Dog).one();
const lotsOfDogs = MockFactory(Dog).many(3);
```

## Documentation

There are many more options that you can use with the `@Mock` decorator (and also the `MockFactory`). \
[Click here to jump to the full documentation and explore the full API](https://github.com/omermorad/faker.ts/blob/master/docs/README.md)

**Besides, we have also created a full working example for you; [you can find it under
the sample folder](https://github.com/omermorad/mockingbird-ts/tree/master/sample)**


## Playground
**We have created a [REPL Playground](https://repl.it/@omermorad/Mockingbird-Playground) where you can see Mockingbird in action!**

## Motivation
When it comes to writing unit tests of large projects containing different and
diverse entities, mocks are widely used to simulate real data.

Creating mocks can be a tedious and cumbersome process and is usually created
manually or by using libraries like Faker or Chance, which also do not offer a complete solution,
especially not when deciding to develop in TypeScript and most of the code becomes object oriented.

Therefore, we thought of a convenient and efficient solution that allows the use
of only one decorator, Mock decorator that allows to create mocks by placing it above the properties of the class.

Mockingbird offers several options for creating mocks, including the use of the
well-known library Faker, which allows you to create information such as a fake email, a fake username,
a fake address and more.

### What is faker.js (aka Faker)?
For those of you who are unfamiliar with `faker.js`, it is an old library written
with pure JavaScript, which is used to "generate massive amounts of fake data in
the browser and Node".

Fake data is usually needed for testing purposes, to assist in the development process itself,
and sometimes, also for the purpose of demonstrations and training.

Mockingbird uses Faker under the hood and making it possible to use faker.js in
a "TypeScript" way, and thereby allows to create mocks that are meaningful like
email, first name, address and many more.

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements
[faker.js](https://github.com/marak/Faker.js)
