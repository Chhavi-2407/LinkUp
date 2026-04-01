// saved theme
const savedTheme = localStorage.getItem("theme")
if(savedTheme === "true"){
    document.body.classList.add("light-mode");
}

// toggle theme
const toggleBtn = document.getElementById("toggleTheme");
if(toggleBtn){
    toggleBtn.addEventListener("click",()=>{
        document.body.classList.toggle("light-mode");
        const isLight = document.body.classList.contains("light-mode");
        localStorage.setItem("theme", isLight);
    })
}

// user name
const name = localStorage.getItem("currentUser");
const welcomeText = document.getElementById("welcomeUser");
if(name){
    welcomeText.textContent = `Hi, ${name} 👋`;
}
else{
    window.location.href = "login.html"
}

// logout
const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn){
    logoutBtn.addEventListener("click",()=>{
        localStorage.removeItem("currentUser");
        window.location.href = 'login.html'
    })
}

// search
const searchBtn = document.getElementById("searchBtn");
if(searchBtn){
    searchBtn.addEventListener("click",()=>{
        const query = document.getElementById("searchInput").value;
        if(!query){
            alert("Enter something to search")
            return;
        }
        fetchJobs(query);
    })
}

async function fetchJobs(query) {
    try{
        const response = await fetch(`https://remotive.com/api/remote-jobs?search=${query}`)
        const data = await response.json()
        displayResults(data.jobs)
    }
    catch(error){
        console.log("Error fetching data:", error)
    }
}

function displayResults(jobs){
    const results = document.getElementById("results")
    results.innerHTML = "";
    jobs.forEach(job => {
        const card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML=`
        <h3>${job.title}</h3>
        <p><strong>${job.company_name}</strong></p>
        <p>${job.category}</p>
        <a href="${job.url}" target="_blank">Apply</a>
        `
        results.appendChild(card)
    })
}