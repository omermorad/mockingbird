# Faker.ts API Documentation

Here is a detailed explanation of the different options for using the `Fixture` decorator

| Identifier                                                    | Function                                                | Will Generate                           | Notes                                                     | 
|---------------------------------------------------------------|---------------------------------------------------------|-----------------------------------------|-----------------------------------------------------------| 
| [Callback](#callback)                                         | `@Fixture(callback: (faker: Faker.FakerStatic) => any)` | Value from the callback invocation      |                                                           | 
| [Inffered Value](#dynamic-value)                              | `@Fixture()`                                            | Random value inferred from the property type   |                                                           | 
| [Class](#class)                                               | `@Fixture(value: ClassType)`                            | Matching class type                     | Primitive constructors can be used as well                | 
| [Absolute Value](#absolute-value)                             | `@Fixture(value: string \| boolean \| number \| object)`| The exact given value                   |                                                           | 
| [Enum](#enum)                                                 | `@Fixture(value: { enum: object })`                     | Random value from the given enum        | The random value is not the key of the enum but the value | 
| [Multi Class](#multi-class)                                   | `@Fixture(options: { type: ClassType, count: number })` | Array with `count` items from the given `ClassType`     |                                        |                                                           | 

The `ClassType` interface looks like this:

```typescript
interface ClassType<T = any> extends Function {
  new (...args: any[]): T;
}
```

and represents a 'type' of actual class (not an instance)

## Callback

The first option, probably the most common one, is to pass a callback function that uses the `faker` argument as the actual `faker` instance.

So the result of the following code:

```typescript
class Person {
    @Fixture(faker => faker.internet.email())
    email: string;
}
```

will be
```typescript
{
  email: 'some-email-address'
}
```

## Inffered Value
When using the `Fixture` decorator without any value will generate a random value inffered from the property type.

So the result of the following code:

```typescript
class Person {
    @Fixture()
    serial: string;

    @Fixture()
    points: number;

    @Fixture()
    isLucky: boolean;
}
```

will be:

```typescript
{
  serial: 'uirjkcmovf',
  points: 64,
  isLucky: true 
}
```

Type `string` will generate a 10 characters random string \
Type `number` will generate a number between `1` to `100` \
Type `boolean` will of course generate `true` or `false` 

## Class (Single)
Passing a class will generate an object with the matching keys (decorated by the `Fixture` decorator)

So the result of the following code:

```typescript
class Dog {
  @Fixture(faker => faker.name.firstName())
  name: string;
}

class Person {
  @Fixture()
  serial: string;

  @Fixture()
  points: number;

  @Fixture(Dog)
  dog: Dog;

  @Fixture()
  isLucky: boolean;
}
```

Will be:

```typescript
{
  serial: 'uirjkcmovf',
  points: 64,
  dog: {
    name: 'Bucky'
  },
  isLucky: true 
}
```

## Absolute Value

The "Absolute Value" option is pretty strait forward, the generated value from the `Fixture` decorator will the exact same value that has been passed

So the result of the following code:

```typescript
class Person {
  @Fixture('John')
  serial: string;

  @Fixture(78)
  points: number;

  @Fixture(true)
  isLucky: boolean;
}
```

Will be:

```typescript
{
  serial: 'John',
  points: 78,
  isLucky: true 
}
```

## Enum

Passing an enum object to the `Fixture` decorator will generate a random value from the given enum (not a key):

So the result of the following code:

```typescript
enum Mood {
  Happy = 'happy',
  Numb = 'numb',
  Sad = 'sad'
}

class Person {
  @Fixture({ enum: Mood })
  mood: string;
}
```

Will be:

```typescript
{
  serial: 'John',
  points: 78,
  isLucky: true 
}
```

## Multi Class

The "Absolute Value" option is pretty strait forward, the generated value from the `Fixture` decorator will the exact same value that has been passed

So the result of the following code:

```typescript
class Person {
  @Fixture('John')
  serial: string;

  @Fixture(78)
  points: number;

  @Fixture(true)
  isLucky: boolean;
}
```

Will be:

```typescript
{
  serial: 'John',
  points: 78,
  isLucky: true 
}
```
