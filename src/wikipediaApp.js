const form = document.querySelector(".form");
async function searchWikipedia(search) {
	const API = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=&srlimit=20&srsearch=${search}`;

	const response = await fetch(API);
	if (!response.ok) {
		throw Error(response.statusText);
	}
	const json = await response.json;
	return json;
}

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const inputValue = document.querySelector(".input-text").value;
	const search = inputValue.trim();
	try {
		const results = await searchWikipedia(search);
		displayResults(results);
	} catch (err) {
		console.log(err);
		alert("Failed to search");
	}
});

function displayResults(results) {
	results.query.search.forEach((result) => {
		const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

		searchResults.insertAdjacentHTML(
			`<div class="result-item">
            <h3 class="result-title">
              <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
            </h3>
            <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a>
            <span class="result-snippet">${result.snippet}</span><br>
          </div>`
		);
	});
}
