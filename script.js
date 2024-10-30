document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcome-screen");
  const instructionsScreen = document.getElementById("instructions-screen");
  const votingScreen = document.getElementById("voting-screen");
  const namesScreen = document.getElementById("names-screen");
  const resultsScreen = document.getElementById("results-screen");
  const punishmentScreen = document.getElementById("punishment-screen");

  const startButton = document.getElementById("start-button");
  const playButton = document.getElementById("play-button");
  const backToInstructions = document.getElementById("back-to-instructions");
  const backToTopics = document.getElementById("back-to-topics");
  const nextPunishment = document.getElementById("next-punishment");
  const restartButton = document.getElementById("restart-button");

  const topicOptions = document.getElementById("topic-options");
  const nameOptions = document.getElementById("name-options");
  const punishmentOptions = document.getElementById("punishment-options");
  const resultsChart = document.getElementById("results-chart");

  const topics = [
    ["Funny Cats", "Awkward Dates", "Weird Dreams", "Bad Jokes"],
    ["Childhood Memories", "Workplace Fails", "Pet Peeves", "Online Dating"],
    ["Parental Advice", "Food Fails", "Travel Mishaps", "Awkward Family Moments"],
    ["Unusual Hobbies", "Overrated Movies", "Dating Disasters", "Tech Troubles"],
    ["Fashion Faux Pas", "Celebrity Gossip", "Home Improvement Fails", "Holiday Horror Stories"],
    ["Random Trivia", "Conspiracy Theories", "Office Jokes", "Pet Stories"],
    ["School Memories", "Awkward Silence", "Food Combinations", "Hobbies"]
  ];

  const comedians = ["Comedian A", "Comedian B", "Comedian C", "Comedian D"];
  const punishments = ["Mouse Trap Mystery Box", "Rubber Band Pull", "Silly Costume", "Singing in Public"];

  let currentTopicSetIndex = 0;
  let votes = [0, 0, 0, 0];

  // Start Button Click Handler
  startButton.addEventListener("click", () => {
    switchScreen(welcomeScreen, instructionsScreen);
  });

  // Play Button Click Handler
  playButton.addEventListener("click", () => {
    loadTopics();
    switchScreen(instructionsScreen, votingScreen);
  });

  // Back to Instructions Handler
  backToInstructions.addEventListener("click", () => {
    switchScreen(votingScreen, instructionsScreen);
  });

  // Back to Topics Handler
  backToTopics.addEventListener("click", () => {
    switchScreen(namesScreen, votingScreen);
  });

  // Voting Button Click Handler for Topics
  topicOptions.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      loadNames();
      switchScreen(votingScreen, namesScreen);
    }
  });

  // Voting Button Click Handler for Names
  nameOptions.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const selectedName = e.target.textContent;
      votes.fill(0); // Reset votes for this round
      switchScreen(namesScreen, resultsScreen);
      showResults();
    }
  });

  // Next Punishment Button Handler
  nextPunishment.addEventListener("click", () => {
    loadPunishments();
    switchScreen(resultsScreen, punishmentScreen);
  });

  // Restart Button Click Handler
  restartButton.addEventListener("click", () => {
    currentTopicSetIndex = (currentTopicSetIndex + 1) % topics.length;
    switchScreen(punishmentScreen, votingScreen);
    loadTopics();
  });

  // Function to switch screens
  function switchScreen(hideScreen, showScreen) {
    hideScreen.classList.remove("active");
    hideScreen.classList.add("hidden");
    showScreen.classList.remove("hidden");
    showScreen.classList.add("active");
  }

  // Load Topics
  function loadTopics() {
    topicOptions.innerHTML = "";
    const currentTopics = topics[currentTopicSetIndex];
    currentTopics.forEach(topic => {
      const button = document.createElement("button");
      button.classList.add("topic-btn");
      button.textContent = topic;
      topicOptions.appendChild(button);
    });
  }

  // Load Names
  function loadNames() {
    nameOptions.innerHTML = "";
    comedians.forEach(name => {
      const button = document.createElement("button");
      button.classList.add("name-btn");
      button.textContent = name;
      nameOptions.appendChild(button);
    });
  }

  // Show Results
  function showResults() {
    const ctx = resultsChart.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: comedians,
        datasets: [{
          label: '# of Votes',
          data: votes,
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Load Punishments
  function loadPunishments() {
    punishmentOptions.innerHTML = "";
    punishments.forEach(punishment => {
      const button = document.createElement("button");
      button.classList.add("punishment-btn");
      button.textContent = punishment;
      punishmentOptions.appendChild(button);
    });
  }
});
document.addEventListener("DOMContentLoaded", function() {
  const welcomeScreen = document.getElementById("welcome-screen");
  const instructionsScreen = document.getElementById("instructions-screen");
  const votingScreen = document.getElementById("voting-screen");
  const namesScreen = document.getElementById("names-screen");
  const resultsScreen = document.getElementById("results-screen");
  const punishmentScreen = document.getElementById("punishment-screen");

  const startButton = document.getElementById("start-button");
  const playButton = document.getElementById("play-button");
  const backToInstructions = document.getElementById("back-to-instructions");
  const backToTopics = document.getElementById("back-to-topics");
  const nextPunishment = document.getElementById("next-punishment");
  const restartButton = document.getElementById("restart-button");

  const topicOptions = document.getElementById("topic-options");
  const nameOptions = document.getElementById("name-options");
  const punishmentOptions = document.getElementById("punishment-options");
  const resultsChart = document.getElementById("results-chart");

  const titleFontSelect = document.getElementById('title-font');
  const sloganFontSelect = document.getElementById('slogan-font');
  const buttonFontSelect = document.getElementById('button-font');

  titleFontSelect.addEventListener('change', function() {
    document.querySelector('.show-title').style.fontFamily = this.value;
  });

  sloganFontSelect.addEventListener('change', function() {
    document.querySelector('.tagline').style.fontFamily = this.value;
  });

  buttonFontSelect.addEventListener('change', function() {
    document.querySelector('#start-button').style.fontFamily = this.value;
    document.querySelector('#play-button').style.fontFamily = this.value;
  });

  const topics = [
    ["Funny Cats", "Awkward Dates", "Weird Dreams", "Bad Jokes"],
    ["Childhood Memories", "Workplace Fails", "Pet Peeves", "Online Dating"],
    ["Parental Advice", "Food Fails", "Travel Mishaps", "Awkward Family Moments"],
    ["Unusual Hobbies", "Overrated Movies", "Dating Disasters", "Tech Troubles"],
    ["Fashion Faux Pas", "Celebrity Gossip", "Home Improvement Fails", "Holiday Horror Stories"],
    ["Random Trivia", "Conspiracy Theories", "Office Jokes", "Pet Stories"],
    ["School Memories", "Awkward Silence", "Food Combinations", "Hobbies"]
  ];

  const comedians = ["Comedian A", "Comedian B", "Comedian C", "Comedian D"];
  const punishments = ["Mouse Trap Mystery Box", "Rubber Band Pull", "Silly Costume", "Singing in Public"];

  let currentTopicSetIndex = 0;
  let votes = [0, 0, 0, 0];

  // Start Button Click Handler
  startButton.addEventListener("click", () => {
    switchScreen(welcomeScreen, instructionsScreen);
  });

  // Play Button Click Handler
  playButton.addEventListener("click", () => {
    loadTopics();
    switchScreen(instructionsScreen, votingScreen);
  });

  // Back to Instructions Handler
  backToInstructions.addEventListener("click", () => {
    switchScreen(votingScreen, instructionsScreen);
  });

  // Back to Topics Handler
  backToTopics.addEventListener("click", () => {
    switchScreen(namesScreen, votingScreen);
  });

  // Voting Button Click Handler for Topics
  topicOptions.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      loadNames();
      switchScreen(votingScreen, namesScreen);
    }
  });

  // Voting Button Click Handler for Names
  nameOptions.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const selectedName = e.target.textContent;
      votes.fill(0); // Reset votes for this round
      switchScreen(namesScreen, resultsScreen);
      showResults();
    }
  });

  // Next Punishment Button Handler
  nextPunishment.addEventListener("click", () => {
    loadPunishments();
    switchScreen(resultsScreen, punishmentScreen);
  });

  // Restart Button Click Handler
  restartButton.addEventListener("click", () => {
    currentTopicSetIndex = (currentTopicSetIndex + 1) % topics.length;
    switchScreen(punishmentScreen, votingScreen);
    loadTopics();
  });

  // Function to switch screens
  function switchScreen(hideScreen, showScreen) {
    hideScreen.classList.remove("active");
    hideScreen.classList.add("hidden");
    showScreen.classList.remove("hidden");
    showScreen.classList.add("active");
  }

  // Load Topics
  function loadTopics() {
    topicOptions.innerHTML = "";
    const currentTopics = topics[currentTopicSetIndex];
    currentTopics.forEach(topic => {
      const button = document.createElement("button");
      button.classList.add("topic-btn");
      button.textContent = topic;
      topicOptions.appendChild(button);
    });
  }

  // Load Names
  function loadNames() {
    nameOptions.innerHTML = "";
    comedians.forEach(name => {
      const button = document.createElement("button");
      button.classList.add("name-btn");
      button.textContent = name;
      nameOptions.appendChild(button);
    });
  }

  // Show Results
  function showResults() {
    const ctx = resultsChart.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: comedians,
        datasets: [{
          label: '# of Votes',
          data: votes,
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Load Punishments
  function loadPunishments() {
    punishmentOptions.innerHTML = "";
    punishments.forEach(punishment => {
      const button = document.createElement("button");
      button.classList.add("punishment-btn");
      button.textContent = punishment;
      punishmentOptions.appendChild(button);
    });
  }
});document.querySelectorAll('.nav-btn').forEach(button => {
  button.addEventListener('click', () => {
    const currentScreen = document.querySelector('.screen.active');
    const screens = Array.from(document.querySelectorAll('.screen'));
    const currentIndex = screens.indexOf(currentScreen);
    let nextIndex;

    if (button.classList.contains('next-btn')) {
      nextIndex = currentIndex + 1;
    } else if (button.classList.contains('back-btn')) {
      nextIndex = currentIndex - 1;
    }

    if (nextIndex >= 0 && nextIndex < screens.length) {
      currentScreen.classList.remove('active');
      currentScreen.classList.add('hidden');
      screens[nextIndex].classList.remove('hidden');
      screens[nextIndex].classList.add('active');
    }
  });
});git revert 7d5b6ae
git revert 0768cd0
git revert 4956d3f
