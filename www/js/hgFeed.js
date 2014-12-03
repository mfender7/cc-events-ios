function getHg() {
  var json = { events: [] };
  var http = new XMLHttpRequest();
  //events from mercury
  http.open("GET", "getdata.php", false);
  http.send(null);
  var data = $.parseXML(http.responseText);
  var nodes = $(data).find("node");
  for (var i = 0; i < nodes.length; i++) {
    json.events.push({
      id: nodes[i].id,
      title: $(nodes[i].children[0]).text(),
      start: $(nodes[i].children[16]).text(),
      end: $(nodes[i].children[17]).text(),
      description: $(nodes[i].children[2]).text(),
      location: $(nodes[i].children[31]).text(),
      editable: false,
      backgroundColor: "CadetBlue" //color
    });
  }
  //return json;
  $('#calendar').fullCalendar('addEventSource', json);
}


function refetchJson(){
  //if(checkboxes[0].checked) {
  //if(checkboxes[1].checked) {
  $('#calendar').fullCalendar('removeEvents');//.fullCalendar('removeEventSources');  //Removes all event sources
  if($('#calendar').fullCalendar( 'clientEvents') === "") {
    $('#calendar').fullCalendar( 'addEventSource', getJson());
  } // load the new source if the Calendar is empty
  $('#calendar').fullCalendar('rerenderEvents');
}
