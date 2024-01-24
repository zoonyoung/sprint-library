export type OAuthUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

import { client } from './sanity';

export async function addUser({ id, name, email, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    name,
    email,
    image,
    id,
    isAdmin: false,
    isRegister: false,
  });
}
