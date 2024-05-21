import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { AppRepository } from './app.repository';
import { DRIZZLE_PROVIDER, type DrizzlePostgres } from './drizzle.provider';
import { users } from './user.schema';

@Injectable()
export class AppService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
    private readonly appRepo: AppRepository,
  ) {}

  async deposit(depositDto: Record<string, any>) {
    const fullName = 'Umar Abdul Aziz Al-Faruq';

    await fetch('https://youdomain.com/deposit', {
      signal: AbortSignal.timeout(100),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${btoa('Umar Abdul Aziz Al-Faruq')}`,
      },
      body: JSON.stringify(depositDto),
    }).catch((e) => e);

    try {
      await this.appRepo.deposit(fullName, depositDto);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    return {
      order_id: depositDto.order_id,
      amount: depositDto.amount,
      status: 1,
    };
  }

  async withdraw(withdrawDto: Record<string, any>) {
    const fullName = 'Umar Abdul Aziz Al-Faruq';

    await fetch('https://youdomain.com/withdraw', {
      signal: AbortSignal.timeout(100),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${btoa('Umar Abdul Aziz Al-Faruq')}`,
      },
      body: JSON.stringify(withdrawDto),
    }).catch((e) => e);

    try {
      await this.appRepo.withdraw(fullName, withdrawDto);
    } catch (err) {
      throw err;
    }

    return {
      order_id: withdrawDto.order_id,
      amount: withdrawDto.amount,
      status: 1,
    };
  }

  async balance() {
    const fullName = 'Umar Abdul Aziz Al-Faruq';

    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.name, fullName));

    return user;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
