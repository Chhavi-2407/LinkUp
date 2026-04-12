const results = document.getElementById("results");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");

let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

function applyFilters() {
    let data = [...savedJobs];

    const searchValue = searchInput.value.toLowerCase().trim();
    const filterValue = filterType.value;
    if (searchValue) {
        data = data.filter(job =>
            job.title.toLowerCase().includes(searchValue) ||
            job.company.toLowerCase().includes(searchValue)
        );
    }

    if (filterValue !== "all") {
        data = data.filter(job => {
            const isArticle = job.category.toLowerCase().includes("article");
            return filterValue === "event" ? isArticle : !isArticle;
        });
    }

    displaySaved(data);
}

function displaySaved(data) {
    results.innerHTML = "";

    if (data.length === 0) {
        results.innerHTML = `
            <div class="empty-state full-width">
                <h2>📌 No saved items</h2>
                <p>Start exploring and save opportunities</p>
            </div>
        `;
        return;
    }


    data.forEach(job => {
        const card = document.createElement("div");
        card.classList.add("card");

        const isArticle = job.category.toLowerCase().includes("article");

        card.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>${job.company}</strong></p>
            <p>${job.category}</p>

            <span class="tag">
                ${isArticle ? "Tech Article" : "Internship"}
            </span>

            <div class="card-actions">
                <button class="removeBtn signup-btn">❌ Remove</button>

                ${
                    isArticle
                        ? `<a href="${job.url}" target="_blank" class="read-btn">📖 Read</a>`
                        : `<a href="${job.url}" target="_blank" class="apply-btn">🚀 Apply</a>`
                }
            </div>
        `;


        card.querySelector(".removeBtn").addEventListener("click", () => {
            savedJobs = savedJobs.filter(j => j.id !== job.id);
            localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

            applyFilters(); 
        });

        results.appendChild(card);
    });
}

searchInput.addEventListener("input", applyFilters);
filterType.addEventListener("change", applyFilters);
applyFilters();