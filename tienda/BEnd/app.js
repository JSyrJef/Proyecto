'use stric'

let express = require('express');
let app = express();
let bodyparser = require('body-parser');
let mongoose = require('mongoose');
let port = process.env.PORT || 4201;

let cliente_route = require('./routes/cliente');
let admin_route = require('./routes/admin');
let producto_route = require('./routes/producto');

mongoose.connect('mongodb://127.0.0.1:27017/tienda',(err, res)=>{
    if(err) {
        console.error(err);
    }
    else {
        app.listen(port,function(){
            console.info(`Servidor corriendo en el puerto ${port}`);
        })
    } 
})

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json({limit: '50mb',extended: true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', cliente_route);
app.use('/api', admin_route);
app.use('/api', producto_route);
module.exports = app;