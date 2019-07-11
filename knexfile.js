const path = require('path');

module.exports = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'abcquizgame'
    },
    migrtion: {
        tableName: 'migrations',
        directory: path.resolve(__dirname, './migrations'),
    },
    useNullAsDefult: true,
}

