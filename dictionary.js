let word=document.querySelector('#word');
let container=document.querySelector(".container");

let meaning_heading=document.querySelector("#meaning_heading");
let meaning=document.querySelector("#meaning");

let partofspeech_heading=document.querySelector("#partofspeech_heading");
let partofspeech_content=document.querySelector(".partofspeech_content");

function display()
{
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+word.value).then(res=> res.json())
    .then(data=>{
        console.log(data);
        meaning_heading.innerHTML="Meaning";
        meaning.innerHTML=data[0].meanings[0].definitions[0].definition;
        partofspeech_heading.innerHTML="Part of Speech";
        for(var i=0;i<data[0].meanings.length;i++)
        {
            //console.log(data[0].meanings[i].partOfSpeech)
            /*if(i<((data[0].meanings.length)-1))
            {
                partofspeech.innerHTML+=data[0].meanings[i].partOfSpeech+",";
            }
            else
            {
                partofspeech.innerHTML+=data[0].meanings[i].partOfSpeech;
            }*/
            var p=document.createElement("p");
            p.setAttribute("class","partofspeech");
            p.innerHTML=data[0].meanings[i].partOfSpeech;
            partofspeech_content.append(p);
        }
        //for(i=0;i<)
        //synonyms.innerHTML=data[0].meanings[0].partOfSpeech+","+data[0].meanings[1].partOfSpeech;
        //synonyms_heading.innerHTML="Synonyms";
        var audio=document.createElement("audio");
        audio.setAttribute("id","audio");
        audio.setAttribute("src",data[0].phonetics[0].audio);
        audio.setAttribute("controls","controls");
        audio.setAttribute("muted","muted");
        container.append(audio);
    })
}
function reset()
{
    let audio=document.querySelector("#audio");
    meaning_heading.innerHTML=" ";
    meaning.innerHTML=" ";
    partofspeech_heading.innerHTML=" ";
    //synonyms_heading.innerHTML=" ";
    partofspeech_content.innerHTML=" ";
    audio.remove();
}