import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DRIZZLE_PROVIDER, type DrizzlePostgres } from './drizzle.provider';
import { User, users } from './user.schema';

@Injectable()
export class AppRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async deposit(fullName: string, depositDto: Record<string, any>) {
    return await this.db.transaction(
      async (tx) => {
        const [user] = await tx
          .select()
          .from(users)
          .where(eq(users.name, fullName));

        if (!user) {
          await tx.insert(users).values({
            name: fullName,
            balance: depositDto.amount,
          });
        } else {
          await tx
            .update(users)
            .set({ balance: sql`${users.balance} + ${depositDto.amount}` });
        }
      },
      {
        isolationLevel: 'serializable',
      },
    );
  }

  async withdraw(fullName: string, withdrawDto: Record<string, any>) {
    return await this.db.transaction(async (tx) => {
      const [user] = await tx
        .select()
        .from(users)
        .where(eq(users.name, fullName));

      if (!user) {
        await tx.insert(users).values({
          name: 'Umar Abdul Aziz Al-Faruq',
          balance: '0',
        });
      } else {
        if (user.balance < withdrawDto.amount) {
          throw new UnprocessableEntityException('Insufficient balance');
        }

        await tx
          .update(users)
          .set({ balance: sql`${users.balance} - ${withdrawDto.amount}` });
      }
    });
  }

  async balance(fullName: string): Promise<User> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.name, fullName));

    return user;
  }
}
