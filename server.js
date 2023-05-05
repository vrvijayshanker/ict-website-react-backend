const express = require ('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const multer = require('multer');

const app = express()

app.use(express.json());
app.use(cors());

//Setting up Multer
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now()+"_"+file.originalname)
    }
});
const imageUpload = multer({ 
    storage: imageStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit 
});

const thumbStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/coursethumb')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now()+"_"+file.originalname)
    }
});
const thumbUpload = multer({ 
    storage: thumbStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit 
});

const testimonialStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/testimonialphoto')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now()+"_"+file.originalname)
    }
});
const testimonialUpload = multer({ 
    storage: testimonialStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit 
});

mongoose.connect("mongodb+srv://vijayvr:123vijayvr@cluster1.zt8bq.mongodb.net/ictdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB"))
.catch(console.error)


app.get('/', async(req, res) => {
    res.send('<h4> Welcome ICT React Site - Backend</h4>');
    console.log('console home');
});

//Admin Login
const Admin = require('./models/Admin')

app.get('/alladmin', async(req, res) => {
    const admin = await Admin.find();
    res.json(admin);
});

// CRUD Course ----------------------------------------
const Course = require('./models/Course')

//Get All Courses 
app.get('/allcourse', async(req, res) => {
    const course = await Course.find();
    res.json(course);
});

//Add Course
app.post('/addcourse', thumbUpload.single('thumbImage'), async(req,res) => {

    console.log("You are here at add Course post")

        let thumbImage = (req.file) ? req.file.filename : null;
    
        const addcourse = new Course({
            coursetitle: req.body.coursetitle,
            coursetype: req.body.coursetype,
            overview: req.body.overview,
            thumbImage,
            syllabusfile: req.body.syllabusfile,
            description: req.body.description,
            duration: req.body.duration,
            internship: req.body.internship,
            fee: req.body.fee,
            cmode: req.body.cmode,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            cstatus: req.body.cstatus
        });
        try {
            const savedCourse = await addcourse.save();  
            // res.json(savedStaff)           
            res.status(201).json(savedCourse);            
            console.log(savedCourse);


          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to save staff member.' });
          } 
   

    // addcourse.save();

    // res.json(addcourse);
    // res.status(201).json(addcourse);
    // console.log(addcourse);    
});

//get a Course by ID (Tested using POSTMAN)
app.get('/getcourse/:id', async(req, res) => {
    const course = await Course.findById(req.params.id)
    res.json(course);
});

//Update Course
app.patch("/updatecourse/:_id", async (req, res) => {
    let id = req.params._id;
    let updatedData = req.body;
    let options = {new: true};

    try{
        const newdata = await Course.findByIdAndUpdate(id,updatedData, options);
        res.send(updatedData);

    }
    catch (error) {
        res.send(error.message);
    }

})



//Delete Course (Tested using POSTMAN)
app.delete('/deletecourse/:id', async(req,res) => {
    const result = await Course.findByIdAndDelete(req.params.id);
    res.json(result);
});


// END CRUD Course ----------------------------------------

// CRUD Staff ----------------------------------------
const Staff = require('./models/Staff')



//To see the image from folder 'uploads'
app.use('/uploads/coursethumb', express.static('./uploads/coursethumb'))

//Get All Staff (Tested using POSTMAN)
app.get('/allstaff', async(req, res) => {
    const staff = await Staff.find();
    res.json(staff);
});



//Add staff (Tested using POSTMAN)
app.post('/addstaff', imageUpload.single('photo'), async (req,res) => {

        console.log("You are here at add staff post")

        let photo = (req.file) ? req.file.filename : null;
    
        const addstaff = new Staff({
            staffname: req.body.staffname,
            photo,
            designation: req.body.designation,
            department: req.body.department
        });
        try {
            const savedStaff = await addstaff.save();  
            // res.json(savedStaff)           
            res.status(201).json(savedStaff);            
            console.log(savedStaff);


          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to save staff member.' });
          } 
        // addstaff.save();

        // // res.json(addstaff)
        // res.status(201).json(addstaff);
        // console.log(addstaff); 
      
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
    // let updatedPhoto = (req.file) ? req.file.filename : null;
    console.log(updatedData)
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

// CRUD Testimonial ----------------------------------------
const Testimonial = require('./models/Testimonial')

//To see the image from folder 'uploads'
app.use('/uploads/testimonialphoto', express.static('./uploads/testimonialphoto'))

//Get All Testimonial
app.get('/alltestimonial', async(req, res) => {
    const testimonial = await Testimonial.find();
    res.json(testimonial);
});



//Add Testimonial
app.post('/addtestimonial', testimonialUpload.single('student_photo'), async (req,res) => {

        console.log("You are here at testimonial")

        let student_photo = (req.file) ? req.file.filename : null;
    
        const addtestimonial = new Testimonial({
            testimonial: req.body.testimonial,
            student_photo,
            student_name: req.body.student_name,
            student_course: req.body.student_course,
            batch: req.body.batch
        });
        try {
            const savedTestimonial = await addtestimonial.save();  
            // res.json(savedTestimonial)           
            res.status(201).json(savedTestimonial);            
            console.log(savedTestimonial);


          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to save testimonial.' });
          } 
        
});

//get a Testimonial by ID (Tested using POSTMAN)
app.get('/gettestimonial/:id', async(req, res) => {
    const singledata = await Testimonial.findById(req.params.id)
    res.json(singledata);
});

//Update Testimonial
app.patch("/updatetestimonial/:_id", async (req, res) => {
    console.log("inside edit test")
    let id = req.params._id;
    let updatedData = req.body;
    // let updatedPhoto = (req.file) ? req.file.filename : null;
    console.log(updatedData)
    let options = {new: true};

    try{
        const newdata = await Testimonial.findByIdAndUpdate(id,updatedData, options);
        res.send(updatedData);

    }
    catch (error) {
        res.send(error.message);
    }

})

//Delete Testimonial
app.delete('/deletetestimonial/:id', async(req,res) => {
    // console.log(req.params.id)
    const result = await Testimonial.findByIdAndDelete(req.params.id);
    res.json(result);
});


//Start Server -------------------------------
app.listen(5000, () => { 
    console.log("Server started on Port 5000") 
});