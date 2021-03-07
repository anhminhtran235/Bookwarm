const ObjectId = require('mongodb').ObjectID;

/**
 * email: user${1->4}@gmail.com
 * password: 123456
 */
module.exports = userData = [
    {
        _id: ObjectId('604416846e054e3438767fd4'),
        avatar: '',
        orders: [ObjectId('60441be05e326e35748449ea')],
        books: [
            ObjectId('604416bd6e054e3438767fd5'),
            ObjectId('604417176e054e3438767fd6'),
            ObjectId('604417976e054e3438767fd7'),
            ObjectId('60441abf5e326e35748449e7'),
            ObjectId('60441b0f5e326e35748449e8'),
            ObjectId('60441f7b5e326e35748449ec'),
            ObjectId('60441fdb5e326e35748449ed'),
            ObjectId('604420195e326e35748449ee'),
            ObjectId('604420c85e326e35748449ef'),
            ObjectId('6044213f5e326e35748449f0'),
        ],
        username: 'Best book store',
        email: 'user1@gmail.com',
        password:
            '$2a$12$WJVeJ6jBbUhIEIPRLkOdweNJCWZJuG5Uw3DkCZRqqX5VwZBQPfsHG',
        createdAt: new Date('2021-03-06T23:55:48.524Z'),
        cart: [],
        __v: 2,
    },
    {
        _id: ObjectId('6044219a5e326e35748449f1'),
        avatar: '',
        orders: [],
        books: [
            ObjectId('6044231f5e326e35748449f2'),
            ObjectId('6044250fc3f1af2d50014914'),
            ObjectId('6044255cc3f1af2d50014915'),
            ObjectId('604425ebc3f1af2d50014916'),
            ObjectId('60442680c3f1af2d50014917'),
        ],
        username: 'Book Paradise',
        email: 'user2@gmail.com',
        password:
            '$2a$12$6ZHojUcpFqMtY8NPXhuanuJlca81AFz6G3.b/v1fuqEtG6YOqJTLG',
        createdAt: new Date('2021-03-07T00:43:06.650Z'),
        cart: [],
        __v: 0,
    },
    {
        _id: ObjectId('604426e2c3f1af2d50014918'),
        avatar: '',
        orders: [],
        books: [
            ObjectId('60442821c3f1af2d50014919'),
            ObjectId('6044285bc3f1af2d5001491a'),
            ObjectId('60442883c3f1af2d5001491b'),
            ObjectId('604428c6c3f1af2d5001491c'),
            ObjectId('60442922c3f1af2d5001491d'),
            ObjectId('6044294ec3f1af2d5001491e'),
            ObjectId('60442987c3f1af2d5001491f'),
        ],
        username: 'Qualibook',
        email: 'user3@gmail.com',
        password:
            '$2a$12$NH/81nCi8cM7rlAolR.7zeEt5E6tgqg2RXfPbfX7UFyYKXHmiYoHG',
        createdAt: new Date('2021-03-07T01:05:38.071Z'),
        cart: [],
        __v: 0,
    },
    {
        _id: ObjectId('60442a1fc3f1af2d50014920'),
        avatar: '',
        orders: [],
        books: [
            ObjectId('60442a64c3f1af2d50014921'),
            ObjectId('60442aa3c3f1af2d50014922'),
            ObjectId('60442ad1c3f1af2d50014923'),
            ObjectId('60442b0dc3f1af2d50014924'),
            ObjectId('60442b73c3f1af2d50014925'),
        ],
        username: 'Marvelous Books',
        email: 'user4@gmail.com',
        password:
            '$2a$12$/ajkhcL5ST3GFEJWqivAk.kPDDMiZWzz.d0QcWOjQOhd8a1Ul/vda',
        createdAt: new Date('2021-03-07T01:19:27.094Z'),
        cart: [],
        __v: 0,
    },
];
