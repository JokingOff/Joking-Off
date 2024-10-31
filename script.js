document.addEventListener("DOMContentLoaded", () => {
  // Screen elements
  const screens = {
    welcome: document.getElementById("welcome-screen"),
    instructions: document.getElementById("instructions-screen"),
    topicSelection: document.getElementById("topic-selection-screen"),
    topicChart: document.getElementById("topic-chart-screen"),
    comedianSelection: document.getElementById("comedian-selection-screen"),
    comedianVoteChart: document.getElementById("comedian-vote-chart-screen"),
    generateNewTopics: document.getElementById("generate-new-topics-screen"),
    newTopicChart: document.getElementById("new-topic-chart-screen"),
    newComedianSelection: document.getElementById("new-comedian-selection-screen"),
    newComedianVoteChart: document.getElementById("new-comedian-vote-chart-screen")
  };

  // Button elements
  const startButton = document.getElementById("start-button");
  const playButton = document.getElementById("play-button");
  const proceedToComedianSelection = document.getElementById("proceed-to-comedian-selection");
  const generateNewTopicsButton = document.getElementById("generate-new-topics");
  const proceedToNewTopicChartButton = document.getElementById("proceed-to-new-topic-chart");
  const proceedToNewComedianSelection = document.getElementById("proceed-to-new-comedian-selection");
  const endGameButton = document.getElementById("end-game-button");

  // Option containers
  const topicOptions = document.getElementById("topic-options");
  const comedianOptions = document.getElementById("comedian-options");
  const newTopicOptions = document.getElementById("new-topic-options");
  const newComedianOptions = document.getElementById("new-comedian-options");

  // Charts
  const topicChartCanvas = document.getElementById("topic-chart");
  const comedianVoteChartCanvas = document.getElementById("comedian-vote-chart");
  const newTopicChartCanvas = document.getElementById("new-topic-chart");
  const newComedianVoteChartCanvas = document.getElementById("new-comedian-vote-chart");

  // Game data
  const topics = ["Funny Cats", "Awkward Dates", "Weird Dreams", "Bad Jokes"];
  const newTopics = ["Food Fails", "Sibling Rivalries", "Breakup Stories", "Parenting Struggles"];
  const comedians = ["Comedian A", "Comedian B", "Comedian C", "Comedian D"];
  const votes = [0, 0, 0, 0];
  let topicChartInstance, comedianVoteChartInstance, newTopicChartInstance, newComedianVoteChartInstance;

  // Functions
  function switchScreen(hide, show) {
    hide.classList.remove("active");
    hide.classList.add("hidden");
    show.classList.remove("hidden");
    show.classList.add("active");
  }

  function loadOptions(container, options, callback) {
    container.innerHTML = "";
    options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", () => callback(index));
      container.appendChild(button);
    });
  }

  function showChart(chartInstance, canvas, labels, data, label) {
    if (chartInstance) chartInstance.destroy();
    return new Chart(canvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1
        }]
      },
      options: { scales: { y: { beginAtZero: true } } }
    });
  }

  // Event Listeners
  startButton.addEventListener("click", () => switchScreen(screens.welcome, screens.instructions));
  
  playButton.addEventListener("click", () => {
    loadOptions(topicOptions, topics, (index) => {
      votes.fill(0); // Reset votes
      votes[index]++; // Record chosen topic
      switchScreen(screens.topicSelection, screens.topicChart);
      topicChartInstance = showChart(topicChartInstance, topicChartCanvas, topics, votes, "Topic Votes");
    });
    switchScreen(screens.instructions, screens.topicSelection);
  });

  // **FIXED: Navigate to Comedian Selection screen from Topic Chart screen**
  proceedToComedianSelection.addEventListener("click", () => {
    loadOptions(comedianOptions, comedians, (index) => {
      votes.fill(0); // Reset votes
      votes[index]++; // Record vote for comedian
      switchScreen(screens.comedianSelection, screens.comedianVoteChart);
      comedianVoteChartInstance = showChart(comedianVoteChartInstance, comedianVoteChartCanvas, comedians, votes, "Comedian Votes");
    });
    switchScreen(screens.topicChart, screens.comedianSelection);
  });

  generateNewTopicsButton.addEventListener("click", () => {
    loadOptions(newTopicOptions, newTopics, (index) => {
      votes.fill(0); // Reset votes
      votes[index]++; // Record chosen topic
      switchScreen(screens.generateNewTopics, screens.newTopicChart);
      newTopicChartInstance = showChart(newTopicChartInstance, newTopicChartCanvas, newTopics, votes, "New Topic Votes");
    });
  });

  proceedToNewTopicChartButton.addEventListener("click", () => {
    switchScreen(screens.newTopicChart, screens.newComedianSelection);
    loadOptions(newComedianOptions, comedians, (index) => {
      votes.fill(0); // Reset votes
      votes[index]++; // Record vote for new comedian
      switchScreen(screens.newComedianSelection, screens.newComedianVoteChart);
      newComedianVoteChartInstance = showChart(newComedianVoteChartInstance, newComedianVoteChartCanvas, comedians, votes, "Final Comedian Votes");
    });
  });

  endGameButton.addEventListener("click", () => switchScreen(screens.newComedianVoteChart, screens.welcome));
});
