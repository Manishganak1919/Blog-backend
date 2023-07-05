import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  Name:{
    type:String,
    required:true
  },
  Username:{
    type:String,
    required:true,
    unique:true
  },
  Password:{
    type:String,
    required:true,
  }
})
/*** kaun si collection pe isko lagana hai, ye btna padega ki kaun si data base mein isko pass karwana hai, that is table in Mysql****/
const table=mongoose.model('user',userSchema); /**  'user ' is the name of the collection , that is Table in mysql  **/
export default table;
/** and this table need to be validate in userapi.js***/


