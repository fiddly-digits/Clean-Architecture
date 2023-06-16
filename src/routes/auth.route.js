const express = require('express');
const router = express.Router();
const { login } = require('../usecases/user.usecase.js');

router.post('/', async (req, res) => {
  try {
    const token = await login(req.body.email, req.body.password);
    res.json({
      success: true,
      data: token
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
