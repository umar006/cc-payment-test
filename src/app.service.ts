import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DRIZZLE_PROVIDER, type DrizzlePostgres } from './drizzle.provider';
import { users } from './user.schema';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class AppService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
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

    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.name, fullName));

    if (!user) {
      await this.db.insert(users).values({
        name: 'Umar Abdul Aziz Al-Faruq',
        balance: depositDto.amount,
      });
    } else {
      await this.db
        .update(users)
        .set({ balance: sql`${users.balance} + ${depositDto.amount}` });
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

    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.name, fullName));

    if (!user) {
      await this.db.insert(users).values({
        name: 'Umar Abdul Aziz Al-Faruq',
        balance: '0',
      });
    } else {
      if (user.balance < withdrawDto.amount) {
        throw new UnprocessableEntityException('Unsufficient balance');
      }

      await this.db
        .update(users)
        .set({ balance: sql`${users.balance} - ${withdrawDto.amount}` });
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
