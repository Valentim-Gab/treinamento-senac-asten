import mysql from 'mysql2/promise'

export const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senac-treinamento-123',
  database: 'senac_treinamento_db',
})
