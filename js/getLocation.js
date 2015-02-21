 //ユーザーの現在の位置情報を取得
function getCurrentPosition(){
 navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

/***** ユーザーの現在の位置情報を取得 *****/
function successCallback(position) {
 var gl_text = "\"" + position.coords.latitude + ", " + position.coords.longitude + "\"";
  gl_text += " " + position.coords.altitude + "m";
  gl_text += " " + position.coords.heading + "deg";
  gl_text += " " + position.coords.speed + "m/s";
   // gl_text += "座標：" + position.coords.latitude + ", " + position.coords.longitude;
   // gl_text += "高度：" + position.coords.altitude + "<br />";
   // gl_text += "緯度・経度の誤差：" + position.coords.accuracy + "<br />";
   // gl_text += "高度の誤差：" + position.coords.altitudeAccuracy + "<br />";
   // gl_text += "方角：" + position.coords.heading + "<br />";
   // gl_text += "速度：" + position.coords.speed + "<br />";

 document.getElementById("show_result").innerHTML = gl_text;
 var lonLat = new OpenLayers.LonLat(position.coords.longitude, position.coords.latitude)
  .transform(
   new OpenLayers.Projection("EPSG:4326"), // from WGS 1984
   map.getProjectionObject() // to Spherical Mercator
  );
 map.setCenter (lonLat, 18);
}

/***** 位置情報が取得できない場合 *****/
function errorCallback(error) {
  // var err_msg = "";
  // switch(error.code)
  // {
  //   case 1:
  //     err_msg = translate('getlocation_search_error_deny')+"<br />";
  //     break;
  //   case 2:
  //     err_msg = translate('getlocation_search_error_unresolved')+"<br />";
  //     break;
  //   case 3:
  //     err_msg = translate('getlocation_search_error_timeout')+"<br />";
  //     break;
  // }
  // document.getElementById("show_result").textContent = err_msg;
  document.getElementById("rslt").textContent = error.message;

  var lonLat = new OpenLayers.LonLat(139.766084, 35.681382)
   .transform(
    new OpenLayers.Projection("EPSG:4326"),
    map.getProjectionObject()
   );
  map.setCenter (lonLat, 10);
}
