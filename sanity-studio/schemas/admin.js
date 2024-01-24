export default {
  title: 'Admin',
  name: 'admin',
  type: 'document',
  fields: [
    {
      title: 'admina',
      name: 'admina',
      type: 'reference',
      to: [{ type: 'user' }],
      options: {
        filter: 'true == $isAdmin',
        filterParams: { isAdmin: ' isAdmin' },
      },
    },
  ],
}
