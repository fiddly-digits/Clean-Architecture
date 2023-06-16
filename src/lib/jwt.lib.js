const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

// Hacer el token
const sign = (payload = {}) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '5h' });
};

const verify = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { sign, verify };
