import { client } from './sanity';
export async function getBooks() {
  return client.fetch('*[_type == "book"] {title,image,quantity,rent}');
}
