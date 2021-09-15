import start from "../assets/audio/start.mp3";
import selectMode from "../assets/audio/selectMode.mp3";
import beep from "../assets/audio/beep.mp3";
import backMenu from "../assets/audio/backMenu.mp3";
import endTime from "../assets/audio/endTime.mp3";

function startSong() {
  var snd = new Audio(start);
  snd.play();
}

function beepSong() {
  var snd = new Audio(beep);
  snd.play();
}

function selectModeSong() {
  var snd = new Audio(selectMode);
  snd.play();
}

function backMenuSong() {
  var snd = new Audio(backMenu);
  snd.play();
}
function endTimeSong() {
  var snd = new Audio(endTime);
  snd.play();
}

export { startSong, beepSong, selectModeSong, backMenuSong, endTimeSong };
