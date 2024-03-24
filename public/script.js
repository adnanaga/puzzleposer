const wordleOpts = ["🟩", "🟨", "⬜️"];
const wordleOptsFail = ["🟩", "🟨", "⬛️"];
let connectionsOpts = ["🟦", "🟪", "🟩", "🟨"];
let connectionsTotal = ["🟨🟨🟨🟨", "🟩🟩🟩🟩", "🟦🟦🟦🟦", "🟪🟪🟪🟪"];

let funLines = [
  "Shhh your friends will never know 🤫",
  "For when you’re having a X/6 day",
  "For when the mini feels like a big one",
  "For when your starter word wasn’t so good",
  "For when the connections are all two letter words", 
  "For when Wyna's going on about birds again"
]

const strandsOpts = ["🔵"];

let guessCount = 0;
let answer = "";

let wordleNum = 1003;
let connectionsNum = 281; //This is wrong
let strandsNum = 15;

var date1 = new Date("03/19/2024");
var date2 = new Date();

// Getter stuff

// Get all radio buttons by their name

// WORDLE
const radioButtons = document.querySelectorAll('input[name="guesses"]');

const wordleGuessBox = document.getElementById("wordleGuesses");

const wordleGenerated = document.getElementById("wordleGenerated");
const wordleGuesses = document.getElementById("wordleGuesses"); // Get the button from the page

// Connections
const connectionsGenerated = document.getElementById("connectionsGenerated");
const connectionsGen = document.getElementById("connectionsGen"); // Get the button from the page
const connectionsOptions = document.getElementById("connectionsOptions"); //Get the connections boxes

// Strands
const strandsGenerated = document.getElementById("strandsGenerated");
const strandsGen = document.getElementById("strandsGen"); // Get the button from the page
const hintOptions = document.getElementById("hintOptions"); // Get the button from the page
const spangramOptions = document.getElementById("strandsOptions"); // Get the button from the page

// Mini
const miniGenerated = document.getElementById("miniGenerated");
const miniGen = document.getElementById("miniGen"); // Get the button from the page

// Share Buttons
const description = document.getElementById("description"); // Get the button from the page
const share = document.getElementById("share"); // Get the button from the page
const shareSheet = document.getElementById("shareSheet");
const startAgain = document.getElementById("startAgain"); // Get the button from the page

const funLine = document.getElementById("funline");


window.addEventListener("load", (event) => {
  if(funLine){
    funLine.innerHTML = funLines[Math.floor(Math.random()*funLines.length)];
  }
});
// -------------------------------------- Generate Code ------------------------------------------------------//

// Add event listener to each radio button
radioButtons.forEach(function (radioButton) {
  radioButton.addEventListener("change", function () {
    // Check which radio button is selected
    if (this.checked) {
      guessCount = this.value;
      if (wordleGuesses) {
        share.innerHTML = "<b>Share</b>";
        wordleGenerator(guessCount);
      }
      if (connectionsOptions) {
        // connectionsGen.style.opacity = "100%";
        // connectionsGen.disabled = false;
        // console.log(guessCount);
        share.innerHTML = "<b>Share</b>";
        connectionsGenerator(guessCount);
      }

      if (miniGen) {
        // miniGen.style.opacity = "100%";
        // miniGen.disabled = false;
        share.innerHTML = "<b>Share</b>";
        miniGenerator(guessCount);
      }
    }
  });
  radioButton.addEventListener("click", function () {
    // Check which radio button is selected
    if (this.checked) {
      guessCount = this.value;
      if (wordleGuesses) {
        wordleGenerator(guessCount);
      }
      if (connectionsOptions) {
        // connectionsGen.style.opacity = "100%";
        // connectionsGen.disabled = false;
        // console.log(guessCount);
        connectionsGenerator(guessCount);
      }
    }
  });
});

// -------------------------------------- Wordle Code ------------------------------------------------------//

if (wordleGuesses) {
  wordleGenerator(3);
}

function wordleGenerator(num) {
  answer = "";
  // console.log(num)
  if (num == 1) {
    answer = "🟩🟩🟩🟩🟩";
  } else if (num == 7) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        answer = answer + wordleOptsFail[getRandomInt(3)];
      }
      answer = answer + "<br>";
    }
  } else {
    for (let i = 1; i < num; i++) {
      for (let j = 0; j < 5; j++) {
        answer = answer + wordleOpts[getRandomInt(3)];
      }
      if (i == num - 1) {
        answer = answer + "<br>" + "🟩🟩🟩🟩🟩";
      } else {
        answer = answer + "<br>";
      }
    }
  }
  let wordleNum = dateDiff("wordle");
  if (num == 7) {
    wordleGenerated.innerHTML =
      "Wordle " + wordleNum + " X/6" + "<br>" + answer;
  } else {
    wordleGenerated.innerHTML =
      "Wordle " + wordleNum + " " + num + "/6" + "<br><br>" + answer;
  }

  // description.innerHTML = `Click the share button below to copy the result`;
}

if(share){

  share.addEventListener("click", async () => {
    // feature detecting navigator.canShare() also implies
    // the same for the navigator.share()
    // if (!navigator.canShare) {
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
      console.log(`Your browser doesn't support the Web Share API.`);
      if (connectionsGenerated) {
        navigator.clipboard
          .writeText(br2nl(connectionsGenerated.innerHTML))
          .then(() => {
            share.innerHTML = "<b>Copied!</b>";
          })
          .catch((e) => {
            console.log(e);
            alert("something went wrong");
          });
      } else if (wordleGuesses) {
        navigator.clipboard
          .writeText(br2nl(wordleGenerated.innerHTML))
          .then(() => {
            share.innerHTML = "<b>Copied!</b>";
          })
          .catch((e) => {
            console.log(e);
            alert("Couldn't copy for some reason");
          });
      } else if (strandsGenerated) {
        navigator.clipboard
          .writeText(br2nl(strandsGenerated.innerHTML))
          .then(() => {
            share.innerHTML = "<b>Copied!</b>";
          })
          .catch((e) => {
            console.log(e);
            alert("Couldn't copy for some reason");
          });
      } else if (miniGenerated) {
        navigator.clipboard
          .writeText(
            `https://www.nytimes.com/crosswords/game/mini ` +
              br2nl(miniGenerated.innerHTML)
          )
          .then(() => {
            share.innerHTML = "<b>Copied!</b>";
          })
          .catch((e) => {
            console.log(e);
            alert("Couldn't copy for some reason");
          });
      }
    } else {
      if (connectionsGenerated) {
        console.log(connectionsGenerated)
        try {
          await navigator.share({
            title: "Results",
            text: br2nl(connectionsGenerated.innerHTML),
          });
          share.innerHTML = "Shared!";
        } catch (error) {
          // share.innerHTML = `Error: ${error.message}`;
        }
      } else if (wordleGenerated) {
        try {
          await navigator.share({
            title: "Results",
            text: br2nl(wordleGenerated.innerHTML),
          });
          share.innerHTML = "Shared!";
        } catch (error) {
          // share.innerHTML = `Error: ${error.message}`;
        }
      } else if (miniGenerated) {
        try {
          await navigator.share({
            title: "Results",
            text:  `https://www.nytimes.com/crosswords/game/mini ` +
            br2nl(miniGenerated.innerHTML),
          });
          share.innerHTML = "Shared!";
        } catch (error) {
          // share.innerHTML = `Error: ${error.message}`;
        }
      }
    }
  });

}

// --------------------------------------------------------------------------------------------//

// -------------------------------------- Connections Code ------------------------------------------------------//

if (connectionsGenerated) {
  let connTypeArray = ["purple", "blue", "green", "yellow"];
  let randomInt = getRandomIntIncl(3);
  connectionsGenerator(connTypeArray[randomInt]);
  document.getElementById(connTypeArray[randomInt]).checked = true;
}

function connectionsGenerator(color) {
  connectionsOpts = ["🟦", "🟪", "🟩", "🟨"];
  connectionsTotal = ["🟨🟨🟨🟨", "🟩🟩🟩🟩", "🟦🟦🟦🟦", "🟪🟪🟪🟪"];
  // console.log(color);
  answer = "";

  if (color == "purple") {
    let arr = ["🟨🟨🟨🟨", "🟩🟩🟩🟩", "🟦🟦🟦🟦", "🟪🟪🟪🟪"];
    arr.splice(3, 1);
    let newArr = shuffle(arr);
    // console.log(newArr);
    answer = "🟪🟪🟪🟪" + "<br>";
    for (let i = 0; i < 3; i++) {
      if (i == 2) {
        answer = answer + arr[i];
      } else {
        answer = answer + arr[i] + "<br>";
      }
    }
  }

  if (color == "blue") {
    let arr = connectionsTotal;
    answer = arr.splice(getRandomIntIncl(2), 1) + "<br>";
    let newArr = shuffle(arr);
    for (let i = 0; i < 3; i++) {
      if (i == 2) {
        answer = answer + arr[i];
      } else {
        answer = answer + arr[i] + "<br>";
      }
    }
  }

  if (color == "green") {
    let arr = shuffle(connectionsTotal);
    let mistakeIndexes = [0, 1, 2];
    let mistakeNum = getRandomIntIncl(1) + 1; // number of mistakes, 1 or 2
    for (let i = 0; i <= mistakeIndexes.length - mistakeNum; i++) {
      mistakeIndexes.splice(getRandomIntIncl(mistakeIndexes.length - 1), 1);
    }
    let freeColours = [...connectionsOpts];
    for (let i = 0; i < arr.length; i++) {
      if (mistakeIndexes.includes(i)) {
        let mistake = "";
        for (let j = 0; j < 4; j++) {
          let colourIndex = getRandomIntIncl(freeColours.length - 1);
          mistake += freeColours[colourIndex];
          if (j == 3 && connCheckSame(mistake)) {
            // console.log("accidental win");
            let newColIndex = getRandomIntIncl(freeColours.length - 1);
            while (colourIndex == newColIndex) {
              newColIndex = getRandomIntIncl(freeColours.length - 1);
            }
            let arr = Array.from(mistake);
            arr.pop();
            mistake = arr.join("");
            // console.log(mistake);
            mistake += freeColours[newColIndex];
          }
        }
        answer += mistake + "<br>";
      }
      if (i == arr.length-1) {
        answer = answer + arr[i];
      } else {
        answer = answer + arr[i] + "<br>";
      }
      freeColours.splice(freeColours.indexOf(Array.from(arr[i])[0]), 1);
    }
  }

  if (color == "yellow") {
    let winArr = shuffle(connectionsTotal);
    let winIndexes = [0, 1, 2];
    let winNum = getRandomIntIncl(1) + 1; // number of wins, 1 or 2
    for (let i = 0; i < winIndexes.length - winNum; i++) {
      winIndexes.splice(getRandomIntIncl(winIndexes.length - 1), 1);
    }
    let freeColours = [...connectionsOpts];
    // console.log(winIndexes);
    for (let i = 0; i < 4; i++) {
      if (winIndexes.includes(i)) {
        answer += winArr[i] + "<br>";
        freeColours.splice(freeColours.indexOf(Array.from(winArr[i])[0]), 1);
      }
      let mistake = "";
      for (let j = 0; j < 4; j++) {
        let colourIndex = getRandomIntIncl(freeColours.length - 1);
        mistake += freeColours[colourIndex];
        if (j == 3 && connCheckSame(mistake)) {
          // console.log("accidental win");
          let newColIndex = getRandomIntIncl(freeColours.length - 1);
          while (colourIndex == newColIndex) {
            newColIndex = getRandomIntIncl(freeColours.length - 1);
          }
          let arr = Array.from(mistake);
          arr.pop();
          mistake = arr.join("");
          // console.log(mistake);
          mistake += freeColours[newColIndex];
        }
      }
      if (i == 3) {
        answer = answer + mistake;
      } else {
        answer = answer + mistake + "<br>";
      }
    }
  }

  let connectionsNum = dateDiff("connections");
  if (connectionsGenerated) {
    // connectionsGenerated.style.display = "initial";
    shareSheet.style.display = "flex";
    connectionsGenerated.innerHTML =
      "Connections" + "<br>" + "Puzzle #" + connectionsNum + "<br>" + answer;
  }

  // description.innerHTML = "Click the share button below to copy the result";
}

// --------------------------------------------------------------------------------------------//

// -------------------------------------- Strands Code ------------------------------------------------------//

if (strandsGen) {
  const spangramDescription = document.getElementById("spangramDescription");

  // Detect clicks on the button
  strandsGen.onclick = function () {
    hintOptions.style.display = "none";
    spangramOptions.style.display = "none";
    spangramDescription.style.display = "none";
    strandsGen.style.display = "none";
    share.style.display = "initial";
    const slider1 = document.getElementById("hintSelect").value;
    const slider2 = document.getElementById("spangramSelect").value;
    spangramGenerator(slider1, slider2);
  };
}

function spangramGenerator(hints, spangram) {
  console.log(hints, spangram);

  for (let i = 0; i < 8; i++) {
    if (i == spangram) {
      answer = answer + "🟡";
    } else {
      answer = answer + strandsOpts[0];
    }
  }

  answer = replacer(answer, hints, "💡");
  answer = answer.slice(0, 8) + "<br>" + answer.slice(8);

  let strandsNum = dateDiff("strands");
  console.log(answer);
  shareSheet.style.display = "flex";
  strandsGenerated.style.display = "initial";
  strandsGenerated.innerHTML = "Strands #" + strandsNum + "<br>" + answer;

  description.innerHTML = "Click the share button below to copy the result";
}

// --------------------------------------------------------------------------------------------//

// -------------------------------------- Mini Code ------------------------------------------------------//

if (miniGenerated) {
  miniGenerator(2);
}

if (miniGenerated) {
  const miniDescription = document.getElementById("description");
  const miniTimes = document.getElementById("miniTimes");
  const crosswordTime = document.getElementById("crosswordTime");

  const timeSlider = document.getElementById("timeSelect");
  timeSlider.addEventListener("input", function () {
    const timeVal = document.getElementById("timeSelect").value;
    share.innerHTML = "<b>Share</b>";
    miniGenerator(timeVal);
  });
  // timeSlider.addEventListener('change', function() {
  //   const timeVal = document.getElementById("timeSelect").value;
  //   miniGenerator(timeVal);
  // });

  //   // Detect clicks on the button
  //   miniGen.onclick = function () {
  //     //get the actual input value
  //     const timeVal = document.getElementById("timeSelect").value;
  //     miniGenerator(timeVal);

  //     // Hide the Slider and the time description
  //     miniGen.style.display = "none";
  //     miniTimes.style.display = "none";
  //     crosswordTime.style.display = "none";

  //     //Change the description to something about sharing
  //     // miniDescription.innerHTML =
  //     //   "Click the share button below to copy the result";
  //   };
}

function miniGenerator(time) {
  console.log(time);

  if (time == 0) {
    answer = generateRandomTimeFormat(6, 10);
  } else if (time == 1) {
    answer = generateRandomTimeFormat(10, 30);
  } else if (time == 2) {
    answer = generateRandomTimeFormat(30, 120);
  } else if (time == 3) {
    answer = generateRandomTimeFormat(120, 60 * 5);
  } else if (time == 4) {
    answer = generateRandomTimeFormat(60 * 10, 60 * 20);
  }

  shareSheet.style.display = "flex";
  // miniGenerated.style.display = "initial";

  miniGenerated.innerHTML =
    "I solved the " +
    date2.toLocaleDateString() +
    " New York Times Mini Crossword in " +
    answer +
    "!";

  // description.innerHTML = "Click the share button below to copy the result";
}

// --------------------------------------------------------------------------------------------//

//Helper functions

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function dateDiff(game) {
  var difference = date2.getTime() - date1.getTime();
  var days = Math.ceil(difference / (1000 * 3600 * 24));
  if (game == "wordle") {
    return (wordleNum + days).toLocaleString();
  } else if (game == "connections") {
    return connectionsNum + days;
  } else if (game == "strands") {
    console.log(strandsNum);
    console.log(days);
    return strandsNum + days;
  }
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function br2nl(str) {
  return str.replace(/<br\s*\/?>/gm, "\n");
}

function getRandomIntIncl(max) {
  // incl stands for inclusive
  // min = Math.ceil(min);
  max = Math.floor(max);
  // return Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.floor(Math.random() * (max + 1));
}

function connCheckSame(string) {
  let arr = Array.from(string);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] != arr[i]) {
      return false;
    }
  }
  return true;
}

const replacer = (str, i, rep) => {
  if (!str) return; // Do nothing if no string passed
  const arr = [...str]; // Convert String to Array
  const len = arr.length;
  i = Math.min(Math.abs(i), len); // Fix to Positive and not > len
  while (i) {
    const r = ~~(Math.random() * len);
    if (Array.isArray(arr[r])) continue; // Skip if is array (not a character)
    arr[r] = [rep]; // Insert an Array with the rep char
    --i;
  }
  return arr.flat().join("");
};

function generateRandomTimeFormat(minimumSeconds, maximumSeconds) {
  const seconds =
    Math.floor(Math.random() * (maximumSeconds - minimumSeconds + 1)) +
    minimumSeconds;
  // Convert to minutes if seconds exceed 59
  let minutes = 0;
  let remainingSeconds = seconds;
  if (seconds >= 60) {
    minutes = Math.floor(seconds / 60);
    remainingSeconds = seconds % 60;
  }

  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${minutes}:${formattedSeconds}`;
}
