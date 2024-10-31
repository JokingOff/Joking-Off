function showResults() {
  const ctx = resultsChart.getContext("2d");

  // Delay rendering to ensure the canvas is visible when creating/updating the chart
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
