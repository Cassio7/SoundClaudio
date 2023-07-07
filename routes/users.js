const express = require('express');
const connection= require('../connection');
const router = express.Router();

router.post('/signup',(req,res) =>{
    let users = req.body;
    query = "select email,password,admin from users where email=?"
    connection.query(query,[users.email],(err,results)=>{    
        if (err) {
        return res.status(500).json(err);
        }
        else{
            if (results.length <=0) {
                query = "insert into users(name,email,password,admin) values(?,?,?,0)";
                connection.query(query,[users.name,users.email,users.password],(err,results) =>{
                    if(!err){
                        return res.status(200).json({message: "Successfully Registred"});
                    }
                    else{
                        return res.status(500).json(err);
                    }
                })
            }
            else{
                return res.status(400).json({message : "Email Already Exist. "});
            }
        }
    })

})

module.exports = router;