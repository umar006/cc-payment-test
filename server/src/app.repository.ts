import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DRIZZLE_PROVIDER, type DrizzlePostgres } from './drizzle.provider';
import { histories } from './transaction-history.schema';
import { User, users } from './user.schema';

@Injectable()
export class AppRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async deposit(fullName: string, depositDto: Record<string, any>) {
    try {
      await this.db.transaction(
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

          await tx.insert(histories).values({
            createdAt: new Date(depositDto.timestamp),
            amount: depositDto.amount,
            type: 'deposit',
            status: 1,
            name: fullName,
          });
        },
        {
          isolationLevel: 'serializable',
        },
      );
    } catch (err) {
      if (err instanceof TypeError) {
        throw new InternalServerErrorException(err.message);
      }
      throw new InternalServerErrorException('unhandle error');
    }
  }

  async withdraw(fullName: string, withdrawDto: Record<string, any>) {
    await this.db.transaction(async (tx) => {
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
        const checkBalance =
          parseFloat(user.balance) < parseFloat(withdrawDto.amount);
        if (checkBalance) {
          throw new UnprocessableEntityException('Insufficient balance');
        }

        await tx
          .update(users)
          .set({ balance: sql`${users.balance} - ${withdrawDto.amount}` });
      }

      await tx.insert(histories).values({
        createdAt: new Date(withdrawDto.timestamp),
        amount: withdrawDto.amount,
        type: 'withdraw',
        status: 1,
        name: fullName,
      });
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
