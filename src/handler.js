const { nanoid } = require('nanoid');
const bookModel = require('./model');
const { storeBookvalidation, updateBookvalidation } = require('./validation');

exports.storeBook = (request, h) => {
  const validation = storeBookvalidation(request.payload);
  const id = nanoid();

  if (!validation.isValid) {
    return h.response({
      status: 'fail',
      message: validation.message,
    }).code(400);
  }

  bookModel.save(id, request.payload);

  if (bookModel.find(id) === undefined) {
    return h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    }).code(500);
  }

  return h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  }).code(201);
};

exports.getBook = (request, h) => {
  const { name: bookName, reading, finished } = request.query;
  let books = bookModel.get();

  if (bookName !== undefined) {
    books = books.filter((book) => {
      const name = book.name.toLowerCase();
      return name.includes(bookName.toLowerCase());
    });
  }

  if (reading !== undefined) {
    books = books.filter((book) => book.reading === Boolean(Number(reading)));
  }

  if (finished !== undefined) {
    books = books.filter((book) => book.finished === Boolean(Number(finished)));
  }

  books = books.map((book) => {
    const { id, name, publisher } = book;
    return { id, name, publisher };
  });

  return h.response({
    status: 'success',
    data: {
      books,
    },
  }).code(200);
};

exports.showBook = (request, h) => {
  const { id } = request.params;
  const book = bookModel.find(id);

  if (!book) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: {
      book,
    },
  }).code(200);
};

exports.updateBook = (request, h) => {
  const { id } = request.params;
  const book = bookModel.find(id);
  const validation = updateBookvalidation(request.payload);

  if (book === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }

  if (!validation.isValid) {
    return h.response({
      status: 'fail',
      message: validation.message,
    }).code(400);
  }

  bookModel.update(book.id, request.payload);

  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  }).code(200);
};

exports.deleteBook = (request, h) => {
  const { id } = request.params;
  const book = bookModel.find(id);

  if (book === undefined) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  }

  bookModel.destroy(book.id);

  return h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  }).code(200);
};
