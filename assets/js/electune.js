var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;

exports.init = init;

var callback = function (e) {
  console.log(e);
  console.log(player.playing);
  if (!player.playing && e.data.curtrack == true) {
    var track = getCurrentTrack()
    player.play(track, track);
  }
}

function init() {
  var track = getCurrentTrack()
  player.play(track, track);
  player.observe(models.EVENT.CHANGE, callback);
}

function getCurrentTrack() {
  url = "http://electune.dyndns.org/playlists/1/current.json";
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  json = JSON.parse(xmlhttp.responseText);
  var responseDiv = document.getElementById("response");
  responseDiv.innerHTML = xmlhttp.responseText;
  return json.song_link + "#" + json.current_time;
}
