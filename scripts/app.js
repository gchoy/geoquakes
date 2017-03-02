// define globals

$(document).on("ready", function() {
  var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
  var $info = $('#info');
  var coords =[];
  initMap();

  $.ajax({
          method: 'GET',
          url: weekly_quakes_endpoint,
          dataType: 'json',
          success: grabGeoData

  });


  function grabGeoData(json){

    json.features.forEach(function(e) {
                            var place = e.properties.place;
                            var mag = e.properties.mag;
                            var time = e.properties.time;
                            var coords = e.geometry.coordinates;
                            var lat = coords[1];
                            var lon = coords[0];
                            new google.maps.Marker({
                              position: new google.maps.LatLng(lat,lon),
                              map: map,
                              title:  'USGS Earthquakes Map'
                              });
                            var date = new Date(e.properties.time*1000);
                            var hours = date.getHours();
                            var minutes = "0" + date.getMinutes();
                            var seconds = "0" + date.getSeconds();
                            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                            $info.append("Mag: " + mag + "--" + place + " at: " + formattedTime + "<br>");
                            //console.log(coords + mag + place + formattedTime);

                        });

  }

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7749, lng: -122.4194},
    zoom: 8
      });
  }

});
