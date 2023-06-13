const express = require('express');
const router = express.Router();
const { list, get } = require('../usecases/koder.usecase.js');

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
    if (!selectedKoder) {
      res.status(404);
      res.json({ success: false, message: 'The ID was non existant' });
    } else {
      res.json({
        success: true,
        data: selectedKoder
      });
    }
  } catch (err) {
    console.log('Error: ', err);
    res.json({
      success: false,
      error: 'The ID was non compliant'
    });
  }
});

module.exports = router;
