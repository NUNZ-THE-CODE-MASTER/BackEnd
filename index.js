const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const cors = require('cors');
app.use(cors());
app.use(express.json());

////Save file////
const fs = require('fs');
//const path = require('path');
let products = [];
const filepath = path.join(__dirname, 'products.json');
if (fs.existsSync(filepath)) {
    const data = fs.readFileSync(filepath, 'utf8');
    products = JSON.parse(data);
}   else {
    products = [
        { id: 1, name: 'Product 1', price: 10.99 },
        { id: 2, name: 'Product 2', price: 15.99 }
    
    ];
}
//Load and serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

let myProduct = require('./products.js');
console.log(myProduct);



// use morgan library
var morgan = require('morgan')

const { MongoClient } = require("mongodb");
const client = new
MongoClient("mongodb+srv://assenyange7_db_user:aba@cluster0.zmdxjdo.mongodb.net/");

let db1;
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("You successfully connected to MongoDB!");
        db1 = client.db("PetStore");
        //return client;
    } catch (err) {
        console.dir(err);
    }
}
connectToMongoDB();

// Set up Morgan to log the HTTP method and path
//app.use(morgan(':method :url'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use((req, res, next) => {
    console.log('Incoming request: ' + req.method + ' from: ' + req.url);
    //res.end('Hello World !!!')
    next();
});

//app.get('/collections/products', (req, res)=>{
    //res.send('A GET request, I read and send back the result to you')
    //res.json(myProduct);
//})

//GET 
app.get("/collections/Products", async function(request, response)
{
let collection = await db1.collection("Products");
let results = await collection.find({}).toArray();
response.send(results);
});



app.post("/", (req, res)=>{
    res.send("This is a POST request, Let's create a new element");
})

app.post("/names", function(request, response){
 var body = request.body;
 console.log(body);
 response.json("New Name Recieved: " + body.firstname + " " + body.lastname);
});

app.put("/", (req, res)=>{
    res.send("Let's change an element");    
})

app.delete("/", (req, res)=>{
    res.send("Let's delete an element");
})

app.use((req, res) => {
    res.status(404).send("Page not found !")
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})