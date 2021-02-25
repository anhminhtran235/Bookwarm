const _ = require('lodash');
const fs = require('fs');
const path = require('path');

let resolvers = {};
let typeDefs = [
    `
    scalar Date
    type Query
    type Mutation
`,
];
const resolversFileName = 'resolvers.js';
const typeDefsFileName = 'typeDef.gql';

const fileNames = fs.readdirSync(__dirname);
for (const fileName of fileNames) {
    const filePath = path.join(__dirname, fileName);
    const isDirectory = fs.lstatSync(filePath).isDirectory();
    if (isDirectory) {
        if (fs.existsSync(path.join(filePath, typeDefsFileName))) {
            const moduleTypeDefs = fs.readFileSync(
                path.join(filePath, typeDefsFileName),
                'utf8'
            );
            typeDefs = [...typeDefs, moduleTypeDefs];
        }

        if (fs.existsSync(path.join(filePath, resolversFileName))) {
            const moduleResolvers = require(`${path.join(
                filePath,
                resolversFileName
            )}`);

            resolvers = _.merge(resolvers, moduleResolvers);
        }
    }
}

module.exports = { typeDefs, resolvers };
