import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 8080,
    mongo: {
        uri: process.env.MONGO_URI || 'mongodb://zack:1234@localhost:27017/java59?authSource=admin',
        db: {
            dbName: process.env.DB_NAME,
        }
    },
}

export default config;