// * Middlewares antes del punto final
// * Middleware a usar solo en las rutas privadas
//* El token de autorizacion se pone en los headers

const jwt = require('../lib/jwt.lib.js');
/* 
headers: {
    Content-Type: application/json,
    Autorization: `Bearer ${token}`
}
*/

const auth = (req, res, next) => {
  try {
    //verificar el token
    console.log('Headers', req.headers);
    const authorization = req.headers.authorization || '';
    const token = authorization.replace('Bearer ', '');
    console.log(token);

    //Verificar el token
    const isVerified = jwt.verify(token);
    console.log('Esta verificado', isVerified);
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message
    });
  }
};

const changeAuth = (req, res, next) => {
  try {
    //verificar el token
    console.log('Headers', req.headers);
    const authorization = req.headers.authorization || '';
    const token = authorization.replace('Bearer ', '');
    console.log(token);

    //Verificar el token
    const isVerified = jwt.verify(token);
    console.log('Esta verificado', isVerified);
    console.log(req.params.id);
    console.log(isVerified.id);
    const isSimilar = isVerified.id === req.params.id;
    if (!isSimilar) {
      const error = new Error('You cannot Delete Another');
      error.status = 401;
      throw error;
    }
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = { auth, changeAuth };
