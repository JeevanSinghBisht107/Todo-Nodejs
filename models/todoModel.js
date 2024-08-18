import mongoose, { set } from "mongoose";
import moment from "moment";

const todoSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String
        },
        status:{
            type:String,
            enum:["pending","ongoing","completed"],
            default:"pending"
        },
        dueDate:{
            type:Date,
            default:Date.now(),
            set:function (Date){
                return moment(Date,"DD/MM/YYYY",true).toDate();
            },
            required:true
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    },
    {timestamps:true}
);

const TODO_SCHEMA = mongoose.model("todos",todoSchema);

export {TODO_SCHEMA};