import jwt from 'jsonwebtoken';

export const generateToken = async (data) => {
  try {
    const token = await jwt.sign({ id: data }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return token;
  } catch (error) {
    return { data: error, success: null };
  }
};

export const verifyToken = async (decodeToken) => {
  try {
    const token = await jwt.verify(decodeToken, process.env.JWT_SECRET);

    if (!token.id) return { success: null };

    return { data: token, success: true };
  } catch (error) {
    return { data: error, success: null };
  }
};
