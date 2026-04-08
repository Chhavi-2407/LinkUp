const results = document.getElementById("results");

function loadSavedJobs(){
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

    results.innerHTML = "";

    if(savedJobs.length === 0){
        results.innerHTML = "<p>No saved jobs</p>";
        return;
    }

    savedJobs.forEach(job => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>${job.company_name}</strong></p>
            <p>${job.category}</p>

            <div class="card-actions">
                <button class="removeBtn signup-btn">❌ Remove</button>
                <a href="${job.url}" target="_blank" >Apply</a>
            </div>
        `;

        const removeBtn = card.querySelector(".removeBtn");

        removeBtn.addEventListener("click", () => {
            let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

            savedJobs = savedJobs.filter(j => j.id !== job.id);

            localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

            loadSavedJobs(); 
        });

        results.appendChild(card);
    });
}

loadSavedJobs();