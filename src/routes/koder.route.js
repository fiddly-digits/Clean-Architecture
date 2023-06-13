const express = require('express');
const router = express.Router();
const {
  list,
  get,
  create,
  modify,
  remove
} = require('../usecases/koder.usecase.js');

// ! Router
// ! Es un conjunto de rutas en una app

/**
 * Las Rutas
 * Aqui vamos a leer el request y response
 */

router.get('/', async (req, res) => {
  try {
    const koders = await list();
    res.json({
      success: true,
      data: koders
    });
  } catch (err) {
    res.status(400);
    res.json({
      success: false,
      error: err.message
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const selectedKoder = await get(id);
    let responseParams = {
      success: true,
      data: selectedKoder
    };
    if (!selectedKoder) {
      const error = new Error('The ID was non existant');
      error.status = 404;
      throw error;
    } else {
      res.json(responseParams);
    }
  } catch (err) {
    res.status(err.status || 400);
    console.log('Error: ', err);
    res.json({
      success: false,
      error: err.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const newKoder = await create(req.body);
    let responseParams = {
      success: true,
      data: newKoder
    };
    res.status(201);
    res.json(responseParams);
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

router.patch('/:id', async (req, res) => {
  const { params, body } = req;
  try {
    const modifiedKoder = await modify(params.id, body);
    console.log(body);
    let responseParams = {
      success: true,
      message: 'Koder was updated succesfully'
    };
    if (!modifiedKoder) {
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

router.delete('/:id', async (req, res) => {
  try {
    const deletedKoder = await remove(req.params.id);
    let responseParams = {
      success: true,
      message: 'Koder was eliminated successfully'
    };

    if (!deletedKoder) {
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
