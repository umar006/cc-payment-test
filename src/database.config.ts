import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    DB_URL: process.env.DB_URL,
  };
});
