let word = document.querySelector("#word");

let meaning_heading = document.querySelector("#meaning_heading");
let meaning = document.querySelector("#meaning");

let partofspeech_heading = document.querySelector("#partofspeech_heading");
let partofspeech_content = document.querySelector(".partofspeech_content");

let audio_heading = document.querySelector("#audio_heading");
let audio_content = document.querySelector(".audio_content");

let synonyms_heading = document.querySelector("#synonyms_heading");
let synonyms_content = document.querySelector(".synonyms_content");

function display() {
  let audio = document.getElementsByClassName("audio");
  var audio_length = audio.length;
  while (audio_length !== 0) {
    audio[audio_length - 1].remove();
    audio_length--;
  }

/***********************************************************************************************/

  const result = fetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + word.value
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      meaning_heading.innerHTML = "Meaning";
      meaning.innerHTML = data[0].meanings[0].definitions[0].definition;
      partofspeech_heading.innerHTML = "Part of Speech";
      var partofspeech_data = " ";
      for (var i = 0; i < data[0].meanings.length; i++) {
        partofspeech_data += `<p class="partofspeech">${data[0].meanings[i].partOfSpeech}</p>`;
      }
      partofspeech_content.innerHTML = partofspeech_data;

/***********************************************************************************************/

      audio_heading.innerHTML = "How To Pronounce";
      audio_content.innerHTML = " ";
      if (data[0].phonetics.length !== 0) {
        var audio = document.createElement("audio");
        audio.setAttribute("class", "audio");
        var src = " ";
        for (i = 0; i < data[0].phonetics.length; i++) {
          if (data[0].phonetics[i].audio !== "") {
            src = data[0].phonetics[i].audio;
            break;
          }
        }
        console.log(src);
        audio.setAttribute("src",src);
        audio.setAttribute("controls", "controls");
        audio.setAttribute("muted", "muted");
        audio_content.append(audio);
      } else {
        var audio_data = `<p class="error">Audio not available</p>`;
        audio_content.innerHTML = audio_data;
      }

/***********************************************************************************************/

      synonyms_heading.innerHTML = "Synonyms";
      var synonyms_array = data[0].meanings[0].synonyms;
      if (synonyms_array) {
        var synonyms_data = " ";
        for (i = 0; i < synonyms_array.length; i++) {
          synonyms_data += `<p class="synonyms">${synonyms_array[i]}</p>`;
        }
        synonyms_content.innerHTML = synonyms_data;
      }
      if (synonyms_array.length === 0) {
        synonyms_data = `<p class="error">No Synonyms Available</p>`;
        synonyms_content.innerHTML = synonyms_data;
      }
    })
    .catch((error) => {
      meaning_heading.innerHTML = " ";
      let audio = document.getElementsByClassName("audio");
      var audio_length = audio.length;
      while (audio_length !== 0) {
        audio[audio_length - 1].remove();
        audio_length--;
      }

      word.value = " ";

      audio_heading.innerHTML = " ";
      audio_content.innerHTML = " ";

      meaning_heading.innerHTML = " ";
      meaning.innerHTML = " ";

      partofspeech_heading.innerHTML = " ";
      partofspeech_content.innerHTML = " ";

      synonyms_content.innerHTML = " ";
      synonyms_heading.innerHTML = " ";

      alert("Incorrect Word,Enter Again");
    });
}

/***********************************************************************************************/

function reset() {
  let audio = document.getElementsByClassName("audio");
  var audio_length = audio.length;
  while (audio_length !== 0) {
    audio[audio_length - 1].remove();
    audio_length--;
  }

  word.value = " ";
  audio_heading.innerHTML = " ";
  meaning_heading.innerHTML = " ";
  meaning.innerHTML = " ";
  partofspeech_heading.innerHTML = " ";

  partofspeech_content.innerHTML = " ";
  synonyms_content.innerHTML = " ";
  synonyms_heading.innerHTML = " ";
}

/***********************************************************************************************/
