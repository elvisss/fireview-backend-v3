import dotenv from 'dotenv';
dotenv.config();

const config = {
	dev: process.env.NODE_ENV !== 'production',
	port: process.env.PORT || 3000,
	dbName: process.env.DB_NAME || '',
	dbHost: process.env.DB_HOST || 'localhost',
	dbPort: Number(process.env.DB_PORT) || 3306,
	dbUser: process.env.DB_USER || '',
	dbPassword: process.env.DB_PASSWORD || '',
};

export { config };
