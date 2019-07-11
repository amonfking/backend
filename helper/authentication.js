const jwt = require('jsonwebtoken');
const SECRET_KEY = "secret";

function notAuthenticated(response) {
  response.json({
    status: 'fail',
    message: 'Not Authenticated',
    code: 404,
    error: true
  });
}

function _authenticate(token) { //token -> 123123789127389213
  if (!token) {
    return false;
  }
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return true;
    // use payload if required
  } catch (error) {
    return false
  }
}

module.exports = {
  'notAuthenticated': notAuthenticated,
  '_authenticate' : _authenticate
}