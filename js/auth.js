const loginBtn = document.getElementById("loginBtn")
if(loginBtn){
    loginBtn.addEventListener("click",()=>{
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const user = JSON.parse(localStorage.getItem("user"));
        // “authentication is handled using localStorage for demo purposes, since backend is not implemented.”
        if (user && email === user.email && password === user.password){
            window.location.href = "dashboard.html";
        }
        else{
            alert("Invalid credentials!!");
        }
    })
}