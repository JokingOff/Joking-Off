document.addEventListener("DOMContentLoaded", () => {
  // Screen elements
  const screens = {
    welcome: document.getElementById("welcome-screen"),
    instructions: document.getElementById("instructions-screen"),
    voting: document.getElementById("voting-screen"),
    names: document.getElementById("names-screen"),
    results: document.getElementById("results-screen"),
    punishment: document.getElementById("punishment-screen")
  };

  // Button elements
  const startButton = document.getElementById("start-button");
  const playButton = document.getElementById("play-button");
  const nextPunishmentButton = document.getElementById("next-punishment");
  const restartButton = document.getElementById("restart-button");

  // Options and results elements
  const topicOptions = document.getElementById("topic-options");
  const nameOptions = document.getElementById("name-options");
  const punishmentOptions = document.getElementById("punishment-options");
  const resultsChart = document.getElementById("results-chart");

  // Game data
  const topics = [
    ["Funny Cats", "Awkward Dates", "Weird Dreams", "Bad Jokes"],
    ["Childhood Memories", "Workplace Fails", "Pet Peeves", "Online Dating"]
  ];
  const comedians = ["Comedian A", "Comedian B", "Comedian C", "Comedian D"];
  const punishments = ["Mouse Trap Mystery Box", "Rubber Band Pull", "Silly Costume", "Singing in Public"];

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

  // Function to load topics for voting
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

  // Function to load comedian names for voting
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

  // Function to show results chart
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

  // Function to load punishments for the punishment screen
  function loadPunishments() {
    punishmentOptions.innerHTML = ""; // Clear existing punishments
    punishments.forEach(punishment => {
      const button = document.createElement("button");
      button.classList.add("punishment-btn");
      button.textContent = punishment;
      punishmentOptions.appendChild(button);
    });
  }
});
