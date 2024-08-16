// // script.js
// // Check if the browser supports the Web Speech API
// if (!('speechSynthesis' in window)) {
//     alert("Sorry, your browser does not support text-to-speech functionality.");
// } else {
//     // Select elements from the page
//     const textInput = document.getElementById('textInput');
//     const speakBtn = document.getElementById('speakBtn');
//     const stopBtn = document.getElementById('stopBtn');

//     // Create a new SpeechSynthesisUtterance object
//     const speech = new SpeechSynthesisUtterance();

//     // When the "Speak" button is clicked
//     speakBtn.addEventListener('click', () => {
//         // Set the text of the speech object to the value of the textarea
//         speech.text = textInput.value;
//         // Start speaking
//         window.speechSynthesis.speak(speech);
//     });

//     // When the "Stop" button is clicked
//     stopBtn.addEventListener('click', () => {
//         // Stop speaking
//         window.speechSynthesis.cancel();
//     });
// }




// script.js
// Check if the browser supports the Web Speech API
if (!('speechSynthesis' in window)) {
    alert("Sorry, your browser does not support text-to-speech functionality.");
} else {
    // Select elements from the page
    const textInput = document.getElementById('textInput');
    const speakBtn = document.getElementById('speakBtn');
    const stopBtn = document.getElementById('stopBtn');
    const toggleVoiceBtn = document.getElementById('toggleVoiceBtn');

    // Create a new SpeechSynthesisUtterance object
    const speech = new SpeechSynthesisUtterance();
    let voices = [];
    let isMaleVoice = true; // Variable to track the current voice gender

    // Function to set the voice based on the isMaleVoice variable
    function setVoice() {
        // Filter voices for the preferred gender
        const preferredVoices = voices.filter(voice => {
            return isMaleVoice ? voice.name.includes("Male") : voice.name.includes("Female");
        });

        // Set the speech voice to the first preferred voice found or default
        speech.voice = preferredVoices.length > 0 ? preferredVoices[0] : voices[0];
    }

    // Load voices and set the default voice
    function loadVoices() {
        voices = window.speechSynthesis.getVoices();
        setVoice();
    }

    // Trigger the loadVoices function when voices are loaded or changed
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Toggle voice gender when the "Toggle Voice" button is clicked
    toggleVoiceBtn.addEventListener('click', () => {
        isMaleVoice = !isMaleVoice; // Toggle the voice gender
        setVoice(); // Set the new voice
    });

    // When the "Speak" button is clicked
    speakBtn.addEventListener('click', () => {
        speech.text = textInput.value; // Set the text of the speech object
        window.speechSynthesis.speak(speech); // Start speaking
    });

    // When the "Stop" button is clicked
    stopBtn.addEventListener('click', () => {
        window.speechSynthesis.cancel(); // Stop speaking
    });
}

