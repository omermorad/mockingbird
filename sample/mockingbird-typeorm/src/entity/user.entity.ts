import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Mock } from 'mockingbird-ts';
import { User } from '../interface/user.interface';

@Entity('users')
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Mock((faker) => faker.name.firstName())
  firstName: string;

  @Column()
  @Mock((faker) => faker.name.lastName())
  lastName: string;

  @Column()
  @Mock((faker) => faker.address.streetAddress(true))
  address: string;

  @Column()
  @Mock()
  birthday: Date;

  @Column()
  @Mock((faker) => faker.internet.email())
  email: string;
}
