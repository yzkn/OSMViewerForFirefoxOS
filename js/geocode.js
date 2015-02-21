window.addEventListener('DOMContentLoaded', function() {

 var results = document.getElementById('rslt');
 var request = null;
 var geoc = document.getElementById('geoc');
 geoc.addEventListener('click', function(e) {
  e.preventDefault();
  geocode();
 }, false);

 function geocode() {
  var searchInput = document.getElementById('term');
  if(request && request.abort) {
   request.abort();
  }

  var term = searchInput.value;
  if(term.length === 0) {
   term = searchInput.placeholder;
  }

  var apiURL = 'http://www.geocoding.jp/api/?v=1.1&q=';
  var url = apiURL + term;
  request = new XMLHttpRequest({ mozSystem: true });
  request.open('get', url, true);
  request.responseType = 'text';
  request.addEventListener('error', onRequestError);
  request.addEventListener('load', onRequestLoad);
  request.send();
 }

 function onRequestError() {
  var errorMessage = request.error;
  if(!errorMessage) {
   results.textContent = errorMessage;
  }
 }

 function onRequestLoad() {
  var response = request.response;
  if(response === null) {
   results.textContent = 'geocode_search_error_response';//translate('geocode_search_error_response');
   return;
  }

  results.textContent = '';

  if(response.length !== 0) {
   var parser = new DOMParser();
   var dom = parser.parseFromString(response, "text/xml");
   var node=dom.documentElement;
   var latObj=node.getElementsByTagName("lat");
   var lngObj=node.getElementsByTagName("lng");
   results.textContent = latObj[0].childNodes[0].nodeValue+","+lngObj[0].childNodes[0].nodeValue;
    
   var lonLat = new OpenLayers.LonLat(lngObj[0].childNodes[0].nodeValue, latObj[0].childNodes[0].nodeValue)
  .transform(
   new OpenLayers.Projection("EPSG:4326"), // from WGS 1984
   map.getProjectionObject() // to Spherical Mercator
  );
 map.setCenter (lonLat, 18);
  }
 }

});
