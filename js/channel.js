var Yummy = {
  name: 'Yummy',
  createdOn: new Date('09/24/2018 00:00'),
  createdBy: 'minus.plus.yummy',
  starred: true,
  expiresIn: 100,
  messageCount: 300,
  messages: new Array()
}
var SevenContinents = {
  messages: new Array(),
  name: 'SevenContinents',
  createdOn: new Date('01/06/2018 00:00'),
  createdBy: 'minus.plus.sevenContinents',
  starred: true,
  expiresIn: 100,
  messageCount: 55
}
var KillerApp = {
  messages: new Array(),
  name: 'KillerApp',
  createdOn: new Date('09/02/2019 00:00'),
  createdBy: 'minus.plus.killerApp',
  starred: false,
  expiresIn: 100,
  messageCount: 41
}
var FirstPersonOnMars = {
  messages: new Array(),
  name: 'FirstPersonOnMars',
  createdOn: new Date('08/22/2018 00:00'),
  createdBy: 'milk.rinse.takers',
  starred: false,
  expiresIn: 100,
  messageCount: 34
}
var Octoberfest = {
  messages: new Array(),
  name: 'Octoberfest',
  createdOn: new Date('10/20/2016 00:00'),
  createdBy: 'minus.plus.octoberfest',
  starred: false,
  expiresIn: 100,
  messageCount: 90
}
var channels =[Yummy, SevenContinents,
   KillerApp,
   FirstPersonOnMars, Octoberfest];

function sNew(ch1, ch2) {
  return ch1.createdOn < ch2.createdOn;

}
function sortNew(ch) {
  var arr = new Array(ch);
  arr = arr[0];
 for(i=0; i<arr.length; i++){
   for(m=i+1; m<arr.length; m++){
     if( sNew(arr[i], arr[m])){
       console.log(i);
         var temp = arr[i];
        arr[i] = arr[m] ;
         arr[m] = temp;
       }
   }
 }
    return arr;
}
function sTre(ch1, ch2) {
  return ch1.messageCount < ch2.messageCount;
}
function sortTre(ch) {
  var arr = new Array(ch);
  arr = arr[0];
 for(i=0; i<arr.length; i++){
   for(m=i+1; m<arr.length; m++){
     if( sTre(arr[i], arr[m])){
       console.log(i);
         var temp = arr[i];
        arr[i] = arr[m] ;
         arr[m] = temp;
       }
   }
  }
  console.log("TRE"+ arr);
    return arr;
}
var New = {
  name: 'New',
}
var Favs = {
  name: 'Favs',
}
var Trendin = {
  name: 'Trendin',
}

function listChannel(){
  $('#tab-bar button p:contains(New)').addClass('selected');
  selectNTF(New);
  select_switch(FirstPersonOnMars);
}
