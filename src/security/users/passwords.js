import bcrypt from 'bcrypt';

const saltRounds = bcrypt.genSalt(10);

export const createHash = async (password) => {
  const newhash = await bcrypt.hash(String(password), parseInt(saltRounds));
  return newhash;
};

export const comparePasswords = async (password, hash) => {
  const comparedPasswords = await bcrypt.compare(password, hash);
  return comparedPasswords;
};
