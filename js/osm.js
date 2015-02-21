window.onload=function(){
 map = new OpenLayers.Map("map");
 map.addLayer(new OpenLayers.Layer.OSM());
 var lonLat = new OpenLayers.LonLat(139.766084, 35.681382)
  .transform(
   new OpenLayers.Projection("EPSG:4326"),
   map.getProjectionObject()
  );
 map.setCenter (lonLat, 10);

 var cpos = document.getElementById('cpos');
 cpos.addEventListener('click', getCurrentPosition, false);

 getCurrentPosition();
}