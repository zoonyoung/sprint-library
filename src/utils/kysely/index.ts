import { createKysely } from "@vercel/postgres-kysely";
import { Generated } from "kysely";

interface UserTable {
  id: Generated<number>;
  name: string;
  email: string;
  image: string;
  course: string;
  cohort: number;
  isSignUp: boolean;
  isRegister: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface BookTable {
  id: Generated<number>;
  title: string;
  image: string;
  author: string;
  publisher: string;
  tags: string[];
  quantity: number;
  rent: number;
  createdAt: Date;
  updatedAt: Date;
}

interface RentalTable {
  id: Generated<number>;
  userId: number;
  bookId: number;
  rentedAt: Date;
  dueDate: Date;
  returnedAt: Date | null;
  isRented: boolean;
  isOverdue: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ReviewTable {
  id: Generated<number>;
  userId: number;
  bookId: number;
  rating: number;
  title: string;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FavoriteTable {
  id: Generated<number>;
  userId: number;
  bookId: number;
  createdAt: Date;
}

export interface CourseTable {
  id: Generated<number>;
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface Database {
  users: UserTable;
  books: BookTable;
  rentals: RentalTable;
  reviews: ReviewTable;
  favorites: FavoriteTable;
  course: CourseTable;
}

export const db = createKysely<Database>();
export { sql } from "kysely";
