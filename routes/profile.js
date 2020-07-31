'use strict';

const { Router } = require('express');
const router = Router();
const routeGuard = require('./../middleware/route-guard.js');
const User = require('./../models/user');

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then(user => {
      res.render('profile/profile', { user });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/edit', routeGuard, (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .then(user => {
      if (user) {
        res.render('profile/edit', { user });
      } else {
        next();
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/edit', routeGuard, (req, res, next) => {
  const id = req.params.id;
  const { username, role } = req.body;

  User.findByIdAndUpdate(id, {
    username,
    role
  })
    .then(user => {
      res.redirect(`/${user._id}`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
