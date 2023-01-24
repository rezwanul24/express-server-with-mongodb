const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const users = require('./users.json');
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('express server is running..');
});

const ceos = [
    {id:1, name:"Mark zuckerbrug", company:"Facebook"},
    {id:2, name:"Bill gates", company:"Microsoft"},
    {id:3, name:"Sundar pichai", company:"Google"},
    
]

  // username: dbUser1
// Password: uuA37vzcOWnJTitx



const uri = "mongodb+srv://dbUser1:uuA37vzcOWnJTitx@cluster0.wm2o919.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function  run() {
    try{
        const ceoCollection = client.db('simpleNode').collection('ceos');
        const ceo = {name: 'Porag awagreol', company: 'twitter'}
        // const result = await ceoCollection.insertOne(ceo);
        // console.log(result);
        app.post('/ceo', async (req,res)=> {
            console.log('post api caalled');
            const ceo = req.body;
            
            ceos.push(ceo);
            // console.log(ceo);
            const result = await ceoCollection.insertOne(ceo);
            console.log(result);
            ceo.id = result.insertedId;
            res.send(ceo)
        })

    }
    
    finally{

    }
}

run().catch(error=> console.log(error))

app.get('/ceo', (req,res)=>{
    res.send(ceos);
})

// app.post('/ceo', (req,res)=> {
//     console.log('post api caalled');
//     const ceo = req.body;
//     ceo.id = ceos.length + 1;
//     // ceos.push(ceo);
//     // console.log(ceo);
//     res.send(ceo)
// })

app.get('/ceo',(req,res)=>{
    const ceoinfo = req.query;
    console.log(ceoinfo);
})

app.get('/users', (req,res)=>{
    res.send(users);
});

app.get('/users/:id', (req,res)=>{
    const id = parseInt(req.params.id);

    const user = users.find(usr => usr.id === id) || {};
    res.send(user);
});

app.listen(port, ()=>{
    console.log(`express server is running on port:${port}`);;
})