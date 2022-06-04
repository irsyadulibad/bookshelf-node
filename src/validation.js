exports.storeBookvalidation = (params) => {
  const { name, readPage, pageCount } = params;

  if (name === undefined) {
    return {
      isValid: false,
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    };
  }

  if (readPage > pageCount) {
    return {
      isValid: false,
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    };
  }

  return { isValid: true };
};

exports.updateBookvalidation = (params) => {
  const { name, readPage, pageCount } = params;

  if (name === undefined) {
    return {
      isValid: false,
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    };
  }

  if (readPage > pageCount) {
    return {
      isValid: false,
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    };
  }

  return { isValid: true };
};
