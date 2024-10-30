/* General Styles */
body {
  font-family: Arial, sans-serif;
  background-color: #e0f7fa; /* Light Blue */
  margin: 0;
  padding: 0;
  text-align: center;
}

/* Screen Styles */
.screen {
  display: none;
  padding: 50px 20px;
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.screen.active {
  display: block;
}

/* Background Image */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the entire background */
  z-index: -1; /* Send to back */
}

/* Title and Tagline */
.show-title, .tagline {
  color: white; /* Set text color to white */
}

.show-title {
  font-size: 60px;
  margin-bottom: 10px;
}

.tagline {
  font-size: 24px;
  margin-bottom: 30px;
  line-height: 1.5; /* Adjust line height for better readability */
}

/* Buttons */
button {
  background-color: #0288d1;
  color: white;
  border: none;
  padding: 15px 30px;
  margin: 10px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  position: absolute; /* Enable absolute positioning for the button */
  top: 50%; /* Default top position */
  left: 50%; /* Default left position */
  transform: translate(-50%, -50%); /* Center the button by default */
}

button:hover {
  background-color: #0277bd;
}

/* Voting Options */
.options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.topic-btn, .name-btn, .punishment-btn {
  margin: 10px;
  font-size: 18px;
}

/* Results List */
#results-list {
  margin-top: 20px;
  font-size: 22px;
  color: #01579b;
}

/* Chart Styles */
canvas {
  max-width: 600px;
  margin: auto;
}/* Options Layout */
.options {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns layout */
  gap: 20px; /* Space between buttons */
  justify-items: center; /* Center items horizontally */
  margin-top: 20px;
}
