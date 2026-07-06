const REWARDS = [
  {cmd: "144p", name: "144p", desc: "RTX off", cost: 875},
  {cmd: "barrelroll", name: "Do a Barrel Roll", desc: "Wheeeeee!", cost: 500},
  {cmd: "drugs", name: "Drugs", desc: "Mario had too many mushrooms", cost: 875},
  {cmd: "fisheye", name: "Fisheye", desc: "Mmmmm funny camera", cost: 625},
  {cmd: "miichannel", name: "Mii Channel", desc: "Very distracting. Very effective.", cost: 1125},
  {cmd: "muted", name: "Muted", desc: "Mutes my mic for 10 seconds", cost: 2500},
  {cmd: "nicethrow", name: "Nice Throw", desc: "Strike!", cost: 625},
  {cmd: "punch", name: "Punch Me In The Face", desc: "Rude >:(", cost: 250},
  {cmd: "superstar", name: "Super Star", desc: "Wahooooooo!", cost: 500},
  {cmd: "tacticalnuke", name: "Tactical Nuke", desc: "TACTICAL NUKE, INCOMING!", cost: 500},
  {cmd: "tts", name: "Text to Speech", desc: "Get your message read by TTS!", cost: 350},
  {cmd: "what", name: "WHAT", desc: "HEIHHH?!?!", cost: 625},
  {cmd: "youdied", name: "You Died", desc: "RIP", cost: 875},
]

const SFX_REWARDS = [
  {cmd: "applause", name: "Applause", desc: "You did it! Hooray! Incredible job!", cost: 75},
  {cmd: "bouncer", name: "Bouncer", desc: "I can't believe you've done this.", cost: 150},
  {cmd: "bruh", name: "Bruh", desc: "Bruh", cost: 75},
  {cmd: "drinkwater", name: "Drink Water, Idiot!", desc: "Stay hydrated.", cost: 150},
  {cmd: "fart", name: "Fart", desc: "Really immature", cost: 75},
  {cmd: "helicopter", name: "Helicopter Parents", desc: "Be careful out there, buddy!", cost: 150},
  {cmd: "knock", name: "Knock Knock", desc: "That one realistic knock sound", cost: 150},
  {cmd: "laughtrack", name: "Laugh Track", desc: "AHAHAHAHAHAH!!", cost: 75},
  {cmd: "metalpipe", name: "Metal Pipe Falling", desc: "Ow my eardrums", cost: 150},
  {cmd: "fnaf", name: "Music Box", desc: "very calming, not scary", cost: 150},
  {cmd: "narutokun", name: "Naruto-Kun", desc: "Nolan forced me to make this", cost: 690},
  {cmd: "nostop", name: "No, Stop!", desc: "Me when the societies are hidden", cost: 250},
  {cmd: "nice", name: "Noice", desc: "Nice.", cost: 75},
  {cmd: "ohbanana", name: "OHHH BANANA", desc: "OHHHHHHHHHHHH BANANA", cost: 150},
  {cmd: "quack", name: "Quack", desc: "Quaxly??", cost: 50},
  {cmd: "sadtrombone", name: "Sad Trombone", desc: "Womp womp", cost: 75},
  {cmd: "bong", name: "Taco Bell Bong", desc: "Taco Bell moment", cost: 75},
  {cmd: "youlousy", name: "YOU LOUSY!!", desc: "Waluigi calls me lousy :(", cost: 150},
]

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

function generateRewards() {
  const rewardContainer = document.getElementById("reward-container");
  rewardContainer.innerHTML += REWARDS.map(reward => `<div class="card-parent col-md-6 col-lg-4 col-xl-3 my-2">
        <div class="card" ${
        reward.cmd === "tts"
          ? 'data-bs-toggle="modal" data-bs-target="#ttsModal"'
          : `onclick="copyCommand('${reward.cmd}')"`
        }>
          <img class="card-img-top ratio-1x1" src="img/main/${reward.cmd}.png" alt="Reward image">
          <div class="card-body">
            <h4 class="card-title">${reward.name}</h4>
            <h6 class="card-subtitle mb-2 text-body-secondary"><i class="fa fa-coins fa-fw"></i> ${reward.cost} points</h6>
            <p class="card-text reward-description" data-replace="Click to copy command"><span>${reward.desc} off</span></p>
          </div>
        </div>
      </div>`).join("");

  const sfxContainer = document.getElementById("sfx-container");
  sfxContainer.innerHTML += SFX_REWARDS.map(reward => `<div class="card-parent col-md-6 col-lg-4 col-xl-3 my-2">
        <div class="card" onclick="copyCommand('${reward.cmd}')">
          <img class="card-img-top ratio-1x1" src="img/sfx/${reward.cmd}.png" alt="Reward image">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h4 class="card-title">${reward.name}</h4>
              <i onclick="playSound('sfx/${reward.cmd}.mp3')" role="button" class="fa fa-volume-low fa-fw float-right my-2" data-bs-toggle="tooltip" title="Preview sound"></i>
            </div>
            <h6 class="card-subtitle mb-2 text-body-secondary"><i class="fa fa-coins fa-fw"></i> ${reward.cost} points</h6>
            <p class="card-text reward-description" data-replace="Click to copy command"><span>${reward.desc}</span></p>
          </div>
        </div>
      </div>`).join("");
}

generateRewards();