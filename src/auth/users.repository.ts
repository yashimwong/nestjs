import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashed_password = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashed_password });

    try {
      await this.save(user);
    } catch (error) {
      // postgresql duplicate column error
      if (error.code === '23505') {
        throw new ConflictException('username already exist');
      }
      throw new InternalServerErrorException();
    }
  }
}
