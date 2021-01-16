[![ISC license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![npm version](http://img.shields.io/npm/v/faker.ts.svg?style=flat)](https://npmjs.org/package/faker.ts "View this project on npm")
[![Codecov Coverage](https://img.shields.io/codecov/c/github/omermorad/faker.ts/master.svg?style=flat-square)](https://codecov.io/gh/omer-morad-ni/faker.ts)
[![CircleCI](https://circleci.com/gh/omermorad/faker.ts.svg?style=shield)](https://circleci.com/gh/circleci/circleci-docs)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

![alt text](docs/faker.ts-logo.png "Faker.ts")

<p align="center">
  <h1 align="center">Faker.ts</h1>

  <p align="center">
    <strong>Easy to Use, Powered by Decorators, Faker.js TypeScript Wrapper</strong>
  </p>
</p>

## Installation
Install the package alongside `faker.js` and `@types/faker` peer dependency:

```bash
npm i -D faker.ts faker @types/faker
```

## Usage

**You can play with Faker.ts in the [REPL Playground here](https://repl.it/@omermorad/Fakerts-Playground)**

**Here is the simplest usage of `Faker.ts`:**

```typescript
import { GeneratorFactory, Generator, Fixture } from 'faker.ts';

class Dog {
  @Fixture(faker => faker.name.firstName())
  readonly name: string;
  
  @Fixture()
  readonly birthday: Date;

  @Fixture()
  readonly goodPoints: number;
}

const result = GeneratorFactory.generate<Dog>(Dog);
```

**A more complex example:**
```typescript
import { GeneratorFactory, Generator, Fixture } from 'faker.ts';

@Generator({ locale: 'de' })
class Person {
  @Fixture(faker => faker.name.firstName())
  readonly name: string;
  
  @Fixture()
  readonly birthday: Date;

  @Fixture(faker => faker.internet.email())
  readonly email: string;

  @Fixture({ type: Dog })
  readonly dog: Dog;
}

const result = GeneratorFactory.generate<Person>(Person);
```

**Have more than one dog? no problem:**

```typescript
@Fixture({ type: [Dog], count: 3 })
readonly dog: Dog;
```

**[You can jump to the full documentation and explore the full API](/tree/master/docs). There are more options available to you in using `@Fixture` decorator and also the `@Generator` decorator as well**

## Motivation
For those of you who are unfamiliar with `Faker.js`, it is an old library written with pure JavaScript (it also has types in `@types/faker`), which is used to
"generate massive amounts of fake data in the browser and Node".

Fake data is usually needed for testing purposes, to assist in the development process itself,
and sometimes, also for the purpose of demonstrations and training.
To generate the data, use the faker library directly, such as: `faker.internet.email()`
and that, of course, will generate a random email address from a pre-made database.

To create full fake objects, you need to place them in a literal object and use `for` loop.
`Faker.ts` provides an easy and simple solution to an annoying and inconvenient problem that
allows you to set "fixtures" as metadata on the department itself.
This also allows the use of interfaces and, among other things, the enforcement of contracts.

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements
[Faker.js](https://github.com/marak/Faker.js)
