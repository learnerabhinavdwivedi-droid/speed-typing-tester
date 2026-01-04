const paragraphs = [
  "In a world driven by speed and precision, the ability to type swiftly and accurately has become more than just a technical skill—it’s a reflection of focus, rhythm, and mental clarity. Each keystroke carries intention, each word a measure of momentum, and every sentence typed under pressure reveals the quiet discipline of the mind behind the fingers. Whether you're composing code, crafting content, or simply communicating, your typing speed becomes a silent metric of your readiness to engage, create, and respond. This typing test isn’t just a game of numbers; it’s a mirror of your cognitive flow, your attention to detail, and your ability to stay composed under time constraints. As the seconds tick down and the words unfold, you’re not just racing against the clock—you’re refining your reflexes, sharpening your awareness, and building a skill that silently powers every digital interaction you’ll ever have."
];

const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field"); // fixed name
const tryAgainBtn = document.querySelector(".content button");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span"); // fixed selector
const cpmTag = document.querySelector(".cpm span");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[ranIndex].split("").forEach(char => {
    let span = `<span>${char}</span>`; // fixed template literal
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");

  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];

  if (charIndex < characters.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000); // fixed syntax
      isTyping = true;
    }

    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }

    characters.forEach(span => span.classList.remove("active"));
    if (charIndex < characters.length) {
      characters[charIndex].classList.add("active");
    }

    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    clearInterval(timer);
    inpField.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpmTag.innerText = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  } else {
    clearInterval(timer);
  }
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = 0;
  isTyping = false;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
}
const lofiAudio = document.getElementById("lofiAudio");
const musicToggle = document.getElementById("musicToggle");

musicToggle.addEventListener("click", () => {
  if (lofiAudio.paused) {
    lofiAudio.play();
    musicToggle.innerText = "⏸ Pause Music";
  } else {
    lofiAudio.pause();
    musicToggle.innerText = "🎵 Play Music";
  }
});


loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
