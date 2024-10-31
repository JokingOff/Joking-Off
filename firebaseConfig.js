// firebaseConfig.js

// Import Firebase functions as modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6gnN_NW-UbP1L-K1v2kIzrL1dOx8TPc8",
  authDomain: "jokingoffvotingapp.firebaseapp.com",
  projectId: "jokingoffvotingapp",
  storageBucket: "jokingoffvotingapp.firebasestorage.app",
  messagingSenderId: "594652598461",
  appId: "1:594652598461:web:058b9ffeff0f648783e7d4",
  measurementId: "G-4N3HP48YJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; // Export Firebase app and analytics if needed
