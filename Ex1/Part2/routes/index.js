var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Distance between 2 point in the Earth' });
});

function getDistance(lat1, long1, lat2, long2) {
  
  var Radio = 6371; 
  
  var geoLat = deg2rad(lat2 - lat1);  
  var geoLong = deg2rad(long2 - long1);
  var angle1 =Math.sin(geoLat / 2) * Math.sin(geoLat / 2) +Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *Math.sin(geoLong / 2) * Math.sin(geoLong / 2);
  var angle2 = 2 * Math.atan2(Math.sqrt(angle1), Math.sqrt(1 - angle1));
  var result = Radio * angle2; 
  return result;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

router.post('/api/calculate_distance', function (req, res, next) {
  var lat1 = req.body.lat1;
  var long1 = req.body.lon1;
  var lat2 = req.body.lat2;
  var long2 = req.body.lon2;
  res.send({ distance: getDistance(lat1, long1, lat2, long2) });
});

module.exports = router;
