var md5 = require('md5');

var User = require('../models/user.js').User;

var auth = require('../security/auth.js');

exports.authenticate = function(req, res){
    
    var username = req.body.username;
    var userpass = md5(req.body.password + global.SALT_KEY);
    
    User.findOne({
        
        username: username,
        password: userpass
        
    }, function(error, result){
        
        if(error){
            
            res.status(500).json(error);
            
            return;
            
        }
        
        if(!result){
            
            res.status(401).json({
                
                message: 'usuario ou senha inválidos!'
                
            });
            
            return;
            
        }
        
        var token = auth.signIn(result);
        
        res.status(200).json({
            
            usertoken: token,
            user: {
                
                id: result._id,
                username: result.username,
                admin: result.admin
                
            }
            
        });
        
    });
    
};
