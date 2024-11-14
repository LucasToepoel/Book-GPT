// Purpose: Fetches the composite prompts from the server and displays them on the page
const FirstPrompt = document.getElementById('FirstPrompt');
const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const text3 = document.getElementById('text3');
const SecondPrompt = document.getElementById('SecondPrompt');
const ThirdPrompt = document.getElementById('ThirdPrompt');

fetch('http://localhost:8000/authors')
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            if (data[0]) {
                FirstPrompt.innerHTML = data[0].prompt;
                text1.innerHTML = data[0].text;
            }
            if (data[0]) {
                text2.innerHTML = data[0].text;
            }
            if (data[0]) {
                text3.innerHTML = data[0].text;
            }
            if (data[0]) {
                SecondPrompt.innerHTML = data[0].prompt;
            }
            if (data[0]) {
                ThirdPrompt.innerHTML = data[0].prompt;
            }
        }
    });