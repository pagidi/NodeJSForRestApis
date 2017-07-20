var express = require('express'),
app = express(),
port = process.env.port || 3000;
bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

 var routes = require('./api/routes/shipmentRoutes');

routes(app);

app.listen(port);
console.log('node server running on ' + port);