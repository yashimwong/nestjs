import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.enity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  // To Do: Add DB Operations
}
