const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
//const mongo_string = "mongodb://localhost:27017/ionicmongodb"
const mongo_string = "mongodb://mongouser:Ca999999@ds121301.mlab.com:21301/ionic_dev"
const myDb = "ionic_dev";
const myCollection = "students";
const ObjectId = require('mongodb').ObjectId;

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
    mongoClient.connect(mongo_string, function(req,database){
        const db = database.db(myDb);
        db.collection(myCollection)
            .find()
            .toArray()
            .then(result=>{
                const output = { result : 'ok',message: result}
                res.json(output);
            });
        database.close();
    })
})

app.post('/add',function(req,res){
    //res.end("add api:"+req.body.name);
    mongoClient.connect(mongo_string, function(err,database){
        const db = database.db(myDb);
        const data = { name: req.body.name, surname: req.body.surname, age: req.body.age };        
        db.collection(myCollection)
            .insertOne(data,(err,result)=>{
                if(err) throw err;
                const response = { result:'ok',message: result.result.n+" Inserted" };
                res.json(response);
            });        
        database.close(); 
    });
})

app.put('/update/:id',function(req,res){
    //res.end("update api: _id: "+req.params.id+" name:"+req.body.name+" surname:"+req.body.surname+" age:"+req.body.age );
    mongoClient.connect(mongo_string,function(err,database){
        var db = database.db(myDb);
        
        var query = { _id : ObjectId(req.params.id) };
        var newValue = {  $set:{ name : req.body.name, surname: req.body.surname, age: req.body.age} }; 
        db.collection(myCollection)
            .update(query, newValue, function(err,result){
                if(err) throw err;
                const response = { result:'ok',message:result.result.n + " updated"};
                res.json(response);
            })
        database.close();
    })

})

app.delete('/delete/:id',function (req,res){
    //res.end("delete api:"+req.params.name);
    const query = { _id : ObjectId(req.params.id) };
    mongoClient.connect(mongo_string,function(err,database){
        const db = database.db(myDb);
        db.collection(myCollection)
            .deleteMany(query,function(err,result){
                if(err) throw err;
                const response = { result: 'ok',message: result.result.n +" deleted" };
                res.json(response);
            })
        database.close();

    })
})
// listen (start app with node server.js) ======================================
app.listen(8081);
console.log("App listening on port 8081");
/*const server = app.listen(8081,function(){
    const port = server.address().port;
    console.log("Server is running.. at port: %s",port);
})*/

