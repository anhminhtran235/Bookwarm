jest.mock('../CloudinaryService.js', () => ({
    uploadImage: () => ({ url: 'someUrl' }),
}));

const BookService = require('../BookService');

const getMockStore = () => ({
    bookRepo: {
        findPaginate: jest.fn(),
        countBooks: jest.fn(),
        findAll: jest.fn(),
        findOneById: jest.fn(),
        insert: jest.fn(),
        insertMany: jest.fn(),
        updateById: jest.fn(),
        deleteById: jest.fn(),
    },
    userRepo: {
        findById: jest.fn(),
        addNewBook: jest.fn(),
    },
});

let bookService = null;
let mockStore = null;
beforeEach(() => {
    jest.resetModules();
    mockStore = getMockStore();
    bookService = new BookService({ store: mockStore });
    bookService.initialize({ context: { req: { parsedToken: 'xyz' } } });
});

describe('[BookService.findPaginatedBooksFromCriteria]', () => {
    it('Should successfully find paginated books from criteria', async () => {
        // given
        const args = {
            criteria: { titleContains: 'abc' },
            skip: 12,
            limit: 20,
        };

        // when
        await bookService.findPaginatedBooksFromCriteria(args);

        // then
        expect(mockStore.bookRepo.findPaginate).toHaveBeenLastCalledWith(
            {
                $or: [{ title: /.*abc.*/i }],
            },
            { createdAt: -1 },
            args.skip,
            args.limit
        );
    });

    it('Should return books array', async () => {
        // given
        const args = { criteria: { titleContains: 'abc' } };
        mockStore.bookRepo.findPaginate.mockReturnValueOnce([
            { id: 1 },
            { id: 2 },
        ]);

        // when
        const books = await bookService.findPaginatedBooksFromCriteria(args);

        // then
        expect(books).toStrictEqual([{ id: 1 }, { id: 2 }]);
    });
});

describe('[BookService.findBookById]', () => {
    it('Should successfully find book by id', async () => {
        // given
        const args = {
            id: 100,
        };
        mockStore.bookRepo.findOneById.mockReturnValueOnce({ id: 1 });

        // when
        const book = await bookService.findBookById(args);

        // then
        expect(mockStore.bookRepo.findOneById).toHaveBeenLastCalledWith(
            args.id
        );
        expect(book).toStrictEqual({ id: 1 });
    });
});

describe('[BookService.getBookPaginationMeta]', () => {
    it('Should pass in correct params and return count', async () => {
        // given
        const args = {
            criteria: { titleContains: 'abc' },
        };
        mockStore.bookRepo.countBooks.mockReturnValueOnce(123);

        // when
        const response = await bookService.getBookPaginationMeta(args);

        // then
        expect(mockStore.bookRepo.countBooks).toHaveBeenLastCalledWith({
            $or: [{ title: /.*abc.*/i }],
        });
        expect(response).toStrictEqual({ count: 123 });
    });
});

describe('[BookService.getDiscountedBooks]', () => {
    it('Should successfully get discounted books', async () => {
        // given
        const args = {
            limit: 12,
        };
        const discountedBooks = [{ someKey: 1 }];
        mockStore.bookRepo.findPaginate.mockReturnValueOnce(discountedBooks);

        // when
        const books = await bookService.getDiscountedBooks(args);

        // then
        expect(mockStore.bookRepo.findPaginate).toHaveBeenLastCalledWith(
            { promotion: { $nin: [0, null, undefined] } },
            { createdAt: -1 },
            0,
            args.limit
        );
        expect(books).toEqual(discountedBooks);
    });
});

describe('[BookService.getRandomBooks]', () => {
    it('Should successfully get random books', async () => {
        // given
        const args = {
            limit: 12,
        };
        const count = 13;
        const randomBooks = [{ someKey: 1 }];
        mockStore.bookRepo.countBooks.mockReturnValueOnce(count);
        mockStore.bookRepo.findPaginate.mockReturnValueOnce(randomBooks);

        // when
        const books = await bookService.getRandomBooks(args);

        // then
        expect(mockStore.bookRepo.findPaginate.mock.calls[0][0]).toEqual({});
        expect(mockStore.bookRepo.findPaginate.mock.calls[0][1]).toEqual(null);
        expect(mockStore.bookRepo.findPaginate.mock.calls[0][2]).toBeLessThan(
            count - args.limit + 1
        );
        expect(mockStore.bookRepo.findPaginate.mock.calls[0][3]).toEqual(
            args.limit
        );
        expect(books).toEqual(randomBooks);
    });
});

describe('[BookService.addBook]', () => {
    it('Should fail if no token', async () => {
        // given
        bookService.context.req.parsedToken = null;

        // then
        await expect(async () => {
            await bookService.addBook({});
        }).rejects.toThrow('Please login first');
    });

    it('Should fail if cannot find user profile', async () => {
        // given
        mockStore.userRepo.findById.mockReturnValueOnce(null);

        // then
        await expect(async () => {
            await bookService.addBook({});
        }).rejects.toThrow('Cannot find user profile');
    });

    it('Should create a new book with correct data and add it to the user', async () => {
        // given
        const user = { _id: 1 };
        const bookId = 100;
        const args = {
            title: 'abc',
            subtitle: 'def',
            description: '123',
            price: '113',
            image: 'base64Data',
        };

        mockStore.userRepo.findById.mockReturnValueOnce(user);
        mockStore.bookRepo.insert.mockReturnValueOnce({
            ...args,
            _id: bookId,
        });

        // when
        await bookService.addBook(args);

        // then
        expect(mockStore.bookRepo.insert).toHaveBeenLastCalledWith({
            ...args,
            image: 'someUrl',
            seller: user._id,
        });
        expect(mockStore.userRepo.addNewBook).toHaveBeenLastCalledWith(
            user._id,
            bookId
        );
    });

    it('Should return the book we just created', async () => {
        // given
        const user = { _id: 1 };
        const bookId = 100;
        const args = {
            title: 'abc',
            subtitle: 'def',
            description: '123',
            price: '113',
            image: 'base64Data',
        };

        mockStore.userRepo.findById.mockReturnValueOnce(user);
        mockStore.bookRepo.insert.mockReturnValueOnce({
            ...args,
            _id: bookId,
        });

        // when
        const addedBook = await bookService.addBook({ ...args });

        // then
        expect(addedBook).toStrictEqual({ ...args, _id: bookId });
    });
});

describe('[BookService.updateBook]', () => {
    it('Should fail if no token', async () => {
        // given
        bookService.context.req.parsedToken = null;

        // then
        await expect(async () => {
            await bookService.updateBook({});
        }).rejects.toThrow('Please login first');
    });

    it('Should fail if cannot find user profile', async () => {
        // given
        mockStore.userRepo.findById.mockReturnValueOnce(null);

        // then
        await expect(async () => {
            await bookService.updateBook({});
        }).rejects.toThrow('Cannot find user profile');
    });

    it('Should fail if user is not the owner of this book', async () => {
        // given
        const user = { _id: 1, _doc: { books: [9999] } };
        mockStore.userRepo.findById.mockReturnValueOnce(user);

        // then
        await expect(async () => {
            await bookService.updateBook({});
        }).rejects.toThrow('You are not allowed to update this book');
    });

    it('Should fail if book does not exist', async () => {
        // given
        const bookId = 100;
        const user = { _id: 1, _doc: { books: [bookId] } };
        const args = {
            title: 'abc',
            subtitle: 'def',
            description: '123',
            price: '113',
            image: 'base64Data',
            id: bookId,
        };

        mockStore.userRepo.findById.mockReturnValueOnce(user);
        mockStore.bookRepo.updateById.mockReturnValueOnce(null);

        // then
        await expect(async () => {
            await bookService.updateBook(args);
        }).rejects.toThrow('Book does not exists');
    });

    it('Should update book with correct data', async () => {
        // given
        const bookId = 100;
        const user = { _id: 1, _doc: { books: [bookId] } };
        const args = {
            title: 'abc',
            subtitle: 'def',
            description: '123',
            price: '113',
            image: 'base64Data',
            id: bookId,
        };

        mockStore.userRepo.findById.mockReturnValueOnce(user);
        mockStore.bookRepo.updateById.mockReturnValueOnce(args);

        // when
        await bookService.updateBook(args);

        // then
        expect(mockStore.bookRepo.updateById).toHaveBeenLastCalledWith(bookId, {
            ...args,
            id: undefined,
        });
    });

    it('Should return book after updating', async () => {
        // given
        const bookId = 100;
        const user = { _id: 1, _doc: { books: [bookId] } };
        const args = {
            title: 'abc',
            subtitle: 'def',
            description: '123',
            price: '113',
            image: 'base64Data',
            id: bookId,
        };

        mockStore.userRepo.findById.mockReturnValueOnce(user);
        mockStore.bookRepo.updateById.mockReturnValueOnce(args);

        // when
        const updatedBook = await bookService.updateBook(args);

        // then
        expect(updatedBook).toStrictEqual(args);
    });
});

describe('[BookService.deleteBook]', () => {
    it('Should fail if no token', async () => {
        // given
        bookService.context.req.parsedToken = null;

        // then
        await expect(async () => {
            await bookService.deleteBook({});
        }).rejects.toThrow('Please login first');
    });

    it('Should fail if cannot find user profile', async () => {
        // given
        mockStore.userRepo.findById.mockReturnValueOnce(null);

        // then
        await expect(async () => {
            await bookService.deleteBook({});
        }).rejects.toThrow('Cannot find user profile');
    });

    it('Should fail if user is not the owner of this book', async () => {
        // given
        const user = { _id: 1, _doc: { books: [9999] } };
        mockStore.userRepo.findById.mockReturnValueOnce(user);

        // then
        await expect(async () => {
            await bookService.deleteBook({});
        }).rejects.toThrow('You are not allowed to delete this book');
    });

    it('Should delete book successfully', async () => {
        // given
        const bookId = 100;
        const user = { _id: 1, _doc: { books: [bookId] } };
        const args = {
            title: 'abc',
            subtitle: 'def',
            description: '123',
            price: '113',
            image: 'base64Data',
            id: bookId,
        };

        mockStore.userRepo.findById.mockReturnValueOnce(user);
        mockStore.bookRepo.deleteById.mockReturnValueOnce({ ...args });

        // when
        await bookService.deleteBook(args);

        // then
        expect(mockStore.bookRepo.deleteById).toHaveBeenLastCalledWith(args.id);
    });

    it('Should return deleted book after deleting', async () => {
        // given
        const bookId = 100;
        const user = { _id: 1, _doc: { books: [bookId] } };
        const args = {
            title: 'abc',
            subtitle: 'def',
            description: '123',
            price: '113',
            image: 'base64Data',
            id: bookId,
        };

        mockStore.userRepo.findById.mockReturnValueOnce(user);
        mockStore.bookRepo.deleteById.mockReturnValueOnce(args);

        // when
        const deletedBook = await bookService.deleteBook(args);

        // then
        expect(deletedBook).toStrictEqual(args);
    });
});

describe('[BookService.findAllByIds]', () => {
    it('Should find all books', async () => {
        // given
        bookIds = [1, 2, 3];
        mockStore.bookRepo.findAll.mockReturnValueOnce({ id: 1, id: 2, id: 3 });
        const expectedCondition = { _id: { $in: bookIds } };
        // when
        const books = await bookService.findAllByIds(bookIds);

        // then
        expect(mockStore.bookRepo.findAll).toHaveBeenLastCalledWith(
            expectedCondition
        );
        expect(books).toStrictEqual({ id: 1, id: 2, id: 3 });
    });
});
