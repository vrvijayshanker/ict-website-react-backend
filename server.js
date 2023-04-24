const express = require ('express')
const mongoose = require ('mongoose')
const cors = require('cors');

const app = express()

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://vijayvr:123vijayvr@cluster1.zt8bq.mongodb.net/ictdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB"))
.catch(console.error)


app.get('/', async(req, res) => {
    res.send('You are Home');
    console.log('console home');
});

app.listen(5000, () => { 
    console.log("Server started on Port 5000") 
});