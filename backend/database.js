const mongoose=require("mongoose")
const connecttoMongoDb= async ()=>{
    try{
        // console.log(process.env.MongoDB_URL)
        await mongoose.connect(process.env.MongoDB_URL)
    }catch(error){
        console.log(`Mongodb ${error}`)
    }
}
module.exports=connecttoMongoDb