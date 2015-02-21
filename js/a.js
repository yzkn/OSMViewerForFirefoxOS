function openlink (url){
  var activity = new MozActivity({
    name: "view",
    data: {
      type: "url",
      url: url
    }
  });
}