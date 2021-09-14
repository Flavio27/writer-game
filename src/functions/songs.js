import beep from "../assets/audio/beep.mp3"


function beepSong() {
  var snd = new Audio(beep);
  snd.play();
}

export {beepSong}