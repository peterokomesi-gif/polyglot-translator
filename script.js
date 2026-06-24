const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");

translateBtn.addEventListener("click", async () => {

  const inputText = document.getElementById("inputText").value;
  const sourceLang = document.getElementById("sourceLang").value;
  const targetLang = document.getElementById("targetLang").value;
  const outputText = document.getElementById("outputText");

  if(inputText === "") {
    alert("Please enter text");
    return;
  }

  const url =
    `https://api.mymemory.translated.net/get?q=${inputText}&langpair=${sourceLang}|${targetLang}`;

  try {

    const response = await fetch(url);

    const data = await response.json();

    outputText.value = data.responseData.translatedText;

  } catch(error) {

    outputText.value = "Translation failed.";

    console.log(error);
  }
});

copyBtn.addEventListener("click", () => {

  const outputText = document.getElementById("outputText");

  navigator.clipboard.writeText(outputText.value);

  alert("Copied!");
});