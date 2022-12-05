'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'ceroysiete';

exports.createToken = function(user){
    let payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        role: user.rol,
        iat: moment().unix(),
        exp: moment().add(7,'day').unix()
    }

    return jwt.encode(payload,secret);
}
