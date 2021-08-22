let word=document.querySelector('#word');
let container=document.querySelector(".container");

let meaning_heading=document.querySelector("#meaning_heading");
let meaning=document.querySelector("#meaning");

let partofspeech_heading=document.querySelector("#partofspeech_heading");
let partofspeech_content=document.querySelector(".partofspeech_content");

let audio_heading=document.querySelector("#audio_heading");

let synonyms_container=document.querySelector(".synonyms_container");
let synonyms_heading=document.querySelector("#synonyms_heading");
function display()
{
    const result=fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+word.value)
    .then(res=> res.json())
    .then(data=>{
        meaning_heading.innerHTML="Meaning";
        meaning.innerHTML=data[0].meanings[0].definitions[0].definition;
        partofspeech_heading.innerHTML="Part of Speech";
        for(var i=0;i<data[0].meanings.length;i++)
        {
            var p=document.createElement("p");
            p.setAttribute("class","partofspeech");
            p.innerHTML=data[0].meanings[i].partOfSpeech;
            partofspeech_content.append(p);
        }
        audio_heading.innerHTML="How To Pronounce";
        var audio=document.createElement("audio");
        audio.setAttribute("id","audio");
        audio.setAttribute("src",data[0].phonetics[0].audio);
        audio.setAttribute("controls","controls");
        audio.setAttribute("muted","muted");
        container.append(audio);
        synonyms_heading.innerHTML="Synonyms";
        var synonyms_array=data[0].meanings[0].definitions[0].synonyms;
        if(synonyms_array)
        {
            var synonyms_data=" ";
            for(i=0;i<synonyms_array.length;i++)
            {
                synonyms_data +=`<p class="synonyms">${synonyms_array[i]}</p>`;
            }
            synonyms_container.innerHTML=synonyms_data;
        }
        if(synonyms_array.length==0){
            synonyms_container.innerHTML="No Synonyms Available";
        }
    })
    .catch(error => {
        meaning_heading.innerHTML=" ";
        alert("Incorrect Word,Enter Again");
    });
}
function reset()
{
    let audio=document.querySelector("#audio");
    audio.remove();
    word.value=" ";
    audio_heading.innerHTML=" ";
    meaning_heading.innerHTML=" ";
    meaning.innerHTML=" ";
    partofspeech_heading.innerHTML=" ";
    //synonyms_heading.innerHTML=" ";
    partofspeech_content.innerHTML=" ";
    synonyms_container.innerHTML=" ";
    synonyms_heading.innerHTML=" ";
}
