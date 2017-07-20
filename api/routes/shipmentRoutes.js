'use strict'

 module.exports = function(app){
     var shipments = require('../controllers/shipment');
     app.route('/api/shipments/getall')
        .get(shipments.get_all_shipments);
 };