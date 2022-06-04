const {
  storeBook, getBook, showBook, updateBook, deleteBook,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: storeBook,
  },

  {
    method: 'GET',
    path: '/books',
    handler: getBook,
  },

  {
    method: 'GET',
    path: '/books/{id}',
    handler: showBook,
  },

  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBook,
  },

  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBook,
  },
];

module.exports = routes;
