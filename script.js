let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    populateVoiceList();
};

function populateVoiceList() {
    if (voices.length > 0) {
        voiceSelect.innerHTML = ''; 
        voices.forEach((voice, i) => {
            const option = new Option(voice.name, i);
            voiceSelect.appendChild(option);
        });
       
        speech.voice = voices[0];
    }
}

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    
    const selectedVoiceIndex = voiceSelect.selectedIndex;
    if (selectedVoiceIndex >= 0 && selectedVoiceIndex < voices.length) {
        speech.voice = voices[selectedVoiceIndex];
    }
    try {
        window.speechSynthesis.speak(speech);
    } catch (error) {
        console.error('Speech synthesis error:', error);
    }
});
