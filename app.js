const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./utils/db');
// app.use(express.static('./views'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cors());
app.use(express.json());


//router
const studentRouter = require('./routers/student.router');
app.use('/', studentRouter);


app.get('/health', (req, res) => {
    const params = {
        tableName: "SanPham"
    }
    db.scan(params, (err, data) => {
        if(err) {
            return res.send("internal server error!");
        }else {
            console.log('data', JSON.stringify(data));
            return res.send("success!");
        }
    })
});

module.exports = app;