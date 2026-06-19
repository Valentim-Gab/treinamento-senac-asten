export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_me',
  expiresIn: '1m', // 1 minuto
  saltRounds: 10,
}
