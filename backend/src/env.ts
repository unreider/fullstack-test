import 'dotenv/config';
const r = (v?: string, name?: string) => {
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
};
export const env = {
  PORT: Number(process.env.PORT || 4000),
  JWT_SECRET: r(process.env.JWT_SECRET, 'JWT_SECRET'),
  DATABASE_URL: r(process.env.DATABASE_URL, 'DATABASE_URL'),
};
