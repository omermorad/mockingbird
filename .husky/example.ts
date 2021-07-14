import { Mock } from '../packages/mockingbird/src';
import { MockBuilder } from '../packages/mockingbird/src/lib/mock-builder';

function MockAttach(...args: any[]): PropertyDecorator {}

class Dog {
  @Mock((faker) => faker.datatype.uuid())
  id: string;

  @Mock('constant-name')
  name: string;

  @Mock()
  points: number;
}

class Cat {
  @Mock((faker) => faker.datatype.uuid())
  id: string;

  @Mock()
  name: string;

  @Mock()
  snacks: number;
}

class Person {
  @Mock((faker) => faker.datatype.uuid())
  id: string;

  @Mock(Number, { attach: Dog, withProp: 'id' })
  dog_id: string;

  @MockAttach(Cat, 'cat_id')
  cat_id: string;
}

MockBuilder.many(Person, 3).withMany(Dog, 3).withMany(Cat, 2).save('Person API Company');
/*
MockGenerator.create(Person, { attach: { Dog: 3, Cat: 2 } } })
 */

const person = FixtureOf(Person).from('Person API Company').many(3);
