const express=require("express")
const cors=require("cors")
const cookie=require("cookie-parser")
const dotenv=require("dotenv")
const cookieParser = require("cookie-parser")
const { connect } = require("http2")
const connecttoMongoDb = require("./database")
const passport = require("passport");
// const connectDB=require('connecttoMongoDB')

dotenv.config()//
const app=express()
// console.log(process.env)

const PORT=process.env.PORT||4000

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use(
    cors({//CORS: NOT ALLOWED!!
        origin:process.env.FRONTEND_URL,
        credentials:true
    })
)

app.use(passport.initialize());

app.use("/api/auth", require("./routes/authRoute"));

app.use((error,req,res,next)=>{
    console.log(error.status)
    res.status[500].json({error:error||"sth went wrong"})
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)//do not use "", '' use ``
    console.log(`frontend running on ${process.env.FRONTEND_URL}`)
  connecttoMongoDb()
  
})