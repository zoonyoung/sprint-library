import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET!;

const sign = (userId: string) => {
  return jwt.sign({ id: userId }, secret, {
    algorithm: 'HS256',
    expiresIn: '1h'
  });
};

const verify = (token: string) => {
  let decoded: any = null;
  try {
    decoded = jwt.verify(token, secret);
    return {
      ok: true,
      userId: decoded.id
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message
    };
  }
};

// refresh Token 발급
const refresh = (userId: string) => {
  return jwt.sign({ id: userId }, secret, {
    algorithm: 'HS256',
    expiresIn: '14d' // 유효기간
  });
};

const refreshVerify = (token: string) => {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
};

export { sign, verify, refresh, refreshVerify };
