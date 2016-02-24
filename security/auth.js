var jwt = require('jsonwebtoken');

exports.signIn = function(user){
    
    return jwt.sign({
        
        username: user.username,
        admin: user.admin
        
    }, 
    global.SALT_KEY,
    {
        expiresInMinutes: 1440
    });
    
};

exports.authorize = function(req, res, next){
    
    var token = (req.body.token || req.query.token || req.headers['x-access-token'])
    
    if(!token){
        
        res.status(401).json({
            
            message: 'token inválido!'
            
        });
        
    }else{
        
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            
            if(error){
                
                res.status(401).json({
                    
                    message: 'token inválido'
                    
                });
                
            }else{
                
                next();
                
            }
            
        });
        
    }
    
};

exports.isAdmin = function(req, res, next){
    
    var token = (req.body.token || req.query.token || req.headers['x-access-token'])
    
    if(!token){
        
        res.status(401).json({
            
            message: 'token inválido!'
            
        });
        
    }else{
        
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            
            if(error){
                
                res.status(401).json({
                    
                    message: 'token inválido'
                    
                });
                
            }else{
                
                if(decoded.admin){
                    
                   res.status(401).json({
                    
                        message: 'você não tem permissão!'
                    
                    }); 
                    
                }else{
                    
                    next();
                }
            }
            
        });
        
    }
    
};