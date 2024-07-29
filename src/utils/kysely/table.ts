import { sql } from "kysely";

import { db } from ".";

export async function seed() {
  const createUsersTable = await db.schema
    .createTable("users")
    .ifNotExists()
    .addColumn("id", "serial", cb => cb.primaryKey())
    .addColumn("name", "varchar(255)", cb => cb.notNull())
    .addColumn("email", "varchar(255)", cb => cb.notNull().unique())
    .addColumn("image", "varchar(255)")
    .addColumn("course", "varchar(255)", cb => cb.notNull().defaultTo(""))
    .addColumn("cohort", "int2", cb => cb.notNull().defaultTo(0))
    .addColumn("isSignUp", "boolean", cb => cb.notNull().defaultTo(false))
    .addColumn("isRegister", "boolean", cb => cb.notNull().defaultTo(false))
    .addColumn("isAdmin", "boolean", cb => cb.notNull().defaultTo(false))
    .addColumn("createdAt", "timestamp", cb => cb.notNull().defaultTo(sql`now()`))
    .addColumn("updatedAt", "timestamp", cb => cb.notNull().defaultTo(sql`now()`))
    .execute();
  console.log("Created 'users' table");

  const createBooksTable = await db.schema
    .createTable("books")
    .ifNotExists()
    .addColumn("id", "serial", cb => cb.primaryKey())
    .addColumn("title", "varchar(255)", cb => cb.notNull())
    .addColumn("image", "varchar(255)", cb => cb.notNull())
    .addColumn("author", "varchar(255)", cb => cb.notNull())
    .addColumn("publisher", "varchar(255)", cb => cb.notNull())
    .addColumn("tags", sql`text[]`)
    .addColumn("quantity", "int2", cb => cb.notNull().defaultTo(1))
    .addColumn("rent", "int2", cb => cb.defaultTo(0))
    .addColumn("createdAt", "timestamp", cb => cb.notNull().defaultTo(sql`now()`))
    .addColumn("updatedAt", "timestamp", cb => cb.notNull().defaultTo(sql`now()`))
    .execute();
  console.log("Created 'books' table");

  const createRentalsTable = await db.schema
    .createTable("rentals")
    .ifNotExists()
    .addColumn("id", "serial", cb => cb.primaryKey())
    .addColumn("userId", "int4", cb => cb.references("users.id"))
    .addColumn("bookId", "int4", cb => cb.references("books.id"))
    .addColumn("rentedAt", "timestamp", cb => cb.notNull().defaultTo(sql`now()`))
    .addColumn("dueDate", "timestamp", cb => cb.notNull())
    .addColumn("returnedAt", "timestamp", cb => cb.defaultTo(null))
    .addColumn("isRented", "boolean", cb => cb.notNull().defaultTo(true))
    .addColumn("isOverdue", "boolean", cb => cb.notNull().defaultTo(false))
    .addColumn("createdAt", "timestamp", cb => cb.notNull().defaultTo(sql`now()`))
    .addColumn("updatedAt", "timestamp", cb => cb.notNull().defaultTo(sql`now()`))
    .execute();
  console.log("Created 'rentals' table");

  const createReviewsTable = await db.schema
    .createTable("reviews")
    .ifNotExists()
    .addColumn("id", "serial", cb => cb.primaryKey())
    .addColumn("userId", "int4", cb => cb.references("users.id").notNull())
    .addColumn("bookId", "int4", cb => cb.references("books.id").notNull())
    .addColumn("rating", "int2", cb => cb.notNull())
    .addColumn("title", "varchar(255)")
    .addColumn("review", "text")
    .addColumn("createdAt", "timestamp", cb => cb.notNull().defaultTo(sql`now()`))
    .addColumn("updatedAt", "timestamp", cb => cb.notNull().defaultTo(sql`now()`))
    .addCheckConstraint("checkrating", sql`rating >= 1 AND rating <= 5`)

    .execute();
  console.log("Created 'reviews' table");

  const createFavoritesTable = await db.schema
    .createTable("favorites")
    .ifNotExists()
    .addColumn("id", "serial", cb => cb.primaryKey())
    .addColumn("userId", "int4", cb => cb.references("users.id").notNull())
    .addColumn("bookId", "int4", cb => cb.references("books.id").notNull())
    .addColumn("createdAt", "timestamp", cb => cb.notNull().defaultTo(sql`now()`))
    .execute();
  console.log("Created 'favorites' table");

  const createCourseTable = await db.schema
    .createTable("course")
    .ifNotExists()
    .addColumn("id", "serial", cb => cb.primaryKey())
    .addColumn("name", "varchar(255)", cb => cb.references("users.id").notNull())
    .addColumn("createdAt", "timestamp", cb => cb.notNull().defaultTo(sql`now()`))
    .addColumn("updatedAt", "timestamp", cb => cb.notNull().defaultTo(sql`now()`))
    .execute();

  return {
    createUsersTable,
    createBooksTable,
    createRentalsTable,
    createReviewsTable,
    createFavoritesTable,
    createCourseTable,
  };
}
