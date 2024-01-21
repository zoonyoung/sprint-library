export default {
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'Username',
      name: 'username',
      type: 'string',
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'ImageURL',
      name: 'imageURL',
      type: 'string',
    },
    {
      title: 'BorrowedBooks',
      name: 'borrowedbooks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'book' }],
        },
      ],
    },
    {
      title: 'IsRegister',
      name: 'isregister',
      type: 'boolean',
    },
    {
      title: 'IsAdmin',
      name: 'isadmin',
      type: 'boolean',
    },
    {
      title: 'UID',
      name: 'uid',
      type: 'string',
    },
  ],
}
