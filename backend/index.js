const createConnection = require('./db');
const express=require('express');

const port = 5000
const app = express();

createConnection()

app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));
 
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

