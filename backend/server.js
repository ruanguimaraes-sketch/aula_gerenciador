const express = require('express');
const cors = require ('cors');
const { error } = require('console');

const app = express();
// adicionar db.js

const PORT = 3000;

app.use(cors());
app.use(express, json ());

app.get("/tasks", (req, res) => {
    db.query("SELECT * from tasks", (err, result) =>{
        if(err) return res.status(500).json({error:err.message});
        res.json(result);
    })
})




