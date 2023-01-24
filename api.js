const express = require('express');
const app = express();
const port = 5000;

app.get('/api', (req, res)=>{
    res.send('server running  api page');
});

app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})