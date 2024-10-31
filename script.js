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
  let votes = [0, 0, 0, 0];
  let resultsChartInstance;

  function switchScreen(hide, show) {
    hide.classList.remove("active");
    hide.classList.add("hidden");
    show.classList.remove("hidden");
    show.classList.add("active");
    console.log(`Switched from ${hide.id} to ${show.id}`);
  }

  startButton.addEventListener("click", () => {
    console.log("Start button clicked");
    switchScreen(screens.welcome, screens.instructions);
  });

  playButton.addEventListener("click", () => {
    loadTopics();
    switchScreen(screens.instructions, screens.voting);
  });

  nextPunishment.addEventListener("click", () => {
    loadPunishments();
    switchScreen(screens.results, screens.punishment);
  });

  restartButton.addEventListener("click", () => {
    currentTopicSetIndex = (currentTopicSetIndex + 1) % topics.length;
    votes.fill(0);
    switchScreen(screens.punishment, screens.voting);
    loadTopics();
  });

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

  function loadNames() {
    nameOptions.innerHTML = "";
    comedians.forEach((name, index) => {
      const button = document.createElement("button");
      button.classList.add("name-btn");
      button.textContent = name;
      button.addEventHere’s the completed `script.js` code, with updated chart visibility settings and debugging logs included:

```javascript
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
  let votes = [0, 0, 0, 0];
  let resultsChartInstance;

  function switchScreen(hide, show) {
    hide.classList.remove("active");
    hide.classList.add("hidden");
    show.classList.remove("hidden");
    show.classList.add("active");
    console.log(`Switched from ${hide.id} to ${show.id}`);
  }

  startButton.addEventListener("click", () => {
    console.log("Start button clicked");
    switchScreen(screens.welcome, screens.instructions);
  });

  playButton.addEventListener("click", () => {
    loadTopics();
    switchScreen(screens.instructions, screens.voting);
  });

  nextPunishment.addEventListener("click", () => {
    loadPunishments();
    switchScreen(screens.results, screens.punishment);
  });

  restartButton.addEventListener("click", () => {
    currentTopicSetIndex = (currentTopicSetIndex + 1) % topics.length;
    votes.fill(0);
    switchScreen(screens.punishment, screens.voting);
    loadTopics();
  });

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

  function showResults() {
    const ctx = resultsChart.getContext("2d");

    setTimeout(() => {
      if (resultsChartInstance) {
        resultsChartInstance.data.datasets[0].data = votes;
        resultsChartInstance.update();
        console.log("Chart updated with votes:", votes);
      } else {
        resultsChartInstance = new Chart(ctx, {
          type: "bar",
          data: {
            labels: comedians,
            datasets: [{
              label: '# of Votes',
              data: votes,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Black bars for contrast
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
        console.log("Chart created with votes:", votes);
      }
    }, 100); // Delay to ensure the screen switch is complete
  }
});
