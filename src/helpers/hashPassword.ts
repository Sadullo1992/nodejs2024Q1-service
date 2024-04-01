import * as bcrypt from 'bcrypt';

export const genHashPassword = async (password: string) => {
  const CRYPT_SALT = process.env.CRYPT_SALT ?? 10;
  const salt = await bcrypt.genSalt(parseInt(CRYPT_SALT as string, 10));
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const isMatchPassword = async (password: string, hash: string) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
