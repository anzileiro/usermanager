var app = require('../app.js');

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function (){
    
    console.log('Servidor ativo: ' + server.address().port);
    
});

