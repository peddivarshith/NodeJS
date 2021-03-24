const express=require("express");

const router =express.Router();
const jwt=require("jsonwebtoken");
//getting the schema of the hospital
const {hos,ven}=require("./models_schema_mongoose");

//password
const pass=require("./password");

// User Data
const data=[{
    username:"admin",
    password:"12345"
    },
    {
        username:"admin1",
        password:"54321"
    }
];

//Authentication function of the user (token and encrypt and serialize)
function auth(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(" ")[1];
    if(token==null)res.send("YOU ARE NOT AUTHORIZED");
    else{
        
        jwt.verify(token,pass.token1,(err,data)=>{
            if(err)res.send("You are not authorized to access")
            req.user=data;
            next();
        });
    }

}
//Login user details
router.post("/login",(req,res)=>{
    //auth user
    const user={
        username:req.body.username,
        password:req.body.password
    }
    const accesstoken=jwt.sign(user,pass.token1);
    res.json({
        status:"Success",
        token:accesstoken
    })
});

//Adding new hospitals to the collection list_of_hospitals
router.post("/hospital_add",auth,(req,res,next)=>{
    var record=new hos(req.body);
    record.save().then(()=>{
        res.send("Hospital Object is added Successfully");
    }).catch(next);
    console.log("Successfully added!");
});

//Adding new Ventilator for the given hospital
router.post("/ventilator_add",auth,(req,res,next)=>{

       ven.create(req.body).then((data)=>{
           res.send("Ventilator Object is added Successfully");
       }).catch(next);
});

//Delete Ventilator By Ventilator Id 
router.delete("/ventilator_delete/:id",auth,(req,res,next)=>{
    ven.findOne({ventilatorId:req.params.id},(err,result)=>{
        if(result==null)res.send(req.params.id+" Not found");
        else{
        ven.deleteOne({ventilatorId:req.params.id}).then((data)=>{
        res.send(req.params.id+" Is Deleted From Ventilator Collection")}).catch(next);   
        }
    });          
});

//Search Hospital By Hospital Name
router.get("/hospital_search/:id",auth,(req,res,next)=>{
    console.log(req.params.id);
    hos.findOne({name:req.params.id}).then((data)=>{
        res.send(data);
    }).catch(next);
});

//Update Ventilator Details
router.put("/ventilator_update/:ven_id/:status",auth,(req,res,next)=>{
    ven.findOne({ventilatorId:req.params.ven_id},(err,result)=>{
        if(result==null)res.send("No record found to update");
        else{
            ven.update({ventilatorId:req.params.ven_id},{$set:{status:req.params.status}}).then((data)=>{
                res.send("Data in the ventilator Id: "+req.params.ven_id+" is Updated");
            }).catch(next);

        }
    })
    
});

//Search Ventilator by status and name of the hospital
router.get("/ventilator_search/:status/:name",auth,(req,res,next)=>{
    ven.findOne({status:req.params.status,name:req.params.name}).then((data)=>{
        res.send(data);
    }).catch(next);
    
});

//Hospitals complete List
router.get("/hospital_details",auth,(req,res,next)=>{
    hos.find((err,result)=>{
        console.log(result);
        if(err)res.send("Empty");
        res.send(result);
    }).catch(next);
});

//Ventilator complete list
router.get("/ventilator_details",auth,(req,res,next)=>{
    ven.find((err,result)=>{
        if(err)res.send("Empty");
        res.send(result);
    })
});

//Export them to main page
module.exports=router;