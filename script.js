document.addEventListener("DOMContentLoaded", function () {

    // Play & Pause buttons
    let pause = document.querySelector('#pause');
    pause.style.display = "none";
    let play = document.querySelector('#play');

    pause.addEventListener('click', function () {
        audio.pause();
        pause.style.display = "none";
        play.style.display = "";
    });

    play.addEventListener('click', function () {
        audio.play();
        play.style.display = "none";
        pause.style.display = "";
    });


    // Sound on & off buttons
    let soundOff = document.querySelector('#soundOff');
    soundOff.style.display = "none";
    let soundOn = document.querySelector('#soundOn');

    soundOff.addEventListener('click', function () {
        audio.muted = false;
        soundOff.style.display = "none";
        soundOn.style.display = "";
    });

    soundOn.addEventListener('click', function () {
        audio.muted = true;
        soundOn.style.display = "none";
        soundOff.style.display = "";
    });


    // Change color of the background considering the play-state
    audio.addEventListener('playing', function () {
        body.style.backgroundColor = "gray"
        title.style.color = "#F0F3F4"
    })
    audio.addEventListener('pause', function () {
        body.style.backgroundColor = "#F0F3F4"
        title.style.color = "black"
    })


    
    let audio = document.querySelector("#audio")
    let lyricsTable = document.querySelector('#lyrics') 
    let title = document.querySelector('#title')
    let body = document.querySelector('#body')

    fetch("paroles.txt").then(function (response) {

        response.text().then(function (text) {
            const sentenceRegex = /\[(\d{2})\:(\d{2}\.\d{2})\](.*)/
            const titleRegex = /\[ti: (.*)\]/
            const artistRegex = /\[ar: (.*)\]/
            const lyrics = text.split("\n")
                                                                    
            for (let i = 0; i < lyrics.length; i++) {
                if(sentenceRegex.test(lyrics[i])) {
                    let newSpan = document.createElement("span")
                    let newContent = document.createTextNode(lyrics[i].match(sentenceRegex)[3])
                    newSpan.id = (parseFloat(lyrics[i].match(sentenceRegex)[1]) * 60 + parseFloat(lyrics[i].match(sentenceRegex)[2])).toFixed(2)
                    newSpan.className = "parole"
                    newSpan.style.color = "gray"; 
                    newSpan.appendChild(newContent)
                    lyricsTable.appendChild(newSpan)
                } 
                else if(artistRegex.test(lyrics[i])) {
                    title.innerHTML = lyrics[i].match(artistRegex)[1]
                }
                else if(titleRegex.test(lyrics[i])) {
                    title.innerHTML += " - " + lyrics[i].match(titleRegex)[1]
                }
            }

            let everyParole = document.querySelectorAll(".parole")

            audio.addEventListener('timeupdate', function () {
                for (let i = 0; i < everyParole.length; i++) {
                    everyParole[i].style.fontSize = "1em"; 
                    everyParole[i].style.color = "gray"; 

                    if (parseFloat(Math.round((audio.currentTime) * 100) / 100) > parseFloat(everyParole[i]["id"]) && parseFloat(Math.round((audio.currentTime) * 100) / 100) < (parseFloat(everyParole[i+1]["id"]))) {
                        console.log(parseFloat(Math.round((audio.currentTime) * 100) / 100))
                        everyParole[i].style.fontSize = "2em";
                        everyParole[i].style.color = "black"; 
                        everyParole[i].scrollIntoView();
                    }
                }
            });

        })
    })

})