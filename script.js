document.addEventListener("DOMContentLoaded", () => {
  const screens = {
    welcome: document.getElementById("welcome-screen"),
    instructions: document.getElementById("instructions-screen"),
    voting: document.getElementById("voting-screen"),
    names: document.getElementById("names-screen"),
    results: document.getElementById("results-screen"),
    punishment: document.getElementById("punishment-screen")
  };

  const startButton = document.getElementById("start-button");
  const playButton = document.getElementById("play-button");
  const nextPunishment = document.getElementById("next-punishment");
  const restartButton = document.getElementById("restart-button");

  const topicOptions = document.getElementById("topic-options");
  const nameOptions = document.getElementById("name-options");
  const punishmentOptions = document.getElementById("punishment-options");
  const resultsChart = document.getElementById("results-chart");

  const topics = [
    ["Funny Cats", "Awkward Dates", "Weird Dreams", "Bad Jokes"],
    ["Childhood Memories", "Workplace Fails", "Pet Peeves", "Online Dating"]
  ];
  const comedians = ["Comedian A", "Comedian B", "Comedian C", "Comedian D"];
  const punishments = ["Mouse Trap Mystery Box", "Rubber Band Pull", "Silly Costume", "Singing in Public"];

  let currentTopicSetIndex = 0;
  let votes = [0, 0, 0, 0]; // Track votes for each comedian
  let resultsChartInstance; // Holds the chart instance

  // Screen switching function
  function switchScreen(hide, show) {
    hide.classList.remove("active");
    hide.classList.add("hidden");
    show.classList.remove("hidden");
    show.classList.add("active");
  }

  // Start button
  startButton.addEventListener("click", () => {
    console.log("Start button clicked");  // Debugging check
    switchScreen(screens.welcome, screens.instructions);
  });

  // Play button
  playButton.addEventListener("click", () => {
    loadTopics();
    switchScreen(screens.instructions, screens.voting);
  });

  // Next punishment button
  nextPunishment.addEventListener("click", () => {
    loadPunishments();
    switchScreen(screens.results, screens.punishment);
  });

  // Restart button
  restartButton.addEventListener("click", () => {
    currentTopicSetIndex = (currentTopicSetIndex + 1) % topics.length;
    votes.fill(0); // Reset votes
    switchScreen(screens.punishment, screens.voting);
    loadTopics();
  });

  // Load topics for voting
  function loadTopics() {
    topicOptions.innerHTML = "";
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
    nameOptions.innerHTML = "";
    comedians.forEach((name, index) => {
      const button = document.createElement("button");
      button.classList.add("name-btn");
      button.textContent = name;
      button.addEventListener("click", () => {
        votes[index]++;
        switchScreen(screens.names, screens.results);
        showResults();
      });
      nameOptions.appendChild(button);
    });
  }

  // Show results chart with slight delay for rendering
  function showResults() {
    const ctx = resultsChart.getContext("2d");

    setTimeout(() => {
      if (resultsChartInstance) {
        // Update chart data if it already exists
        resultsChartInstance.data.datasets[0].data = votes;
        resultsChartInstance.update();
      } else {
        // Create chart only if it doesn’t already exist
        resultsChartInstance = new Chart(ctx, {
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
              y: { beginAtZero: true }
            }
          }
        });
      }
    }, 100); // Delay to ensure the screen switch is complete
  }
});
