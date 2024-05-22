import {
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const histories = pgTable('transaction_histories', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  orderId: varchar('order_id').notNull(),
  amount: numeric('amount', { scale: 2 }).notNull(),
  type: varchar('type').notNull(),
  status: integer('status').notNull(),
  name: varchar('name').notNull(),
});
