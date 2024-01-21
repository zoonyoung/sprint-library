export default {
  title: 'Book',
  name: 'book',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'IsRented',
      name: 'isRented',
      type: 'boolean',
    },
    {
      title: 'Image',
      name: 'imgURL',
      type: 'string',
    },
    {
      title: 'Borrower',
      name: 'borrower',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
    },
    {
      title: 'RentalHistory',
      name: 'RentalHistory',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'User',
              name: 'user',
              type: 'reference',
              to: [{ type: 'user' }],
            },
            {
              title: 'Datetime',
              name: 'datetime',
              type: 'datetime',
            },
          ],
        },
      ],
    },
  ],
}
