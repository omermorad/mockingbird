import { Mock } from 'mockingbird';
import { UserEntity } from '../../src/entity/user.entity';

export class UserEntityMock implements UserEntity {
  id: number;

  @Mock((faker) => faker.name.firstName())
  firstName!: string;

  @Mock((faker) => faker.name.lastName())
  lastName!: string;

  @Mock((faker) => faker.address.streetAddress(true))
  address!: string;

  @Mock()
  birthday!: Date;

  @Mock((faker) => faker.internet.email())
  email!: string;
}
