let allData = [];

const results = document.getElementById("results");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const filter = document.getElementById("filterType");
const sortSelect = document.getElementById("sortType");

// user
const name = localStorage.getItem("currentUser");
const welcomeText = document.getElementById("welcomeUser");

if (name && welcomeText) {
    welcomeText.textContent = `Hi, ${name} 👋`;
}

const lastSearch = localStorage.getItem("lastSearch");

if(lastSearch && searchInput){
    searchInput.value = lastSearch;
}
// searchbtn
if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();

        if (!query) {
            alert("Enter something to search");
            return;
        }
        localStorage.setItem("lastSearch", query);
        fetchAllData(query);
    });
}

// filter
if (filter) {
    filter.addEventListener("change", applyFilters);
}

if (sortSelect) {
    sortSelect.addEventListener("change", applyFilters);
}

// fetching apis
async function fetchAllData(query) {
    results.innerHTML = "<p>Loading...</p>";

    try {
        const jobRes = await fetch(`https://remotive.com/api/remote-jobs?search=${query}`);
        const jobData = await jobRes.json();

        const jobs = (jobData.jobs || []).map(job => ({
            id: "job-" + job.id,
            title: job.title,
            company: job.company_name,
            category: job.category,
            url: job.url,
            date: job.publication_date,
            type: "job"
        }));

        const eventRes = await fetch(`https://dev.to/api/articles?tag=${query}`);
        const eventData = await eventRes.json();

        const events = (eventData || []).map(event => ({
            id: "event-" + event.id,
            title: event.title,
            company: event.user?.name || "Dev Community",
            category: "Tech Article",
            url: event.url,
            date: event.published_at,
            type: "event"
        }));

        allData = [...jobs, ...events];

        console.log("Jobs:", jobs.length);
        console.log("Events:", events.length);

        applyFilters();

    } catch (error) {
        console.error("Fetch Error:", error);
        results.innerHTML = "<p>Something went wrong</p>";
    }
}

// filtering and sorting
function applyFilters() {
    let filtered = [...allData];

    const type = filter ? filter.value : "all";
    const sortValue = sortSelect ? sortSelect.value : "default";

    // filter
    if (type === "job") {
        filtered = filtered.filter(item => item.type === "job");
    }

    if (type === "event") {
        filtered = filtered.filter(item => item.type === "event");
    }

    // sort
    if (sortValue === "date") {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    displayResults(filtered);
}

// display
function displayResults(data) {
    results.innerHTML = "";

    if (!data.length) {
        results.innerHTML = `
            <div style="text-align:center; margin-top:40px;">
                <h3>No results found</h3>
                <p>Try searching something else</p>
            </div>
        `;
        return;
    }

    data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${item.title}</h3>
            <p><strong>${item.company}</strong></p>
            <p>${item.category}</p>

            <p class="tag">
                ${item.type === "job" ? "💼 Internship" : "📘 Article"}
            </p>

            <div class="card-actions">
                <button class="saveBtn signup-btn">Save</button>
                <a href="${item.url}" target="_blank" class="apply-btn">
                    ${item.type === "job" ? "🚀 Apply" : "📖 Read"}
                </a>
            </div>
        `;

        const saveBtn = card.querySelector(".saveBtn");

        let saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
        const exists = saved.find(j => j.id === item.id);

        if (exists) {
            saveBtn.textContent = "✅ Saved";
            saveBtn.classList.add("saved");
        }

        saveBtn.addEventListener("click", () => {
            let saved = JSON.parse(localStorage.getItem("savedJobs")) || [];

            const exists = saved.find(j => j.id === item.id);

            if (!exists) {
                saved.push(item);
                localStorage.setItem("savedJobs", JSON.stringify(saved));
                saveBtn.textContent = "✅ Saved";
                saveBtn.classList.add("saved");
            } else {
                alert("Already saved");
            }
        });

        results.appendChild(card);
    });
}

// saved 
const viewSavedBtn = document.getElementById("viewSaved");

if (viewSavedBtn) {
    viewSavedBtn.addEventListener("click", () => {
        const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
        displayResults(saved);
        results.innerHTML += `<button id="backBtn" class="signup-btn">⬅ Back</button>`;

        document.getElementById("backBtn").addEventListener("click", () => {
            const lastSearch = localStorage.getItem("lastSearch");
            if(lastSearch){
                fetchAllData(lastSearch);
            }
        });
    });
}
// logout
const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn){
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        // localStorage.removeItem("lastSearch"); // optional clean reset
        window.location.href = "index.html";
    });
}

if(!lastSearch){
    results.innerHTML = `
        <div style="text-align:center; margin-top:60px;">
            <h2>🔍 Start Exploring</h2>
            <p>Search for internships, hackathons or tech articles</p>
        </div>
    `;
}