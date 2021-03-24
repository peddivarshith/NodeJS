const mongoose=require("mongoose");


const Schema=mongoose.Schema;

//creating hospital schema & Model
const hospital=new Schema({
    hId:{
        type: String,
        required:[true,"Hid is required"]
    },
    name:{
        type:String,
        required:[true,"Name of the Hospital is required"]
    },
    location:{
        type:String
    },
    Address:{
        type:String
    },
    ContactNo:{
        type:String
    }

});
const ventilator=new Schema({
    hId :{
        type:String,
        required:[true,"Hid is required"]
    }, 
    ventilatorId : {
        type:String,
        required:[true,"ventilatorId is required"]
    },
    status:{
        type:String
    },
    name : {
        type:String
    }
});

//creating hospital and ventilator models(collections)
const model_hospital=mongoose.model("list_of_hospitals",hospital);
const model_ventilators=mongoose.model("list_of_ventilators",ventilator);

//Exporting both the models
module.exports={
    hos:model_hospital,
    ven:model_ventilators
};