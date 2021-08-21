import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../interface/user.interface';

@Entity('users')
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  birthday: Date;

  @Column()
  email: string;
}
