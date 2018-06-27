const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const mongo_string = "mongodb://localhost:27017/ionicmongodb"

//const path = require('path');
//app.use(express.static(path.join(__dirname,'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

app.get('/show',function(req,res){
    //res.end("show api");
})

app.post('/add',function(req,res){
    //res.end("add api:"+req.body.name);
    mongoClient.connect(mongo_string, function(err,database){
        const db = database.db('ionicmongodb');
        const data = { 
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age
        };        
        db.collection('ionicmongodb')
            .insertOne(data,(err,result)=>{
                if(err) throw err;
                const response = { result:'ok',message: result.result.n+" Inserted" };
                res.json(response);
            });        
        database.close(); 
    });
})

app.delete('/delete/:name',function (req,res){
    //res.end("delete api:"+req.params.name);
})
// listen (start app with node server.js) ======================================
app.listen(8081);
console.log("App listening on port 8081");
/*const server = app.listen(8081,function(){
    const port = server.address().port;
    console.log("Server is running.. at port: %s",port);
})*/

