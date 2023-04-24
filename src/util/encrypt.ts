import * as bcrypt from 'bcrypt';

export const hash = async (password: string): Promise<string> => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const compare = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
