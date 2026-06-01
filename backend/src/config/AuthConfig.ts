export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'default_secret_key',
  expiresIn: '1h', // 1 hora
  saltsRounds: 10
}