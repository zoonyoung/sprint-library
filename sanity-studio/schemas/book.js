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
      title: 'Quantity',
      name: 'quantity',
      type: 'number',
    },
    {
      title: 'Rent',
      name: 'rente',
      type: 'number',
    },
    {
      title: 'Borrower',
      name: 'borrower',
      type: 'object',
      fields: [
        { title: 'User', name: 'user', type: 'reference', to: [{ type: 'user' }] },
        { title: 'RentDate', name: 'rentDate', type: 'datetime' },
      ],
    },
    {
      title: 'Image',
      name: 'imgURL',
      type: 'string',
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
              title: 'RentDate',
              name: 'rentDate',
              type: 'datetime',
            },
            {
              title: 'ReturnDate',
              name: 'returnDate',
              type: 'datetime',
            },
          ],
        },
      ],
    },
  ],
}
