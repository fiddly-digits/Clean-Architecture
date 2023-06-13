const Koder = require('../models/koder.model.js');

/**
 * Crear
 * Actualizar
 * Obtener
 * Enlistar
 * Eliminar
 * **/

const list = () => {
  // Accion => Use Case
  const koders = Koder.find();
  return koders;
};

const get = (id) => {
  const koder = Koder.findById(id).exec();
  return koder;
};

const create = (data) => {
  const koder = Koder.create(data);
  return koder;
};

const modify = (id, body) => {
  const koder = Koder.findByIdAndUpdate(id, body, { returnDocument: 'after' });
  return koder;
};

const remove = (id) => {
  const koder = Koder.findByIdAndDelete(id);
  return koder;
};

module.exports = { list, get, create, modify, remove };
