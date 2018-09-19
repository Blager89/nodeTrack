const express = require('express');
const router = express.Router();
const knex = require('./../../db/knex');
const Validator = require('./../middlewares/validators/Validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const rules = {
  signup: {
    email: 'required|email|unique',
    password: 'required|min:3'
  },
  signin: {
    email: 'required|email',
    password: 'required|min:3'
  }
};

// registraion
router.post('/signup', function (req, res, next) {
  const validation = new Validator(req.body, rules.signup);
  validation.fails(function () {
    return res.status(400).send(validation.errors)
  });

  const data = {
    login: req.body.login,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt)
  };

  try {
    knex('users')
      .insert(data).then(user_id => {
      const token = jwt.sign({
        id: user_id,
        login: req.body.login,
      }, 'secret');
      res.status(201).send(token);
    }).catch(next);
  } catch (e) {
    next(e);
  }

});

//signin

router.post('/signin', async function (req, res, next) {
  const validation = new Validator(req.body, rules.signin);

  validation.fails(function () {
    return res.status(400).send(validation.errors);
  });

  try {
    const user = await knex('users as u')
      .where('u.email', req.body.email)
      .select('u.id', 'u.login', 'u.password', 'u.email', 'u.role_id')
      .first();

    console.log(user);

    if (user) {
      if (bcrypt.compare(req.body.password, user.password)) {
        try {
          const token = jwt.sign({
            id: user.id,
            login: user.login,
            role_id: user.role_id
          }, 'secret');
          res.send(token);
        } catch (e) {
          next(e);

        }
      } else {
        res.status(401);
      }
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }

});

module.exports = router;
