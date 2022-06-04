const books = require('./books');

const get = () => books;

const find = (id) => {
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) return undefined;
  return books[index];
};

const save = (id, payload) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = payload;

  const insertedAt = new Date().toISOString();

  const book = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: (pageCount === readPage),
    reading,
    insertedAt,
    updatedAt: insertedAt,
  };

  books.push(book);
  return book;
};

const update = (id, payload) => {
  const index = books.findIndex((book) => book.id === id);
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = payload;

  const book = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: (pageCount === readPage),
    reading,
    updatedAt: new Date().toISOString(),
  };

  books[index] = book;
  return book;
};

const destroy = (id) => {
  const index = books.findIndex((book) => book.id === id);
  books.splice(index, 1);
};

module.exports = {
  get, find, save, update, destroy,
};
