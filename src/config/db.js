import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test de la connexion
connection
  .getConnection()
  .then(() => console.log('Connexion à la base de données réussie !'))
  .catch((err) =>
    console.error('Erreur de connexion à la base de données :', err.message)
  );

export default connection;
