const searchInput = document.getElementById('search');
const resultsBox = document.getElementById('results');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase(); // Normalize to lower case

    fetch('/JSON/DeDietrich.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Check if the expected keys exist
            const errorCodes = data["Error Codes"] || [];
            const troubleshooting = data["Troubleshooting"] || [];

            // Filter error codes with both full code and numeric parts
            const filteredErrorCodes = errorCodes.filter(item => {
                const codeMatch = item.errorCode.toLowerCase().includes(searchTerm);
                const numericMatch = item.errorCode.replace(/[^\d]/g, '').includes(searchTerm.replace(/[^\d]/g, ''));
                return codeMatch || numericMatch;
            });

            // Filter troubleshooting
            const filteredTroubleshooting = troubleshooting.filter(item => {
                const codeMatch = item.errorCode.toLowerCase().includes(searchTerm);
                const numericMatch = item.errorCode.replace(/[^\d]/g, '').includes(searchTerm.replace(/[^\d]/g, ''));
                return codeMatch || numericMatch;
            });

            // Combine results
            const combinedResults = [...filteredErrorCodes, ...filteredTroubleshooting];

            if (combinedResults.length > 0) {
                const resultsText = combinedResults.map(item => 
                    `<div class="error-code">Error Code: ${item.errorCode}</div>
                    <div class="line"></div>
                    <div class="Contents">Meaning: ${item.errorMeaning}</div>
                    <div class="line"></div>
                    <div class="Measure">Solution: ${item.possibleSolution}</div>`
                ).join('<br>'); // Add space between different results
                resultsBox.innerHTML = resultsText; // Use innerHTML to render formatted text
            } else {
                resultsBox.innerHTML = 'No results found.';
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing JSON:', error);
            resultsBox.innerHTML = `Error loading data: ${error.message}`;
        });
});