document.addEventListener("DOMContentLoaded", () => {
    const screens = {
        welcome: document.getElementById("welcome-screen"),
        voting: document.getElementById("voting-screen"),
        contestants: document.getElementById("contestant-screen"),
        results: document.getElementById("results-screen")
    };

    const startBtn = document.getElementById("start-btn");
    const topicsList = document.getElementById("topics-list");
    const submitTopicBtn = document.getElementById("submit-topic-btn");
    const contestantsList = document.getElementById("contestants-list");
    const showResultsBtn = document.getElementById("show-results-btn");
    const resultsList = document.getElementById("results-list");

    const topics = ["Bad Breakups", "Embarrassing Moments", "Weird Phobias", "Unlucky Days"];
    const contestants = ["Alice", "Bob", "Charlie", "Diana"];
    const punishments = ["Mouse Trap", "Mystery Box", "Rubber Band Snap", "Ice Bucket"];

    // Function to switch between screens
    function showScreen(screen) {
        Object.values(screens).forEach(s => s.classList.remove("active"));
        screen.classList.add("active");
    }

    // Welcome Screen -> Voting Screen
    startBtn.addEventListener("click", () => {
        populateTopics();
        showScreen(screens.voting);
    });

    // Populate topics dynamically
    function populateTopics() {
        topicsList.innerHTML = "";
        topics.forEach(topic => {
            const button = document.createElement("button");
            button.classList.add("topic-btn");
            button.textContent = topic;
            topicsList.appendChild(button);
        });
    }

    // Voting Screen -> Contestant Screen
    submitTopicBtn.addEventListener("click", () => {
        populateContestants();
        showScreen(screens.contestants);
    });

    // Populate contestants dynamically
    function populateContestants() {
        contestantsList.innerHTML = "";
        contestants.forEach(name => {
            const div = document.createElement("div");
            div.textContent = name;
            contestantsList.appendChild(div);
        });
    }

    // Contestant Screen -> Results Screen
    showResultsBtn.addEventListener("click", () => {
        displayResults();
        showScreen(screens.results);
    });

    // Display results dynamically
    function displayResults() {
        resultsList.innerHTML = "";
        const randomPunishment = punishments[Math.floor(Math.random() * punishments.length)];
        resultsList.textContent = `Punishment: ${randomPunishment}`;
    }
});
