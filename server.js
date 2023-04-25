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
    res.send('<h4> Welcome ICT React Site - Backend</h4>');
    console.log('console home');
});


// CRUD Staff ----------------------------------------
const Staff = require('./models/Staff')

//Get All Staff (Tested using POSTMAN)
app.get('/allstaff', async(req, res) => {
    const staff = await Staff.find();
    res.json(staff);
});

//Add staff (Tested using POSTMAN)
app.post('/addstaff', (req,res) => {
    const addstaff = new Staff({
        staffname: req.body.staffname,
        photo: req.body.photo,
        designation: req.body.designation,
        department: req.body.department
    });

    addstaff.save();

    res.json(addstaff);
    res.status(201).json(addstaff);
    console.log(addstaff);    
});

//Select a Staff based on Designation (Tested using POSTMAN)
app.get('/staffbydesignation/:designation', (req, res) => {
    const designation = req.params.designation;
    Staff.find({ designation: designation })
      .then((staffs) => {
        res.send(staffs);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error occurred while retrieving staff members');
      });
  });
  
  

//get a Staff by ID (Tested using POSTMAN)
app.get('/getstaff/:id', async(req, res) => {
    const staff = await Staff.findById(req.params.id)
    res.json(staff);
});

//Update Staff (Tested using POSTMAN)
app.patch("/updatestaff/:_id", async (req, res) => {
    let id = req.params._id;
    let updatedData = req.body;
    let options = {new: true};

    try{
        const newdata = await Staff.findByIdAndUpdate(id,updatedData, options);
        res.send(updatedData);

    }
    catch (error) {
        res.send(error.message);
    }

})

//Delete Staff (Tested using POSTMAN)
app.delete('/deletestaff/:id', async(req,res) => {
    const result = await Staff.findByIdAndDelete(req.params.id);
    res.json(result);
});

//Start Server -------------------------------
app.listen(5000, () => { 
    console.log("Server started on Port 5000") 
});