import mongoose from "mongoose";


const Connection  = async(username,password)=>{
  const URL = `mongodb://${username}:${password}@ac-ojkiazd-shard-00-00.isavasq.mongodb.net:27017,ac-ojkiazd-shard-00-01.isavasq.mongodb.net:27017,ac-ojkiazd-shard-00-02.isavasq.mongodb.net:27017/?ssl=true&replicaSet=atlas-i6bewt-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL,{useNewUrlParser:true});
    console.log('database connected sucessfully');
  } catch (error) {
    console.log('Error while connecting the database',error);
  }
}

export default Connection;