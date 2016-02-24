var User = require('../models/user.js').User;

var md5 = require('md5');

exports.create = function(req, res){
    
    var user = new User();
    
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = md5(req.body.password + global.SALT_KEY);
    
    user.save(function (error){
        
        if(error){
            
            res.status(500).json(error);
            return;
        }
        
        res.status(201).json({
            
            name: user.name,
            username: user.username,
            image:user.image
            
        });
        
    });
};

exports.get = function(req, res){
    
    User.find({}, function(error, result){
       
       if(error){
           
           res.status(500).json(error);
           return;
           
       }
       
       res.status(200).json(result);
        
    });
    
};

exports.getById = function(req, res){
    
    var id = req.params.id;
    
    User.findOne({ 
        
        _id: id
        
    }, function(error, result){
       
       if(error){
           
           res.status(500).json(error);
           return;
           
       }
       
       if(!result){
           
           res.status(404).json({
               
               message: 'usuario não encontrado!'
               
           });
           
           return;
           
       }
       
       res.status(200).json(result);
        
    });
    
};

exports.update = function(req, res){
    
    var id = req.params.id;
    
    User.findById(id, function(error, user){
       
       if(error){
           
           res.status(500).json(error);
           return;
           
       }
       
       if(!user){
           
           res.status(404).json({
               
               message: 'usuario não encontrado!'
               
           });
           
           return;
           
       }
       
       user.name = req.body.name;
       user.image = req.body.image;
        
       user.save(function (error){
        
            if(error){
            
                res.status(500).json(error);
                return;
            }
        
            res.status(201).json({
            
                message: 'usuario alterado com sucesso!'
            
            });
        
        });
        
    });
    
};


exports.remove = function(req, res){
    
    var id = req.params.id;
    
    User.remove({
        
        _id: id
        
    }, function(error, result){
       
       if(error){
           
           res.status(500).json(error);
           return;
           
       }
       
       res.status(200).json({
           
           message: 'usuario removido com sucesso!'
           
       });
        
    });
    
};