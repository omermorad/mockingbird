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

<br>

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

<details><summary><b>🕵️‍ Discover more about MockBuilder interface</b></summary><p>

```typescript
export interface MockBuilder<TClass = any> {
  setLocale(locale: string): this;
  plain(): this;
  mutate(overrides: OverrideKeys<TClass>): Omit<MockBuilder<TClass>, 'mutate'>;
  ignore(...keys: IgnoreKeys<TClass>): this;
  one(): TClass;
  many(count: number): TClass[];
}
```
</p></details>


## API

### `.one()`
Simply creates (and return) a new mock from the class (`Bird`); here is an example:

```typescript
const birdMock = MockFactory<Bird>(Bird).one();
```

<details><summary><code>💡Hint</code></summary><p>

```
The .one() method can not be chained,
it just return an instance of the class
```
</p></details>

<br />

### `.many(count: number)`
Creates (and return) the required `count` mocks from the class; \
here is an example:

```typescript
const birdMock = MockFactory<Bird>(Bird).many(3);
```

<details><summary><code>💡Hint</code></summary><p>

```
The .one() method can not be chained,
it just return an instance of the class
```
</p></details>

<br />

### `.setLocale(locale: string)`
Sets the locale of the fake data (only apply when you use `faker`):

```typescript
const builder = MockFactory<Bird>(Bird).setLocale('es');
```

<details><summary><code>💡Hint</code></summary><p>

```
The method is relevant only when using faker in the mock decorator 
```

```typescript
export class Bird {
  @Mock((faker) => faker.random.name())
  name: string;
}

const bird = MockFactory<Bird>(Bird).setLocale('es').one();
```

```
bird.name will be translated into Spanish
```

</p></details>

<br />

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