import {
  timestamp
} from 'drizzle-orm/pg-core';


const createdAt = timestamp('created_at').notNull().defaultNow();
const updatedAt = timestamp('updated_at')
  .notNull()
  .defaultNow()
  .$onUpdateFn(() => new Date());


export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull(), // sync with Clerk
  clerkId: text('clerk_id').notNull().unique(), // unique ID from the authentication provider (e.g. Clerk)
  coins: integer('coins').default(0).notNull(), // gold coin counter (e.g. "42")
  createdAt,
  updatedAt,
},
  (t) => [uniqueIndex('clerk_id_idx').on(t.clerkId)]
);
