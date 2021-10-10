const { authCheck } = require('../authCheck');

let req = null;
let userRepo = null;

beforeEach(() => {
    userRepo = { findById: jest.fn() };
});

describe('[authCheck.authCheck]', () => {
    it('Should fail if no token', async () => {
        // given
        req = { parsedToken: null };

        // then
        await expect(async () => {
            await authCheck(req, userRepo);
        }).rejects.toThrow('Please login first');
    });

    it('Should fail if cannot find user profile', async () => {
        // given
        req = { parsedToken: 'xyz' };
        userRepo.findById.mockReturnValueOnce(null);

        // then
        await expect(async () => {
            await authCheck(req, userRepo);
        }).rejects.toThrow('Cannot find user profile');
    });
});
