const express = require('express');
const router = express.Router();

const studentControler = require('../controllers/student.controller');

router.get('/', studentControler.getStudents);
router.post('/', studentControler.postStudent);
router.get('/delete/:id', studentControler.deletestudent);
router.get('/edit/:id', studentControler.getFormEdit);
router.post('/edit/:id', studentControler.updateStudent);

module.exports = router;