'use strict';

const { Router } = require('express');
const router = Router();
const routeGuard = require('./../middleware/route-guard.js');
const roleRouteGuard = require('./../middleware/role-route-guard');
const User = require('./../models/user');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('authentication/private');
});

router.get(
  '/student-dashboard',
  roleRouteGuard(['student', 'assistant', 'teacher']),
  routeGuard,
  (req, res, next) => {
    res.render('authentication/student');
  }
);

router.get(
  '/assistant-dashboard',
  roleRouteGuard(['teacher', 'assistant']),
  routeGuard,
  (req, res, next) => {
    res.render('authentication/assistant');
  }
);

router.get(
  '/teacher-dashboard',
  roleRouteGuard(['teacher']),
  routeGuard,
  (req, res, next) => {
    res.render('authentication/teacher');
  }
);

module.exports = router;
