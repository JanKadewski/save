const express = require('express');
const {Pool} = require('pg');
const app = express();
require("dotenv").config();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const pool = new Pool({
    connectionString:connectionString
})
pool.connect();
app.get('/result',(req,res)=>{
    pool.query(`Select * from "Saving"`,(err,result)=>{
        if(!err){
            res.send(result.rows);
            console.log(result.rows);
            pool.end;
        }
    })
})

app.post('/add',(req,res)=>{
    const {name,value} = req.body;
    pool.query(`INSERT INTO "Saving" (name, value) VALUES ($1, $2)`,[name,value],(err,result)=>{
        if(!err){
            console.log('submitted');
            console.log()
        }
    })
})

app.listen(process.env.PG_PORT,()=>{
    console.log(`listening on port ${port}`);
})