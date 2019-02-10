console.log('app is alive');

function createChannelElement(channel){
  $("#channels-list").append(function(){
    return $("<li/>").attr("onClick", "select_switch("+channel.name+")")

    .append($('<div/>').addClass("flexx").attr('style', 'background-color:inherit')
              .append($('<strong/>').html("#"+channel.name)
              .attr("style", "background-color:inherit; margin-right: 5px"))
    .append(
      $("<div/>").addClass("channel-meta")
         .append($('<div/>').addClass('st').attr('style', 'background-color:inherit')
         .append($("<i/>").addClass(channel.starred?'fas fa-star':'far fa-star')
                .attr("alt", "star")
                .attr("style", "background-color:inherit; margin-right: 5px")
              ))
         .append($('<div/>').append($('<small/>').html(channel.expiresIn+" min.").attr("style", "background-color: #0033cc; color:white; margin-right: 5px; padding: 1px 2px 2px 1px; border-radius: 2px")).attr('style',"background-color:inherit" ))
         .append($('<div/>').append($('<small/>').html(channel.messageCount+" new").attr("style", "background-color: #0033cc; color:white; margin-right: 5px; padding: 1px 2px 2px 1px; border-radius: 2px")).attr('style',"background-color:inherit" ))
         .append($("<i/>")
          .addClass("fas fa-angle-right fa-2x")
               .attr("style", "background-color:inherit")
             )
            )
          )
  });

}
function sendMessage(){
  var t = $('#text').val();
  if(t != ' ' && t != 'Message...'){
      var m1 = new Message(t);
      currentChannel.messages.push(m1);
      currentChannel.messageCount++;
      if(currentNTF.name == "New"){
        selectNTF(New);
      }
      $('#channels-list .selected small:contains(new)').html(currentChannel.messageCount+" new");
      $('#text').val('Message...');
      createMessageElement(m1);
      select_switch(currentChannel);
  }
}
function returnMessageElement(messageObject) {
  var k = messageObject.createdOn;
  var ka = messageObject.expiresOn;
  console.log(k.getMinutes());
  var diff = Math.abs(ka.getMinutes() - k.getMinutes());
  $("#chatscroll").append(function(){

    return $("<div/>").addClass("ma-mess")
    .append(
      $("<h3/>").append($("<b/>")
             .html($("<a/>").attr("href", messageObject.createdBy)
                  .attr("target", "_blank")
                 .html($("<strong/>")
                         .html(messageObject.createdBy))))
              .append(format(messageObject.createdOn))
              .append($("<em/>").html( diff+" min. left"))
                )
     .append($('<div/>')
     .append($("<p/>").html(messageObject.text)
     .append($("<button/>").html("+5 min."))))
  });
$("#chatscroll").scrollTop(1000000);
}

function createMessageElement(messageObject){
  var k = new Date();
  var ka = messageObject.expiresOn;
  console.log(k.getMinutes());
  var diff = Math.abs(ka.getMinutes() - k.getMinutes());
  $("#chatscroll").append(function(){

    return $("<div/>").addClass("ma-mess")
    .append(
      $("<h3/>").append($("<b/>")
             .html($("<a/>").attr("href", messageObject.createdBy)
                  .attr("target", "_blank")
                 .html($("<strong/>")
                         .html(messageObject.createdBy))))
              .append(format(messageObject.createdOn))
              .append($("<em/>").html( diff+" min. left"))
                )
     .append($('<div/>')
     .append($("<p/>").html(messageObject.text)
     .append($("<button/>").html("+5 min."))))
  });
$("#chatscroll").scrollTop(1000000);
}

var currentLocation = {
  longitude: -0.119344700,
  latitude: 51.511207900,
  what3words: 'daring.lion.race'
}
function Message(text){
  this.createdBy = currentLocation.what3words;
  this.latitude = currentLocation.latitude;
  this.longitude = currentLocation.longitude;
  var n = new Date();
  this.createdOn = n;

  var d = new Date();
  d.setMinutes(d.getMinutes() + 15);
  this.expiresOn = d;
  this.text = text;
  this.own = true;
}
function format(date){
  var days =["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var day = days[date.getDay()];
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var month = months[date.getMonth()];
  var min = date.getMinutes();
  if(min<10){


  // DO SOMETHING IF MIN IS LESS THAN 10 (ADD 0)

  }
  return day + ", " + month +" "+ date.getDate()+ "th, "+ date.getHours()+":"+date.getMinutes();
}

console.log("dooo");



function switchChannel(channel) {
  $('#app-bar2').empty()
  console.log('Tuning into channel ' + channel);
  $('#app-bar2').append($('<h3/>').html('#'+channel.name + ' by ')
  .append($('<a/>').html(channel.createdBy)
    .attr('href', 'https://w3w.co/upgrading.never.helps')));
  $('#app-bar2').append($('<i/>').attr('id', 'changing_star')
                  .attr('onclick', "fill_the_star()")
                  .attr('style', "background-color:#44618e")
    .addClass(channel.starred?'fas fa-star':'far fa-star'));

}

function fill_the_star(){
      if($('#changing_star').hasClass('fas fa-star')){
        $('#changing_star').removeClass('fas fa-star').addClass('far fa-star');
        $('li:contains(' + currentChannel.name +') .st i').removeClass('fas fa-star').addClass('far fa-star');
        currentChannel.starred = false;
      }else{
        $('#changing_star').removeClass('far fa-star').addClass('fas fa-star');
        $('li:contains(' + currentChannel.name +') .st i').removeClass('far fa-star').addClass('fas fa-star');
        currentChannel.starred = true;
      };
      if(currentNTF.name == "Favs"){
        selectNTF(Favs);
      }
}

function selectTab(channel){
  $('#channels-list li').removeClass('selected');
  $('li:contains(' + channel.name +')').addClass('selected');
  console.log('Changing to tab ' + channel);
}
function loadMessages(channel) {
  $('#chatscroll').empty();
  if(channel.messages != null){
    channel.messages.forEach(function(el){
            return returnMessageElement(el);
    })
  }
}
function select_switch(channel) {
  switchChannel(channel);
  selectTab(channel);
  loadMessages(channel);
  currentChannel = channel;
  console.log(currentChannel + "poooo");
  console.log(currentChannel.messages + " -messages");

}
var one = 0;
function hide_emoji(){
  if(one<1){
     $('#emojis').append(arr);
     one++;
  }
  $('#emojis').toggle();
}

var currentChannel = {
}
var currentNTF = {
}
function selectNTF(ntf) {
  console.log("CURRENTNTF "+ currentNTF.name + " NTF "+ntf.name);
  $('#tab-bar button p:contains(' + currentNTF.name +')').removeClass('selected');
  $('#tab-bar button p:contains(' + ntf.name +')').addClass('selected');
  currentNTF = ntf;
  if(ntf.name == "New"){
    var result = sortNew(channels);
  }else if(ntf.name == "Favs"){
    var result = sortFavs(channels);
  }else{
    var result = sortTre(channels);
  }
  $("ul").empty();
  for( i = 0; i < result.length; i++){
     var k = result[i];
     createChannelElement(k);
 }
 select_switch(currentChannel);
}

function sortFavs(ch) {
  var arr = new Array(ch);
  arr = arr[0];
  var index = 0;
 for(i=0; i<arr.length; i++){
     if(arr[i].starred){
         var temp = arr[index];
        arr[index] = arr[i] ;
         arr[i] = temp;
         index++;
       }
 }
    return arr;
}
function creation() {
  console.log("CREATING");
  $('#app-bar2').empty()
//   $('#app-bar2 small').html('');
//   $('#app-bar2 b').html('');
//   $('#changing').html($("<input/>").addClass('inputCh')
//                       .attr('value', 'Enter a #ChannelName')
//                       .attr('type', 'text')
//
// )
}
