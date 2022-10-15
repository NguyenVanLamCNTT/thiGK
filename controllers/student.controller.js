const docClient = require('../utils/db');
const { v4: uuidv4 } = require('uuid');
const params = {
    TableName: 'students'
}

const getStudents = async (req, res) => {
    docClient.scan(params, (err, data) => {
        if (err) {
            console.log(err);
            return null;
        } else {
            listStudent = data.Items;
            return res.render('form-student', {data: data.Items, student: 
                {
                    maSV: null,
                    lop: null,
                    ngaySinh: null,
                    hoTen: null
                }
            });
        }
    });
}

const postStudent = (req, res) => {
    const student = req.body;
    student.id = uuidv4();
    const item = {
        ...params,
        Item: student
    }
    docClient.put(item, (err, data) => {
        if (err) {
            console.log(err);
            return res.send('Internal server error');
        }else {
            return res.redirect('/')
        }
    })
}

const deletestudent = (req, res) => {
    const keys = {
        ...params,
        Key: {
            id: req.params.id
        }
    };
    docClient.delete(keys, (err, data) => {
        if (err) {
            console.log(err);
            return res.send('Internal server error');
        }else {
            return res.redirect('/');
        }
    });
}
const getFormEdit = (req, res) => {
    const {id} = req.params;
    const keys = {
        ...params,
        Key: {
            id: req.params.id
        }
    };
    docClient.get(keys, (err, data) => {
        if (err) {
            console.log(err);
            return null;
        } else {
            return res.render('edit-student', {student: data.Item});
        }
    });
}

const updateStudent = (req, res) => {
    const {id} = req.params;
    const student = req.body;
    const keys = {
        ...params,
        Key: {
            id: id,
        },
        UpdateExpression: 'set maSV = :maSV, hoTen = :hoTen, ngaySinh = :ngaySinh, lop = :lop',
        ExpressionAttributeValues: {
          ':maSV': student.maSV,
          ':hoTen': student.hoTen,
          ':ngaySinh': student.ngaySinh,
          ':lop': student.lop
        }
        
    };
    docClient.update(keys, (err, data) => {
        if (err) {
            console.log(err);
            return null;
        }else {
            return res.redirect('/');
        }
    })
}

module.exports = {
    getStudents,
    postStudent,
    deletestudent,
    getFormEdit,
    updateStudent,
    
}