[![ISC license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![npm version](http://img.shields.io/npm/v/mockingbird.svg?style=flat)](https://npmjs.org/package/mockingbird "View this project on npm")
[![Codecov Coverage](https://img.shields.io/codecov/c/github/omermorad/mockingbird/master.svg?style=flat-square)](https://codecov.io/gh/omermorad/mockingbird)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![ci](https://github.com/omermorad/mockingbird/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/omermorad/mockingbird/actions)

<p align="center">
  <img width="450" src="https://raw.githubusercontent.com/omermorad/mockingbird/master/docs/logo.png" alt="Mockingbird Logo" />

  <h1 align="center">Mockingbird</h1>

  <h3 align="center">
    The First TypeScript Mocking Framework
  </h3>

  <h4>
    Mockingbird allows you to create class mocks like a breeze with a simple yet powerful @Mock decorator (including <a href="https://github.com/marak/Faker.js/">faker.js</a> support).
  </h4>

  <h4>
    Simply put - Mockingbird gives you a full control on your own fixtures; You can stub them and mock the actual value, replace values, and ignore them as well.
  </h4>
</p>

## Installation

```bash
npm i mockingbird
```

## Usage

**Here is the simplest usage of Mockingbird:**

```typescript
import { Mock, MockFactory } from 'mockingbird';

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
[Click here to jump to the full documentation and explore the full API](https://github.com/omermorad/mockingbird/blob/master/docs/README.md)

**Besides, we have also created a full working example for
you; [you can find it under the sample folder](https://github.com/omermorad/mockingbird/tree/master/sample)**

## Playground

**We have created a [REPL Playground](https://repl.it/@omermorad/Mockingbird-Playground) where you can see Mockingbird
in action!**

## Use Cases
- Prepare as many unique fixtures as you need for your tests
 - Generate fake (but reasonable) data database seeding 

#### How can Mockingbird help me?
Consider the following snippets:

**`dog-model.ts`**

```typescript
import { Mock, MockFactory } from 'mockingbird';

export interface DogModel {
  name: string;
  birthday: Date;
  goodPoints: number;
}

export class DogModel {
  @Mock(faker => faker.name.firstName())
  name: string;

  // Will generate a recent date
  @Mock()
  birthday: Date;

  // Will generate a random number
  @Mock()
  goodPoints: number;
}
```

**`dogs-integration.test.ts`**

```typescript
import { DogsApiService } from './dogs-service';
import { DogModel } from './dog-model';

describe('Dogs API Integration Test', () => {
  // Assume we have dogs-service.ts that fetches from some API
  const apiService: jest.Mocked<DogsApiService> = {
    fetch: jest.fn(),
  };

  let dogs: DogModel[];
  
  beforeAll(() => {
    factory = MockFactory<DogModel>(DogModel);
  });

  test('Test something you want', async () => {
    dogs = factory.many(3); // Generate 3 different dogs
    apiService.fetch.mockResolvedValue(dogs);

    const resultFromApi = await apiService.fetch();
    expect(resultFromApi).toEqual(dogs);
  });

  test('Test something else you want', async () => {
    dogsWithZeroPoints = factory.mutate({ goodPoints: 0 }).many(3);
    apiService.fetch.mockResolvedValue(dogsWithZeroPoints);

    const resultFromApi = await apiService.fetch();
    
    expect(resultFromApi).toEqual(dogsWithZeroPoints);
    expect(dogsWithZeroPoints[0].goodPoints).toBe(0);
  });
});
```

## Motivation

When it comes to writing tests of large projects containing different and diverse entities, mocks (sometimes called "
fixtures") are widely used to simulate real data.

Creating mocks (or fixtures) can be a tedious and cumbersome process and is usually created manually or by using
libraries like Faker or Chance, which also do not offer a complete solution, especially not when you write TypeScript
only, and most of the code is object-oriented and arranged with classes.

We came up with a simple (and efficient) yet super convenient solution: all you have to do to get fixtures out of the
box is to decorate your classes (whether it's an entity, or a model representing the database layer) and generate simple
or complex fixtures.

Mockingbird offers several options for creating mocks, including the use of the well-known library Faker, which allows
you to create data such as a fake email, a fake username, a fake address and more.u to create information such as a fake
email, a fake username, a fake address and more.

### What is `faker.js` (aka Faker)?

For those of you who are unfamiliar with `faker.js`, it is a library which is used to "generate massive amounts of fake data in the browser and Node".

Mockingbird uses `faker.js` under the hood, making it possible to use Faker in it's "TypeScript" way, and thereby allows
to create mocks that are meaningful like email, first name, address and many more.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgements

[faker.js](https://github.com/marak/Faker.js)
