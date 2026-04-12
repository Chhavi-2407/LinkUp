const loginBtn = document.getElementById("loginBtn")
if(loginBtn){
    loginBtn.addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        if(!email || !password){
            alert("Please fill all fields");
            return;
        }
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user){
            alert("No account found. Please sign up first.");
            return;
        }
        if(email === user.email && password === user.password){
            localStorage.setItem("currentUser", user.name);
            localStorage.removeItem("lastSearch");
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } 
        else {
            alert("Invalid credentials!");
        }
    });
}

const signupBtn = document.getElementById("signupBtn");
if (signupBtn){
    signupBtn.addEventListener("click",()=>{
        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        if(!name.trim() || !email.trim() || !password.trim()){
            alert("Please fill all fields");
            return;
        }
        const user = {name, email, password}
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("currentUser", name);
        alert("Signup successful!!");
        window.location.href = "dashboard.html"
    })
}