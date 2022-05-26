const createConnection = require('./db');
const express=require('express');

const port = 5000
const app = express();

createConnection()

app.get('/', (req, res) => {
    res.send('Hello Maaz!');
});
 
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

