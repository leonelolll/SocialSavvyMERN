const express = require('express')
const app = express()
const PORT = 5000

app.get( '/',(req,res) =>{
    return res.send('Hello welcom =e to node js with express')
})

app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    console.log('SERVER STARTED')
}
)