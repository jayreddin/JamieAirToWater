if (filteredData.length > 0) {
  const resultsText = filteredData.map(item => 
      `<div class="error-code">Error Code: ${item.errorCode}</div>
      <div class="line"></div>
      <div class="meaning">Meaning: ${item.errorMeaning}</div>
      <div class="line"></div>
      <div class="solution">Solution: ${item.possibleSolution}</div>`
  ).join('<br>'); // Add space between different results
  resultsBox.innerHTML = resultsText; // Use innerHTML to render formatted text
} else {
  resultsBox.innerHTML = 'No results found.';
}