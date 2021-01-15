# Faker.ts API Documentation

Here is a detailed explanation of the different options for using the `Fixture` decorator

| Identifier                                                    | Function                                                | Will Generate                           | Notes                                                     | 
|---------------------------------------------------------------|---------------------------------------------------------|-----------------------------------------|-----------------------------------------------------------| 
| [Callback](#callback)                                                      | `@Fixture(callback: (faker: Faker.FakerStatic) => any)` | The value from the callback invocation  |                                                           | 
| [Dynamic Value](#dynamic-value)                                                 | `@Fixture()`                                            | Random value from given property type   | See examples below                                        | 
| [Class](#class)                                                   | `@Fixture(value: ClassType)`                            | A matching class type                   | Primitive can be used as well                             | 
| [Absolute Value](#absolute-value)                                                | `@Fixture(value: string \| boolean \| number)`          | The exact given value                   |                                                           | 
| [Enum](#enum)                                                          | `@Fixture(value: { enum: object })`                     | A random value from the given enum        | The random value is not the key of the enum but the value | 
| [Multi Class](#multi-class)                                                   | `@Fixture(value: ClassType, { total: number })`         | An array with `total` items from the given `ClassType`     |                                         |                                                           | 

The `ClassType` interface looks like this:

```typescript
interface ClassType<T = any> extends Function {
  new (...args: any[]): T;
}
```

The interface is represents a kind of actual class (not an instance)

## Callback

The first option, probably the most used one, is to pass a callback function that uses the `faker` parameter as the actual `faker` instance.

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

## Dynamic Value
When using the `Fixture` decorator without any value will generate a random value reflected from the property type.

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


## Class
Passing a class will generate an object with the matching keys (and of course decorated by `Fixture`)

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

## Absolute value

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
