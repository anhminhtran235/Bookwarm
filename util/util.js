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

const removeNullFields = (obj) => {
    return Object.entries(obj)
        .filter(([name, value]) => value !== null)
        .map(([name, value]) => ({ name, value }));
};

module.exports = {
    generateToken,
    removeNullFields,
};
