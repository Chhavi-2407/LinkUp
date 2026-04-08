// ================= GLOBAL =================
let allJobs = [];

const results = document.getElementById("results");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const filter = document.getElementById("filterType");
const sortSelect = document.getElementById("sortType");

// ================= USER NAME =================
const name = localStorage.getItem("currentUser");
const welcomeText = document.getElementById("welcomeUser");

if(name && welcomeText){
    welcomeText.textContent = `Hi, ${name} 👋`;
}

// ================= SEARCH =================
if(searchBtn){
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();

        if(!query){
            alert("Enter something to search");
            return;
        }

        fetchJobs(query);
    });
}

// ================= FILTER + SORT =================
if(filter){
    filter.addEventListener("change", applyFilters);
}

if(sortSelect){
    sortSelect.addEventListener("change", applyFilters);
}

// ================= FETCH =================
async function fetchJobs(query) {
    if(results){
        results.innerHTML = "<p>Loading...</p>";
    }

    try{
        const response = await fetch(`https://remotive.com/api/remote-jobs?search=${query}`);
        const data = await response.json();

        allJobs = data.jobs || [];
        applyFilters();
    }
    catch(error){
        console.log("Error fetching data:", error);
        if(results){
            results.innerHTML = "<p>Something went wrong</p>";
        }
    }
}

// ================= FILTER =================
function applyFilters(){
    let filtered = [...allJobs];

    const type = filter ? filter.value : "all";
    const sortValue = sortSelect ? sortSelect.value : "default";

    if(type === "job"){
        filtered = filtered.filter(job =>
            job.category.toLowerCase().includes("software")
        );
    }

    if(sortValue === "date"){
        filtered.sort((a,b) =>
            new Date(b.publication_date) - new Date(a.publication_date)
        );
    }

    displayResults(filtered);
}

// ================= DISPLAY =================
function displayResults(jobs){
    if(!results) return;

    results.innerHTML = "";

    if(!jobs || jobs.length === 0){
        results.innerHTML = "<p>No results found</p>";
        return;
    }

    jobs.forEach(job => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>${job.company_name}</strong></p>
            <p>${job.category}</p>

            <div class="card-actions">
                <button class="saveBtn signup-btn">❤️ Save</button>
                <a href="${job.url}" target="_blank" class="applyBtn">Apply</a>
            </div>
        `;

        const saveBtn = card.querySelector(".saveBtn");

        let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
        const alreadySaved = savedJobs.find(j => j.id === job.id);

        if(alreadySaved){
            saveBtn.textContent = "✅ Saved";
        }

        saveBtn.addEventListener("click", () => {
            let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

            const exists = savedJobs.find(j => j.id === job.id);

            if(!exists){
                savedJobs.push(job);
                localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
                saveBtn.textContent = "✅ Saved";
            } else {
                alert("Already saved");
            }
        });

        results.appendChild(card);
    });
}