const jwt = require('jsonwebtoken');
const config = require('config');

const generateToken = (user) => {
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email,
        },
        config.get('JSON_SECRET')
    );
    return token;
};

module.exports = {
    generateToken,
};
