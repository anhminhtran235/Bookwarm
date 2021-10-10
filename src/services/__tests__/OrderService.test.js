const OrderService = require('../OrderService');
const bcrypt = require('bcryptjs');
jest.mock('bcryptjs');

const getMockStore = () => ({
    bookRepo: {
        findOneById: jest.fn(),
    },
    userRepo: {
        findById: jest.fn(),
        save: jest.fn(),
        populate: jest.fn(),
    },
    orderRepo: {
        findAll: jest.fn(),
        insert: jest.fn(),
    },
});

let orderService = null;
let mockStore = null;
beforeEach(() => {
    mockStore = getMockStore();
    orderService = new OrderService({ store: mockStore });
    orderService.initialize({ context: { req: { parsedToken: 'xyz' } } });
});

describe('[OrderService.addToCart]', () => {
    it('Should fail if no token', async () => {
        // given
        orderService.context.req.parsedToken = null;

        // then
        await expect(async () => {
            await orderService.addToCart({});
        }).rejects.toThrow('Please login first');
    });

    it('Should fail if cannot find user profile', async () => {
        // given
        mockStore.userRepo.findById.mockReturnValueOnce(null);

        // then
        await expect(async () => {
            await orderService.addToCart({});
        }).rejects.toThrow('Cannot find user profile');
    });

    it('Should fail if book does not exist', async () => {
        // given
        const user = { _id: 1 };
        const args = {
            bookId: 100,
        };
        mockStore.userRepo.findById.mockReturnValueOnce(user);
        mockStore.bookRepo.findOneById.mockReturnValueOnce(null);

        // then
        await expect(async () => {
            await orderService.addToCart(args);
        }).rejects.toThrow('Book does not exist');
    });

    it('Should successfully add new book to cart', async () => {
        // given
        const user = { _id: 1, cart: [] };
        const args = {
            bookId: 100,
        };
        mockStore.userRepo.findById.mockReturnValueOnce({ ...user });
        mockStore.bookRepo.findOneById.mockReturnValueOnce(args);

        // when
        await orderService.addToCart(args);

        // then
        const expectedUser = {
            _id: user._id,
            cart: [{ book: args.bookId, quantity: 1 }],
        };
        expect(mockStore.userRepo.save).toHaveBeenLastCalledWith(expectedUser);
    });

    it('Should successfully increase book quantity', async () => {
        // given
        const args = {
            bookId: '100',
        };
        const currentBookQuantity = 10;
        const user = {
            _id: 1,
            cart: [{ book: args.bookId, quantity: currentBookQuantity }],
        };

        mockStore.userRepo.findById.mockReturnValueOnce({ ...user });
        mockStore.bookRepo.findOneById.mockReturnValueOnce(args);

        // when
        await orderService.addToCart(args);

        // then
        const expectedUser = {
            _id: user._id,
            cart: [{ book: args.bookId, quantity: currentBookQuantity + 1 }],
        };
        expect(mockStore.userRepo.save).toHaveBeenLastCalledWith(expectedUser);
    });

    it('Should return new cart item', async () => {
        // given
        const args = {
            bookId: '100',
        };
        const currentBookQuantity = 10;
        const user = {
            _id: 1,
            cart: [{ book: args.bookId, quantity: currentBookQuantity }],
        };

        mockStore.userRepo.findById.mockReturnValueOnce({ ...user });
        mockStore.bookRepo.findOneById.mockReturnValueOnce(args);

        // when
        const newCartItem = await orderService.addToCart(args);

        // then
        expect(newCartItem).toEqual({
            book: args.bookId,
            quantity: currentBookQuantity + 1,
        });
    });
});

describe('[OrderService.removeFromCart]', () => {
    it('Should fail if no token', async () => {
        // given
        orderService.context.req.parsedToken = null;

        // then
        await expect(async () => {
            await orderService.removeFromCart({});
        }).rejects.toThrow('Please login first');
    });

    it('Should fail if cannot find user profile', async () => {
        // given
        mockStore.userRepo.findById.mockReturnValueOnce(null);

        // then
        await expect(async () => {
            await orderService.removeFromCart({});
        }).rejects.toThrow('Cannot find user profile');
    });

    it('Should fail if book does not exist', async () => {
        // given
        const user = { _id: 1 };
        const args = {
            bookId: 100,
        };
        mockStore.userRepo.findById.mockReturnValueOnce(user);
        mockStore.bookRepo.findOneById.mockReturnValueOnce(null);

        // then
        await expect(async () => {
            await orderService.removeFromCart(args);
        }).rejects.toThrow('Book does not exist');
    });

    it('Should fail if book does not exist in cart', async () => {
        // given
        const user = { _id: 1, cart: [] };
        const args = {
            bookId: 100,
        };
        mockStore.userRepo.findById.mockReturnValueOnce({ ...user });
        mockStore.bookRepo.findOneById.mockReturnValueOnce(args);

        // then
        await expect(async () => {
            await orderService.removeFromCart(args);
        }).rejects.toThrow('Book is not in cart');
    });

    it('Should successfully decrease book quantity', async () => {
        // given
        const args = {
            bookId: '100',
        };
        const currentBookQuantity = 10;
        const user = {
            _id: 1,
            cart: [{ book: args.bookId, quantity: currentBookQuantity }],
        };

        mockStore.userRepo.findById.mockReturnValueOnce({ ...user });
        mockStore.bookRepo.findOneById.mockReturnValueOnce(args);

        // when
        await orderService.removeFromCart(args);

        // then
        const expectedUser = {
            _id: user._id,
            cart: [{ book: args.bookId, quantity: currentBookQuantity - 1 }],
        };
        expect(mockStore.userRepo.save).toHaveBeenLastCalledWith(expectedUser);
    });

    it('Should return updated cart item', async () => {
        // given
        const args = {
            bookId: '100',
        };
        const currentBookQuantity = 10;
        const user = {
            _id: 1,
            cart: [{ book: args.bookId, quantity: currentBookQuantity }],
        };

        mockStore.userRepo.findById.mockReturnValueOnce({ ...user });
        mockStore.bookRepo.findOneById.mockReturnValueOnce(args);

        // when
        const newCartItem = await orderService.removeFromCart(args);

        // then
        expect(newCartItem).toEqual({
            book: args.bookId,
            quantity: currentBookQuantity - 1,
        });
    });
});

describe('[OrderService.checkout]', () => {
    it('Should fail if wrong password', async () => {
        // given
        const user = { _id: 1 };
        const args = {
            password: '123456',
        };
        mockStore.userRepo.findById.mockReturnValueOnce(user);
        bcrypt.compare.mockReturnValueOnce(false);

        // then
        await expect(async () => {
            await orderService.checkout(args);
        }).rejects.toThrow('Invalid credential');
    });

    it('Should successfully make new order', async () => {
        // given
        const bookIds = [100, 200];
        const cart = [
            {
                _doc: {
                    book: {
                        _doc: { _id: bookIds[0], promotion: 20, price: 125 },
                    },
                    quantity: 1,
                },
            },
            {
                _doc: {
                    book: {
                        _doc: { _id: bookIds[1], promotion: 50, price: 30 },
                    },
                    quantity: 1,
                },
            },
        ];
        const expectedNewOrder = {
            _id: 1,
            _doc: {
                orderItems: [
                    {
                        book: bookIds[0],
                        quantity: cart[0]._doc.book.quantity,
                        pricePerItem: 100,
                    },
                    {
                        book: bookIds[1],
                        quantity: cart[1]._doc.book.quantity,
                        pricePerItem: 15,
                    },
                ],
            },
        };
        const user = { _id: 1, cart, orders: [] };
        const args = {
            password: '123456',
        };
        mockStore.userRepo.findById.mockReturnValueOnce(user);
        bcrypt.compare.mockReturnValueOnce(true);
        mockStore.orderRepo.insert.mockReturnValueOnce(expectedNewOrder);

        // when
        const newOrder = await orderService.checkout(args);

        // then
        expect(newOrder).toEqual(expectedNewOrder._doc);
    });
});

describe('[OrderService.findAllByIds]', () => {
    it('Should find all by ids', async () => {
        // given
        const orderIds = [1, 2, 3];

        // when
        await orderService.findAllByIds(orderIds);

        // then
        expect(mockStore.orderRepo.findAll).toHaveBeenLastCalledWith(
            { _id: { $in: orderIds } },
            { createdAt: -1 }
        );
    });
});
