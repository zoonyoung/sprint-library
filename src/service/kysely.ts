import { Generated } from 'kysely';
import { createKysely } from '@vercel/postgres-kysely';

interface UserTable {
  id: Generated<number>;
  name: string;
  email: string;
  image: string;
  course: string;
  cohort: number;
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
  rent?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface RentalTable {
  id: Generated<number>;
  userId: number;
  bookId: number;
  rentedAt: Date;
  dueDate: Date;
  returnedAt: Date;
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
  updatedAt: Date;
}

export interface Database {
  users: UserTable;
  books: BookTable;
  rentals: RentalTable;
  reviews: ReviewTable;
  favorites: FavoriteTable;
}

export const db = createKysely<Database>();

export { sql } from 'kysely';
