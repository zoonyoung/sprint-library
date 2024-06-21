import { db } from '@/service/kysely';

export async function addUser({ id, name, email, image }) {
  return db.insertInto().onConflict();
}
sd;
