import { DataSource, Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import User from './user.entity';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';
import { compare, hash } from 'src/util/encrypt';

@Injectable()
class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const password_hash = await hash(password);
    const user = this.create({
      username,
      password: password_hash,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists!');
      }
      throw new InternalServerErrorException();
    }
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    try {
      const user = await this.findOne({
        where: {
          username: username,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found! Please register');
      }
      const password_hashed = user.password;
      const matched = compare(password, password_hashed);
      if (!matched) {
        throw new UnauthorizedException('Password does not match');
      }
    } catch (error) {
      throw error;
    }
  }
}

export default UserRepository;
