export const options = {
    mariaDB: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'laBallena123',
            database: 'test'
        }    
    },
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: "./db.sqlite"
        },
        useNullAsDefault: true
    },
};

