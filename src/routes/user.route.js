const express = require('express');
const router = express.Router();
const { register, list, get, remove } = require('../usecases/user.usecase.js');
const { auth, changeAuth } = require('../middlewares/auth.middleware.js');

router.post('/', async (req, res) => {
  try {
    const createdUser = await register(req.body);
    res.status(201);
    res.json({
      success: true,
      data: createdUser
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const users = await list(req.query);
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await get(req.params.id);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  }
});

router.delete('/:id', changeAuth, async (req, res) => {
  try {
    const deletedUser = await remove(req.params.id);
    let responseParams = {
      success: true,
      message: 'User was eliminated successfully'
    };

    if (!deletedUser) {
      const error = new Error('The ID was non existant');
      error.status = 404;
      throw error;
    }
    res.status(200);
    res.json(responseParams);
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;

/*
 * Ruta publica -> puedes entrar sin autorizacion
 * Ruta Privada -> necesitas autorizacion
 */
