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

// ! create Koder
// ! delete Koder

module.exports = { list, get };
