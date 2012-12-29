var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var player = models.player;

exports.init = init;

function init() {  
  playCurrentTrack();
  player.observe(models.EVENT.CHANGE, function (e) {
    if (!player.playing && e.data.curtrack == true) {
      playCurrentTrack();
    }
  });
}

function playCurrentTrack() {
  var track = getCurrentTrack()
  playTrack(track);
}

function getCurrentTrack() {
  url = "http://electune.dyndns.org/playlists/1/current.json";
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  json = JSON.parse(xmlhttp.responseText);
  $("#response").html(xmlhttp.responseText);
  return json.song_link + "#" + json.current_time;
}

function playTrack(track) {
  var tempList = new models.Playlist();
  tempList.add(track);
  player.play(track, tempList.uri);
}
