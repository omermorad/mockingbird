# Faker.ts API Documentation

Here is a detailed explanation of the different options for using the `Mock` decorator

| Identifier                                                    | Function                                                | Will Generate                           | Notes                                                     | 
|---------------------------------------------------------------|---------------------------------------------------------|-----------------------------------------|-----------------------------------------------------------| 
| [Callback](#callback)                                         | `@Mock(callback: (faker: Faker.FakerStatic) => any)` | Value from the callback invocation      |                                                           | 
| [Inferred Value](#dynamic-value)                              | `@Mock()`                                            | Random value inferred from the property type   |                                                           | 
| [Class](#class)                                               | `@Mock(value: ClassType)`                            | Matching class type                     | Primitive constructors can be used as well                | 
| [Absolute Value](#absolute-value)                             | `@Mock(value: string \| boolean \| number \| ObjectLiteral)`| The exact given value                   |                                                           | 
| [Enum](#enum)                                                 | `@Mock(value: { enum: object })`                     | Random value from the given enum        | The random value is not the key of the enum but the value | 
| [Multi Class](#multi-class)                                   | `@Mock(options: { type: ClassType, count: number })` | Array with `count` items from the given `ClassType`     |                                        |                                                           | 

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
    @Mock(faker => faker.internet.email())
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
When using the `Mock` decorator without any value will generate a random value inffered from the property type.

So the result of the following code:

```typescript
class Person {
    @Mock()
    serial: string;

    @Mock()
    points: number;

    @Mock()
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
Passing a class will generate an object with the matching keys (decorated by the `Mock` decorator)

So the result of the following code:

```typescript
class Dog {
  @Mock(faker => faker.name.firstName())
  name: string;
}

class Person {
  @Mock()
  serial: string;

  @Mock()
  points: number;

  @Mock(Dog)
  dog: Dog;

  @Mock()
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

The "Absolute Value" option is pretty strait forward, the generated value from the `Mock` decorator will the exact same value that has been passed

So the result of the following code:

```typescript
class Person {
  @Mock('John')
  serial: string;

  @Mock(78)
  points: number;

  @Mock(true)
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

Passing an enum object to the `Mock` decorator will generate a random value from the given enum (not a key):

So the result of the following code:

```typescript
enum Mood {
  Happy = 'happy',
  Numb = 'numb',
  Sad = 'sad'
}

class Person {
  @Mock({ enum: Mood })
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

The "Absolute Value" option is pretty strait forward, the generated value from the `Mock` decorator will the exact same value that has been passed

So the result of the following code:

```typescript
class Person {
  @Mock('John')
  serial: string;

  @Mock(78)
  points: number;

  @Mock(true)
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
