import { Mock } from 'mockingbird';
import { UserEntity } from '../../src/entity/user.entity';

export class ProductMock {
  @Mock(({ datatype }) => datatype.uuid())
  id!: string;

  @Mock(({ commerce }) => commerce.product())
  name!: string;
}

export class UserEntityMock implements UserEntity {
  id: number;

  @Mock(({ name }) => name.firstName())
  firstName!: string;

  @Mock(({ name }) => name.lastName())
  lastName!: string;

  @Mock(({ address }) => address.streetAddress(true))
  address!: string;

  @Mock()
  birthday!: Date;

  @Mock(({ internet }) => internet.email())
  email!: string;

  @Mock(() => ProductMock, { count: 3 })
  products: ProductMock[];

  @Mock(() => ProductMock)
  product: ProductMock;
}
