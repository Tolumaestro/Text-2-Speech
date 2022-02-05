//Init SpeechSynthesis API
const synth = window.speechSynthesis;

//DOM Elements
const textForm = document.querySelector("form");
const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const rate = document.getElementById("rate");
const rateValue = document.getElementById("rate-value");
const pitch = document.getElementById("pitch");
const pitchValue = document.getElementById("pitch-value")
const body = document.querySelector("body")

//Init voices array
let voices = []

const getVoices = () =>{
    voices = synth.getVoices();
    //Loop through voices
    voices.forEach((voice) => {
        //Create option element

        const option = document.createElement("option");
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute("data-lang", voice.lang);
        option.setAttribute("data-name", voice.name);

        voiceSelect.appendChild(option)
    })
}

getVoices()

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//Speech function
const speak = () => {
    

    //Check if speaking
    if(synth.speaking){
        console.error("It's already speaking")
        return
    }

    if(textInput.value != ""){
        //Add background animation
        body.style.background = '#141414 url(Img/wave.gif)';
        body.style.backgroundRepeat = "repeat-x"
        body.style.backgroundSize = "100% 100%"

        //Get speech text
        let speechText = new SpeechSynthesisUtterance(textInput.value);

        //Speech end
        speechText.onend = (e) => {
            console.log("Done speaking");
            body.style.background = "#141414"
        };

        //Speech error
        speechText.onerror = e => {
            console.error("Something went wrong");
        };

        //Selected Voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");

        //Loop through voices
        voices.forEach(voice =>{
            if(voice.name === selectedVoice){
                speechText.voice = voice;
            }
        })

        //Set Pitch and Rate
        speechText.rate = rate.value;
        speechText.pitch = pitch.value;

        //Speak
        synth.speak(speechText)
    }
}

//Event Listeners
textForm.addEventListener("submit", (e) => {
    e.preventDefault();
    speak();
    textInput.blur()
})

rate.addEventListener("change", (e) => {
    console.log("Hello");
    rateValue.textContent = rate.value
})

pitch.addEventListener("change", (e) => {
    console.log("Hello");
    pitchValue.textContent = pitch.value
})

voiceSelect.addEventListener("change", (e) => {
    speak()
})
