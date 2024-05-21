import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_PROVIDER, type DrizzlePostgres } from './drizzle.provider';
import { users } from './user.schema';
import { eq, sql } from 'drizzle-orm';

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
}
