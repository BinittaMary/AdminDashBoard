const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path= require('path');
const bodyparser = require('body-parser');
const jwt= require('jsonwebtoken')
const Coursedata = require('./src/modal/CourseData');
const CourseRegistrationdata = require('./src/modal/CourseRegistrationData');
const Testimonialdata = require('./src/modal/TestimonialData');
const StaffData = require('./src/modal/Staffdata');


const app = new express();
app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(bodyparser.json())

const port = process.env.PORT || 5000;

function verifyToken(req, res, next) {
    // if(!req.headers.authorization) {
    //   return res.status(401).send('Unauthorized request')
    // }
    // let token = req.headers.authorization.split(' ')[1]
    // if(token === 'null') {
    //   return res.status(401).send('Unauthorized request')    
    // }
    // let payload = jwt.verify(token, 'secretKey')
    // if(!payload) {
    //   return res.status(401).send('Unauthorized request')    
    // }
    // req.userId = payload.subject
    next()
  }

app.get('/CourseList',function(req,res){
    Coursedata.find().sort({ index: 1 })
    .then(function(courses){
        res.send(courses);
        });
});

app.get('/Course/:id',  (req, res) => {  
    const id = req.params.id;
    console.log(`retrieve course id ${id}`)
    Coursedata.findOne({"_id":id})
      .then((course)=>{
        console.log(` retrieve course ${course.course_title}`);
          res.send(course);
      });
  })

  app.get('/CourseTestimony/:id',  (req, res) => {        
    const id = req.params.id;
    Testimonialdata.find({"course_id":id})
      .then((testimonials)=>{
          res.send(testimonials);
      });
  })


app.get('/CourseCategory',function(req,res){
    Coursedata.find().sort({ Reg_Status : -1 })
    .then(function(courses){
        res.send(courses);
        });
});

app.get('/registercourseList',function(req,res){
  CourseRegistrationdata.find().sort({ _id : -1 })
  .then(function(cousrseRegs){
      res.send(cousrseRegs);
      });
});

app.post('/registercourse',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS'); 
    var RegistrationItem = {
        course_id     : req.body.course_id,
        course_title  : req.body.course_title,
        firstname     : req.body.firstname,
        lastname      : req.body.lastname,
        emailaddress  : req.body.emailaddress,
        phoneno       : req.body.phoneno,
        employed      : req.body.employed,
        graduation    : req.body.graduation,
        message       : req.body.message
    }
    // var vUser= CourseRegistrationdata(RegistrationItem);
    // vUser.save();
    // console.log(`The registered user added is : Email ID - ${RegistrationItem.emailaddress}, Course - ${RegistrationItem.course_title}`);
    // res.status(200).send({ RegistrationItem});

    CourseRegistrationdata.find({'emailaddress' :  RegistrationItem.emailaddress, 'course_id' :  RegistrationItem.course_id})
    .then (function(cousrseReg){
            var bexist=false;
            console.log(`fetched from db Email ID - ${RegistrationItem.emailaddress}, coursetitle - ${RegistrationItem.course_title}`)
            for(var i=0; i<cousrseReg.length; i++){
            if ((cousrseReg[i].emailaddress==RegistrationItem.emailaddress) && (cousrseReg[i].course_id==RegistrationItem.course_id)) {
                bexist=true;
            }};
            if (bexist){
                console.log(`Email ID is already registered for the course ${RegistrationItem.course_title}`);
                res.status(401).send(`Email ID is already registered for the course ${RegistrationItem.course_title}`)
               }  
            else{
                var vUser= CourseRegistrationdata(RegistrationItem);
                vUser.save();
                console.log(`The registered user added is : Email ID - ${RegistrationItem.emailaddress}, Course - ${RegistrationItem.course_title}`);
                res.status(200).send({ RegistrationItem})
            }
    });
  });

  app.put('/Course/updateIndex',verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');     
    
    id         = req.body._id;
    title      = req.body.course_title;
    index      = req.body.index;
    console.log(`update of ${title} with value ${index}`);
    Coursedata.findByIdAndUpdate({"_id":id},
                                {$set:{"index":index}})
   .then(function(){
       res.send();
   })

  });

  app.put('/Course/updateStaffIndex',verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');     
    
    id         = req.body._id;
    index      = req.body.index;
    name       = req.body.name;
    console.log(`update of ${name}  with value ${index}`);
    Coursedata.findByIdAndUpdate({"_id":id},
                                {$set:{"index":index}})
   .then(function(){
       res.send();
   })

  });

  app.post('/Course/insert',verifyToken,function(req,res){
    var indx;  
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');  
    console.log(` inside insert ${req.body}`)
    console.log(__dirname);
    const destn = path.join(__dirname, '../', 'FrontEnd', 'src', 'assets', 'images');
    console.log(destn);
    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
          callback(null, destn);
        },
        filename: function(req, file, cb) {
          cb(null, file.originalname);
      }
      });
    var upload = multer({ storage : storage}).array('files',10);
    upload(req,res,function(err) {
        if(err) {
            console.log("Error uploading file.");
        }
        console.log("File is uploaded");
        console.log(`the title is ${req.body.course_title}`);
        Coursedata.findOne().sort('-index').exec(function(err, course) {
            indx=course.index;
            indx=indx+1;
            console.log(`next index ${indx}`);
            var course = {      
                course_title            : req.body.course_title,
                course_image            : req.body.course_image,
                course_short_desc       : req.body.course_short_desc,
                Reg_Status              : req.body.Reg_Status,
                Category                : req.body.Category,
                Rating                  : req.body.Rating,
                about_course            : req.body.about_course,
                dates                   : req.body.dates,
                eligibility             : req.body.eligibility,
                course_fee              : req.body.course_fee,
                entrance_details        : req.body.entrance_details,
                refund_policy           : req.body.refund_policy,
                course_delivery         : req.body.course_delivery,
                internship_partner      : req.body.internship_partner,
                knowledge_partner       : req.body.knowledge_partner,
                sponser_partner         : req.body.sponser_partner,
                index                   : indx,
                active                  : req.body.active  
        }       
        console.log(course);
        var courseItem = new Coursedata(course);
        courseItem.save().then(function (data) {
          res.send(true)
          }).catch(function (error) {
          res.send(false)
      });
        });    
    });
  });

  app.post('/Course/remove',verifyToken,(req,res)=>{  
    console.log(req.body);
    id         = req.body._id
    console.log(` inside remove ${id}`);
    Coursedata.findByIdAndDelete({'_id' : id},
    (err, result) => {
        if (err) {
            res.send(false)
        } else {
            res.send(true)
        }
    });
});


  app.put('/Course/update',verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');  
    console.log(` inside update ${req.body.id}`);
    id                      = req.body._id;
    let item = {
    course_title            : req.body.course_title,
    course_image            : req.body.course_image,
    course_short_desc       : req.body.course_short_desc,
    Reg_Status              : req.body.Reg_Status,
    Category                : req.body.Category,
    Rating                  : req.body.Rating,
    about_course            : req.body.about_course,
    dates                   : req.body.dates,
    eligibility             : req.body.eligibility,
    course_fee              : req.body.course_fee,
    entrance_details        : req.body.entrance_details,
    refund_policy           : req.body.refund_policy,
    active                  : req.body.active
    } 
    let updateCourse= { $set: item };
    Coursedata.findByIdAndUpdate({"_id":id}, updateCourse)
      .then((respond) => {
        if (respond) {
            console.log('mongoDb updated successfully for Course')
            res.send(true)
        }
        else {
            console.log('mongoDb update error', error)
            res.send(false)
        }
      });
   });

app.put('/Course/updateWithFile',verifyToken,(req,res)=>{
   res.header("Access-Control-Allow-Origin","*")
   res.header('Access-Control-Allow-Methods: GET, POST, PATCH,PUT,DELETE,OPTIONS');  
   console.log(` inside updateWithFile ${req.body.course_title}`)
   const destn = path.join(__dirname, '../', 'FrontEnd', 'src', 'assets', 'images');
   console.log(destn);
   var storage =   multer.diskStorage({
       destination: function (req, file, callback) {
         callback(null, destn);
       },
       filename: function(req, file, cb) {
         cb(null, file.originalname);
     }
     });
   var upload = multer({ storage : storage}).array('files',10);
   upload(req,res,function(err) {
 
       if(err) {
           console.log("Error uploading file.");
       }
   console.log("File is uploaded");
   console.log(` inside update with image ${req.body.course_title}`);
   id          = req.body._id;
   let item    = 
   {
    course_title            : req.body.course_title,
    course_image            : req.body.course_image,
    course_short_desc       : req.body.course_short_desc,
    Reg_Status              : req.body.Reg_Status,
    Category                : req.body.Category,
    Rating                  : req.body.Rating,
    about_course            : req.body.about_course,
    dates                   : req.body.dates,
    eligibility             : req.body.eligibility,
    course_fee              : req.body.course_fee,
    entrance_details        : req.body.entrance_details,
    refund_policy           : req.body.refund_policy,
    active                  : req.body.active,
    sponser_partner         : req.body.sponser_partner,
    knowledge_partner       : req.body.knowledge_partner,
    internship_partner      : req.body.internship_partner,
    course_delivery         : req.body.course_delivery
    } 
    let updateCourse= { $set: item };
    Coursedata.findByIdAndUpdate({"_id":id}, updateCourse)
      .then((respond) => {
        if (respond) {
            console.log('mongoDb updated successfully for Course')
            res.send(true)
        }
        else {
            console.log('mongoDb update error', error)
            res.send(false)
        }
      });
   });
  });

 app.post('/insert',function(req,res){   
  console.log(req.body);
 
  var testimonial = {       
      testimonialId : req.body.testimonialId.testimonialId,
      testimonialName : req.body.testimonial.testimonialName,
      testimonialPosition : req.body.testimonial.testimonialPosition,
      testimonial:req.body.testimonial,
      imageUrl : req.body.testimonial.imageUrl,
 }       
 var testimonial = new TestimonialData(testimonial);
 testimonial.save();
});



app.get('/testimonials',function(req,res){
  
  Testimonialdata.find()
              .then(function(testimonials){
                  res.send(testimonials);
              });
});

app.post('/insert',function(req,res){

  const destn = path.join(__dirname, '../', 'FrontEnd', 'src', 'assets', 'images');
  console.log(destn);
  var storage =   multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, destn);
      },
      filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
    });
  var upload = multer({ storage : storage}).single('file');

  upload(req,res,function(err) {
      if(err) {
          console.log("Error uploading file.");
      }
 
  console.log(req.body);
 
  var staff = {       
     name:req.body.name,
     designation:req.body.designation,
     email:req.body.email,
     image:req.body.image
 }       
 var staff = new StaffData(staff);
 staff.save();
 
 });

});

//getting staff data
app.get('/staffs',function(req,res){  
  StaffData.find().sort({ index: 1 })
              .then(function(staffs){
                  res.send(staffs);
              });
});

app.listen(5000, function(){
    console.log('listening to port 5000');
});