# Mockingbird Factory API

## Introduction
Mockingbird provides a simple way to create mocks (sometimes called fixtures)
and to apply many variations on them. \
The entry point of Mockingbird is a simple function called `MockFactory()`, which takes 
a class as an argument and an optional generic type, for example: `MockFactory<Bird>(Bird)`.

`MockFactory` will return a builder which you can apply some more options on (like `mutate` and `ignore`),
or just simply create a single mock or many mocks.

## `MockFactory`

Signature:
```typescript
function MockFactory<TClass>(target: Class<TClass>): MockBuilder<TClass>;
```

Where `Class<TClass>` is an actual JavaScript class. \
Returns `MockBuilder` when invoked.

## `MockBuilder`

Consider the following class (we will use it in the following examples of each method):

```typescript
import { Mock } from 'mockingbird-ts'; 

export class Bird {
  @Mock((faker) => faker.random.name())
  name: string;
  
  @Mock(true) // Cause birds are always awesome :)
  isAwesome: boolean;
  
  @Mock()
  canFly: boolean;
}
```

## Methods

### `.one()`

#### Example

```typescript
const birdMock = MockFactory<Bird>(Bird).one();
```

### `.setLocale()`

#### Example

```typescript
const birdMock = MockFactory<Bird>(Bird).setLocale('es').one();
```

### `.many()`

#### Example

```typescript
const birdMock = MockFactory<Bird>(Bird).many();
```

### `.plain()`

#### Example

```typescript
// Will return a plain object and NOT an instance of the class Bird
const birdMock = MockFactory<Bird>(Bird).plain().one();
```

### `.ignore()`


#### Example

```typescript
// Create a mock without 'canFly' property
const birdMock = MockFactory<Bird>(Bird).ignore('canFly').one();
```

### `.mutate()`


#### Example

```typescript
const birdMock = MockFactory<Bird>(Bird).mutate({ name: 'Birdy Bird' }).one();
```