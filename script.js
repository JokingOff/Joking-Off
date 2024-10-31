// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

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

// User and voting data
let currentUser = null;
const topics = ["Funny Cats", "Awkward Dates", "Weird Dreams", "Bad Jokes"];
const newTopics = ["Food Fails", "Sibling Rivalries", "Breakup Stories", "Parenting Struggles"];
const comedians = ["Comedian A", "Comedian B", "Comedian C", "Comedian D"];

// Chart instances
let topicChartInstance, comedianVoteChartInstance, newTopicChartInstance, newComedianVoteChartInstance;

// Functions
function switchScreen(hide, show) {
  hide.classList.remove("active");
  hide.classList.add("hidden");
  show.classList.remove("hidden");
  show.classList.add("active");
}

function registerUser(username) {
  currentUser = username;
  console.log("User registered:", currentUser); // Debugging log
}

function castVote(type, choice) {
  if (!currentUser) {
    alert("Please register before voting.");
    return;
  }

  db.ref(`votes/${type}`).push({
    user: currentUser,
    choice: choice
  });
}

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

function countVotes(snapshot) {
  const voteCounts = {};
  snapshot.forEach((childSnapshot) => {
    const vote = childSnapshot.val();
    if (voteCounts[vote.choice]) {
      voteCounts[vote.choice]++;
    } else {
      voteCounts[vote.choice] = 1;
    }
  });
  return voteCounts;
}

// Event listeners
document.getElementById("register-button").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  if (username) {
    registerUser(username);
    alert("Registered successfully as " + username);
    switchScreen(screens.registration, screens.welcome);  // Move to Welcome Screen after registration
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
