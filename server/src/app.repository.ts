import { Inject, Injectable } from '@nestjs/common';
import { desc, eq, sql } from 'drizzle-orm';
import { DRIZZLE_PROVIDER, DrizzlePostgres } from './database/drizzle.provider';
import { DepositDTO } from './dtos/deposit.dto';
import { WithdrawDTO } from './dtos/withdraw.dto';
import {
  TransactionHistory,
  histories,
} from './schemas/transaction-history.schema';
import { User, users } from './schemas/user.schema';

@Injectable()
export class AppRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async createDeposit(fullName: string, depositDto: DepositDTO) {
    await this.db.transaction(
      async (tx) => {
        const [user] = await tx
          .select()
          .from(users)
          .where(eq(users.name, fullName));

        if (depositDto.status === 1) {
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
        }

        await tx.insert(histories).values({
          createdAt: new Date(depositDto.timestamp),
          orderId: depositDto.orderId,
          amount: depositDto.amount,
          type: 'deposit',
          status: depositDto.status,
          name: fullName,
        });
      },
      {
        isolationLevel: 'serializable',
      },
    );
  }

  async createWithdraw(fullName: string, withdrawDto: WithdrawDTO) {
    await this.db.transaction(
      async (tx) => {
        const [user] = await tx
          .select()
          .from(users)
          .where(eq(users.name, fullName));

        if (!user) {
          await tx.insert(users).values({
            name: fullName,
            balance: '0',
          });
        } else {
          await tx
            .update(users)
            .set({ balance: sql`${users.balance} - ${withdrawDto.amount}` });
        }

        await tx.insert(histories).values({
          createdAt: new Date(withdrawDto.timestamp),
          orderId: withdrawDto.orderId,
          amount: withdrawDto.amount,
          type: 'withdraw',
          status: 1,
          name: fullName,
        });
      },
      {
        isolationLevel: 'serializable',
      },
    );
  }

  async getBalance(fullName: string): Promise<User> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.name, fullName));

    return user;
  }

  async getTransactionHistories(): Promise<TransactionHistory[]> {
    const historyList = await this.db
      .select()
      .from(histories)
      .orderBy(desc(histories.createdAt));
    return historyList;
  }
}
