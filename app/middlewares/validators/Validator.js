const Validator = require('validatorjs');
const knex = require('./../../../db/knex');

Validator.registerAsync('unique', function (email, attribute, req, passes) {
  knex('users as user')
    .where('user.email', email)
    .first()
    .then(function (user) {
      passes(!user, 'This user has already been taken')
    }).catch(() => {
    passes(false, 'error in Validate');

  });

});




module.exports = Validator;