const result = document.getElementById("result");
const more = document.getElementById("more");
const playbtn = document.getElementById("getlyrics");
const msgEl = document.getElementById("msg");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
}

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `${msg}
  `;
}

// Speak result
recognition.addEventListener("result", onSpeak);

// End SR service
recognition.addEventListener("end", () => recognition.start());

///////////////////////////////////////////////////

const apiURL = "https://api.lyrics.ovh";

// Search by song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  console.log(data);
  showData(data);
}

// Show song and artist in DOM
function showData(data) {
  result.innerHTML = `
      <div class="songs">
        ${data.data
          .map(
            (song) => `<div class="album">
            <img  src=${song.artist.picture} alt="Card image cap">
            <div >
            <h2><strong>${song.artist.name}</strong> - ${song.title}</h2>
              <p>${song.album.title}</p>
              <a href=${song.preview} class="btn">Play</a>
            </div>
          </div>`
          )
          .join("")}
      </div>
    `;
}

// Event listeners
playbtn.addEventListener("click", () => {
  const searchTerm = msgEl.textContent.trim();
  console.log(searchTerm);
  if (!searchTerm) {
    alert("Please say in a search term");
  } else {
    searchSongs(searchTerm);
  }
});
