import {
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const histories = pgTable('transaction_histories', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  amount: numeric('amount', { scale: 2 }).notNull(),
  type: varchar('type').notNull(),
  status: varchar('status').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
});
