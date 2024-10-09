const API_URL = "https://api.openai.com/v1/chat/completions"
const API_KEY = 'test'


const PromptInput = document.getElementById('promptInput');
const generateBtn = document.getElementById('generateBtn');
const StopBtn = document.getElementById('StopeBtn');
const resultText = document.getElementById('resultText');

const generate = async () => {
    if (!PromptInput.value) {
        alert('Please ask me anything. Im here to help')
        return
    }

    generateBtn.disable = true;
    resultText.innerHTML = "Generating....";
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: PromptInput.value }],
            }),

        });
        const data = await response.json();
        console.log(data.choices[0].message.content);
        resultText.innerText = data.choices[0].message.content
    } catch (error) {
        resultText.innerText = 'error occured while generating.'
        console.log('ERROR:', error)

    } finally {
        generate.disabled = false

    }
}

generateBtn.addEventListener("click", generate);
PromptInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        generate();
    }
})