const express=require("express")
const cors=require("cors")
const cookie=require("cookie-parser")
const dotenv=require("dotenv")
const cookieParser = require("cookie-parser")

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
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)//do not use "", '' use ``
    console.log(process.env.FRONTEND_URL)
})