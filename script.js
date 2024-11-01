// Import Firebase app and database from firebaseConfig.js
import { db } from "./firebaseConfig.js";

// Screen elements
const screens = {
  registration: document.getElementById("registration-screen"),
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

// User data
let currentUser = null;
const topics = ["Funny Cats", "Awkward Dates", "Weird Dreams", "Bad Jokes"];
const newTopics = ["Food Fails", "Sibling Rivalries", "Breakup Stories", "Parenting Struggles"];
const comedians = ["Comedian A", "Comedian B", "Comedian C", "Comedian D"];

// Chart instances
let topicChartInstance, comedianVoteChartInstance, newTopicChartInstance, newComedianVoteChartInstance;

// Functions
function switchScreen(hide, show) {
  if (hide && show) {
    hide.classList.remove("active");
    hide.classList.add("hidden");
    show.classList.remove("hidden");
    show.classList.add("active");
  } else {
    console.error("Switch screen error: Element not found", hide, show);
  }
}

// Register user
function registerUser(username) {
  currentUser = username;
  console.log("User registered:", currentUser);
}

// Event listeners
document.getElementById("register-button").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  if (username) {
    registerUser(username);
    alert("Registered successfully as " + username);
    switchScreen(screens.registration, screens.welcome); // Move to Welcome Screen
  } else {
    alert("Please enter a valid name.");
  }
});

document.getElementById("start-button").addEventListener("click", () => switchScreen(screens.welcome, screens.instructions));

document.getElementById("play-button").addEventListener("click", () => {
  loadOptions("topic-options", topics, "topic");
  switchScreen(screens.instructions, screens.topicSelection);
});

document.getElementById("proceed-to-comedian-selection").addEventListener("click", () => {
  loadOptions("comedian-options", comedians, "comedian");
  switchScreen(screens.topicChart, screens.comedianSelection);
});

document.getElementById("generate-new-topics").addEventListener("click", () => {
  loadOptions("new-topic-options", newTopics, "newTopic");
  switchScreen(screens.comedianVoteChart, screens.generateNewTopics);
});

document.getElementById("proceed-to-new-topic-chart").addEventListener("click", () => {
  switchScreen(screens.generateNewTopics, screens.newTopicChart);
});

document.getElementById("proceed-to-new-comedian-selection").addEventListener("click", () => {
  loadOptions("new-comedian-options", comedians, "newComedian");
  switchScreen(screens.newTopicChart, screens.newComedianSelection);
});

document.getElementById("end-game-button").addEventListener("click", () => {
  switchScreen(screens.newComedianVoteChart, screens.welcome);
  alert("Game ended. Restart to play again.");
});

// Helper Functions
function loadOptions(containerId, options, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => castVote(type, option));
    container.appendChild(button);
  });
}

// Voting functionality
function castVote(type, choice) {
  if (!currentUser) {
    alert("Please register before voting.");
    return;
  }
  db.ref(`votes/${type}`).push({ user: currentUser, choice: choice });
}

// Real-time voting updates
db.ref("votes/topic").on("value", (snapshot) => {
  const votes = countVotes(snapshot);
  topicChartInstance = updateChartWithVotes(topicChartInstance, document.getElementById("topic-chart"), votes, "Topic Votes");
});

db.ref("votes/comedian").on("value", (snapshot) => {
  const votes = countVotes(snapshot);
  comedianVoteChartInstance = updateChartWithVotes(comedianVoteChartInstance, document.getElementById("comedian-vote-chart"), votes, "Comedian Votes");
});

db.ref("votes/newTopic").on("value", (snapshot) => {
  const votes = countVotes(snapshot);
  newTopicChartInstance = updateChartWithVotes(newTopicChartInstance, document.getElementById("new-topic-chart"), votes, "New Topic Votes");
});

db.ref("votes/newComedian").on("value", (snapshot) => {
  const votes = countVotes(snapshot);
  newComedianVoteChartInstance = updateChartWithVotes(newComedianVoteChartInstance, document.getElementById("new-comedian-vote-chart"), votes, "Final Comedian Votes");
});

// Count votes helper
function countVotes(snapshot) {
  const voteCounts = {};
  snapshot.forEach((childSnapshot) => {
    const vote = childSnapshot.val();
    voteCounts[vote.choice] = (voteCounts[vote.choice] || 0) + 1;
  });
  return voteCounts;
}

// Update chart helper
function updateChartWithVotes(chartInstance, canvas, data, label) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  if (chartInstance) chartInstance.destroy();
  return new Chart(canvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: values,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 1
      }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });
}
