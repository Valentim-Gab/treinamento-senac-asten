export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'default_secret_key',
  expiresIn: '1m', // 1 minuto
  saltsRounds: 10
}