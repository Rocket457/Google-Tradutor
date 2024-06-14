document.addEventListener('DOMContentLoaded', () => {
    const endpoint = 'https://api.funtranslations.com/translate';
    
    const userInput = document.getElementById('userInput');
    const outputText = document.getElementById('outputText');
    const translateButton = document.getElementById('translateButton');
    const languageSelect = document.getElementById('languageSelect');

    // Função para traduzir texto usando a API FunTranslations
    async function translateText() {
        const selectedLanguage = languageSelect.value.toLowerCase().replace(" ", "-");
        const textToTranslate = encodeURIComponent(userInput.value);

        try {
            const response = await fetch(`${endpoint}/${selectedLanguage}.json?text=${textToTranslate}`);

            if (!response.ok) {
                throw new Error('Erro na requisição');
            }

            const data = await response.json();
            const translatedText = data.contents.translated;

            // Atualizar o texto de saída com a tradução
            outputText.textContent = translatedText;
        } catch (error) {
            if (error.code === 429){
                console.error('tenta dnv depois seu bosta', error.message);
                outputText.textContent = 'Erro ao traduzir. Por favor, tente novamente mais tarde.'+ error.message;
            }
            console.error('Erro ao traduzir texto:', error);
            outputText.textContent = 'Erro ao traduzir. Por favor, tente novamente mais tarde.';
        }
    }
    // Event listener para o botão de traduzir
    translateButton.addEventListener('click', translateText);
});
