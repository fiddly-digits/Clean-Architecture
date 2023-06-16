/**
 *  Registro -> POST
 *  Autenticacion -> GET
 *
 *
 * **/

const bcrypt = require('bcrypt');
const createError = require('http-errors');
const User = require('../models/user.model.js');
const jwt = require('../lib/jwt.lib.js');

const register = async (data) => {
  // Hashear el Password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  data.password = hashedPassword;

  // Crear la cuenta
  const user = await User.create(data);
  console.log(user);
  return user;
};

const login = async (email, plainTextPassword) => {
  //validar que un usuario con ese correo exista
  const user = await User.findOne({ email });
  console.log('Si existe un user con ese correo ->', user);
  if (!user) {
    throw createError(400, 'Invalid Data');
  }
  // validar si es la password
  const isValidPassword = await bcrypt.compare(
    plainTextPassword,
    user.password
  );
  console.log('Is valid password', isValidPassword);
  if (!isValidPassword) {
    throw createError(400, 'Invalid Data');
  }
  const token = jwt.sign({ email: user.email, id: user._id });
  //   const hashedToken = await bcrypt.hash(token, 10);

  //   const isValidToken = await bcrypt.compare(token, Hashedtoken);
  //   console.log('is Valid Token', isValidToken);

  return token;
};

const list = (filters) => {
  const users = User.find();
  return users;
};

const get = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw createError(404, 'Not Found');
  }
  return user;
};

const remove = (id) => {
  const user = User.findByIdAndDelete(id);
  return user;
};

module.exports = { register, login, list, get, remove };
