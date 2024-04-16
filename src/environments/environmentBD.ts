export const environmentDB = {
  production: false,
  HOST: process.env.DB_HOST || "localhost",
  PORT: parseInt(process.env.DB_PORT, 10) || 5432,
  USER_NAME: process.env.DB_USERNAME || "postgres",
  PASSWORD: process.env.DB_PASSWORD || "123456789",
  DATABASE: process.env.DB_DATABASE || "pokedb",

  LOCAL_HOST: process.env.LOCAL_HOST || "http://localhost:3000"
};
