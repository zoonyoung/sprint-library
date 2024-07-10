import { db } from "@/utils/kysely";

export const SECRET = process.env.AUTH_SECRET || "";

export const checkIfNewUser = async (email: string) => {
  const newUser = await db
    .selectFrom("users")
    .select(["id", "isRegister", "isAdmin"])
    .where("email", "=", email)
    .executeTakeFirst();
  return !newUser;
};

export const getUserByEmail = async (email: string) => {
  if (!email) return;
  const user = await db
    .selectFrom("users")
    .select(["id", "name", "isSignUp", "isRegister", "isAdmin", "course"])
    .where("email", "=", email)
    .executeTakeFirst();

  return user;
};

export const addTempUser = async (name: string, email: string, image: string) => {
  await db
    .insertInto("users")
    .values({
      name: name,
      email: email,
      image: image,
      course: "",
      isSignUp: false,
      isRegister: false,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .execute();
  console.log("register tempUser");
};
