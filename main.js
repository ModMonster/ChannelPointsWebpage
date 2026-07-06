function playSound(path) {
  var audio = new Audio(path);
  audio.play();
  event.stopPropagation();
}

function copyCommand(reward) {
  navigator.clipboard.writeText("!redeem " + reward);
  showSnackBar();
}

snackBarVisible = false;

function showSnackBar() {
  if (!snackBarVisible) {
    var sb = document.getElementById("snackbar");
    snackBarVisible = true;
    sb.className = "show";

    setTimeout(() => {
      sb.className = sb.className.replace("show", "");
      snackBarVisible = false;
    }, 2000);
  }
}

function generateTTSCommand() {
  var input = document.getElementById("tts-input");
  var output = document.getElementById("tts-output");
  var characterLimit = document.getElementById("tts-character-limit");

  output.innerHTML = "!redeem tts " + input.value;

  // character limit
  var limit = 188 - input.value.length;
  characterLimit.innerHTML = limit;
  
  if (limit <= 0) {
    characterLimit.classList.add("text-warning");
  } else {
    characterLimit.classList.remove("text-warning");
  }
}

function copyTTSCommand() {
  var input = document.getElementById("tts-input").value;
  copyCommand("tts " + input);
}

function clearTTS() {
  document.getElementById("tts-input").value = "";
  generateTTSCommand();
}

function search() {
  // Declare variables
  var input = document.getElementById("search");
  var filter = input.value.toUpperCase();
  var rewardGrids = document.getElementsByClassName("reward-grid");

  // Loop through all cards and hide those who don't match the search query
  var showError = true;

  for (var i = 0; i < rewardGrids.length; i++) {
    var grid = rewardGrids.item(i);
    var allHidden = true;

    for (var reward of grid.children) {
      if (reward.tagName != "DIV") { continue; }

      var title = reward.querySelector(".card-title").innerHTML;
      if (title.toUpperCase().includes(filter)) {
        reward.style.display = "";
        allHidden = false;
      } else {
        reward.style.display = "none";
      }
    }

    if (allHidden) {
      grid.querySelector("h2").style.display = "none";
    } else {
      grid.querySelector("h2").style.display = "";
      showError = false;
    }
  }

  if (showError) {
    document.getElementById("alert-search-fail").style.display = "";
  } else {
    document.getElementById("alert-search-fail").style.display = "none";
  }
}

function checkDarkMode() {
  var theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  document.documentElement.setAttribute('data-bs-theme', theme);
}

checkDarkMode();