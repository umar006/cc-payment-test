import { numeric, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  balance: numeric('balance', { scale: 2 }).default('0'),
});

export type User = typeof users.$inferSelect;
