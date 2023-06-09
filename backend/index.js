const createConnection = require('./db');
const express=require('express');
const cors = require('cors');

const port = 5000
const app = express();

app.use(cors())
app.use(express.json());

createConnection()

app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));
 
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

