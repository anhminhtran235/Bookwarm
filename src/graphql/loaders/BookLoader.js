const DataLoader = require('dataloader');

const BookLoader = (bookService) =>
    new DataLoader(async (ids) => {
        const books = await bookService.findAllByIds(ids);

        const bookMap = {};
        books.forEach((book) => {
            bookMap[book.id] = book;
        });

        return ids.map((id) => bookMap[id]);
    });

module.exports = BookLoader;
