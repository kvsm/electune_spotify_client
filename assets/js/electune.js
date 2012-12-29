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
  var trackJSON = getCurrentTrack();
  $("#playlist").html(trackJSON.playlist + " playlist");
  if (trackJSON.song_link != "") {
    playTrack(trackJSON.song_link + "#" + trackJSON.current_time);
    models.Track.fromURI(trackJSON.song_link, updateTrackDetails);
  } else {
    updateTrackDetails(null);
  }
}

function updateTrackDetails(track) {
  if (track != null) {
    var trackStr = track.name + " - " + track.artists[0].name;
    $("#track-image-container")
        .empty()
        .append(
            $('<img>').attr('src', track.image)
        );
  } else {
    var trackStr = "&lt;no track&gt;";
    $("#track-image-container")
        .empty();
  }
  $("#track").html(trackStr);
    
  
}

function getCurrentTrack() {
  var url = "http://electune.dyndns.org/playlists/1/current";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  var json = JSON.parse(xmlhttp.responseText);
  return json;
}

function playTrack(track) {
  var tempList = new models.Playlist();
  tempList.add(track);
  player.play(track, tempList.uri);
}
