const express = require('express');
const router = express.Router();
const { createApply, getEmployeeApplies,deleteApply,acceptEmployee, declineEmployee, getVacancyApplies } = require('./controllers');
const { isEmployee, isManager } = require('../auth/middlewares') 
const { isAuthorOfApply, isAuthorOfVacancy, isApplyExists } = require('./middlewares')
const passport = require('passport');
const { validateApply } = require('./middlewares');

router.post('/api/apply', passport.authenticate('jwt', {session: false}), isEmployee, validateApply, createApply);
router.get('/api/apply/employee', passport.authenticate('jwt', {session: false}), getEmployeeApplies);
router.get('/api/apply/vacancy/:id', passport.authenticate('jwt', {session: false}), isManager, isAuthorOfVacancy, getVacancyApplies );
router.delete('/api/apply/:id',passport.authenticate('jwt', {session: false}),isEmployee,isAuthorOfApply, deleteApply)
router.put('/api/apply/accept/employee',passport.authenticate('jwt', {session: false}),isManager, isApplyExists, isAuthorOfVacancy,acceptEmployee)
router.put('/api/apply/decline/employee',passport.authenticate('jwt', {session: false}),isManager, isApplyExists, isAuthorOfVacancy,declineEmployee)
module.exports = router;