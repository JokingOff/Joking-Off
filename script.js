document.addEventListener("DOMContentLoaded", () => {
  // Screen elements
  const screens = {
    welcome: document.getElementById("welcome-screen"),
    instructions: document.getElementById("instructions-screen"),
    voting: document.getElementById("voting-screen"),
    names: document.getElementById("names-screen"),
    results: document.getElementById("results-screen"),
    punishment: document.getElementById("punishment-screen"),
    generateTopics: document.getElementById("generate-topics-screen"),
    voteComedian: document.getElementById("vote-comedian-screen")
  };

  // Button elements
  const startButton = document.getElementById("start-button");
  const playButton = document.getElementById("play-button");
  const nextPunishmentButton = document.getElementById("next-punishment");
  const restartButton = document.getElementById("restart-button");
  const generateTopicsButton = document.getElementById("generate-topics-button");
  const proceedToVoteButton = document.getElementById("proceed-to-vote-button");

  // Options and results elements
  const topicOptions = document.getElementById("topic-options");
  const nameOptions = document.getElementById("name-options");
  const punishmentOptions = document.getElementById("punishment-options");
  const resultsChart = document.getElementById("results-chart");
  const newTopicOptions = document.getElementById("new-topic-options");
  const comedianVoteOptions = document.getElementById("comedian-vote-options");

  // Game data
  const topics = [
    ["Funny Cats", "Awkward Dates", "Weird Dreams", "Bad Jokes"],
    ["Childhood Memories", "Workplace Fails", "Pet Peeves", "Online Dating"]
  ];
  const comedians = ["Comedian A", "Comedian B", "Comedian C", "Comedian D"];
  const punishments = ["Mouse Trap Mystery Box", "Rubber Band Pull", "Silly Costume", "Singing in Public"];
  
  const possibleTopics = [
    "Funny Cats", "Awkward Dates", "Weird Dreams", "Bad Jokes",
    "Childhood Memories", "Workplace Fails", "Pet Peeves", "Online Dating",
    "Embarrassing Moments", "High School Days", "Vacation Mishaps", "Food Fails",
    "Sibling Rivalries", "First Jobs", "Breakup Stories", "Parenting Struggles"
  ];

  let currentTopicSetIndex = 0;
  let votes = [0, 0, 0, 0];
  let resultsChartInstance;

  // Function to switch screens
  function switchScreen(hideScreen, showScreen) {
    if (hideScreen && showScreen) {
      hideScreen.classList.remove("active");
      hideScreen.classList.add("hidden");
      showScreen.classList.remove("hidden");
      showScreen.classList.add("active");
    } else {
      console.error("Switch screen failed: screens not found", hideScreen, showScreen);
    }
  }

  // Event listeners for navigation buttons
  startButton?.addEventListener("click", () => {
    switchScreen(screens.welcome, screens.instructions);
  });

  playButton?.addEventListener("click", () => {
    loadTopics();
    switchScreen(screens.instructions, screens.voting);
  });

  nextPunishmentButton?.addEventListener("click", () => {
    loadPunishments();
    switchScreen(screens.results, screens.punishment);
  });

  restartButton?.addEventListener("click", () => {
    currentTopicSetIndex = (currentTopicSetIndex + 1) % topics.length;
    votes.fill(0); // Reset votes for new round
    switchScreen(screens.punishment, screens.voting);
    loadTopics(); // Reload topics for the new round
  });

  // Load topics for voting screen
  function loadTopics() {
    topicOptions.innerHTML = ""; // Clear existing topics
    topics[currentTopicSetIndex].forEach(topic => {
      const button = document.createElement("button");
      button.classList.add("topic-btn");
      button.textContent = topic;
      button.addEventListener("click", () => {
        loadNames();
        switchScreen(screens.voting, screens.names);
      });
      topicOptions.appendChild(button);
    });
  }

  // Load comedian names for voting
  function loadNames() {
    nameOptions.innerHTML = ""; // Clear existing names
    comedians.forEach((name, index) => {
      const button = document.createElement("button");
      button.classList.add("name-btn");
      button.textContent = name;
      button.addEventListener("click", () => {
        votes[index]++;
        switchScreen(screens.names, screens.results);
        showResults(); // Display updated results
      });
      nameOptions.appendChild(button);
    });
  }

  // Show results chart
  function showResults() {
    const ctx = resultsChart.getContext("2d");

    // Update or create the chart instance
    if (resultsChartInstance) {
      resultsChartInstance.data.datasets[0].data = votes;
      resultsChartInstance.update();
    } else {
      resultsChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: comedians,
          datasets: [{
            label: '# of Votes',
            data: votes,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }

  // Load punishments
  function loadPunishments() {
    punishmentOptions.innerHTML = ""; // Clear existing punishments
    punishments.forEach(punishment => {
      const button = document.createElement("button");
      button.classList.add("punishment-btn");
      button.textContent = punishment;
      punishmentOptions.appendChild(button);
    });
  }

  // Generate 4 random topics
  function generateRandomTopics() {
    const selectedTopics = [];
    while (selectedTopics.length < 4) {
      const topic = possibleTopics[Math.floor(Math.random() * possibleTopics.length)];
      if (!selectedTopics.includes(topic)) {
        selectedTopics.push(topic);
      }
    }
    return selectedTopics;
  }

  // Load new topics on Page 6
  function loadNewTopics() {
    newTopicOptions.innerHTML = ""; // Clear existing topics
    const topics = generateRandomTopics();
    topics.forEach(topic => {
      const topicDiv = document.createElement("div");
      topicDiv.classList.add("topic-item");
      topicDiv.textContent = topic;
      newTopicOptions.appendChild(topicDiv);
    });
  }

  // Generate new topics on button click
  generateTopicsButton.addEventListener("click", () => {
    loadNewTopics();
  });

  // Proceed to comedian voting on Page 7
  proceedToVoteButton.addEventListener("click", () => {
    loadComedianVoting();
    switchScreen(screens.generateTopics, screens.voteComedian);
  });

  // Load comedian voting options for Page 7
  function loadComedianVoting() {
    comedianVoteOptions.innerHTML = ""; // Clear existing comedian options
    comedians.forEach((comedian, index) => {
      const button = document.createElement("button");
      button.classList.add("comedian-vote-btn");
      button.textContent = comedian;
      button.addEventListener("click", () => {
        votes[index]++;
        switchScreen(screens.voteComedian, screens.results); // Move to results screen
        showResults(); // Display the updated results
      });
      comedianVoteOptions.appendChild(button);
    });
  }
});
