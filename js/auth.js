const loginBtn = document.getElementById("loginBtn")
if(loginBtn){
    loginBtn.addEventListener("click",()=>{
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        if (!email || !password){
            alert("Please fill all fields");
            return;
        }
        const user = JSON.parse(localStorage.getItem("user"));
        // authentication is handled using localStorage for demo purposes, since backend is not implemented.
        if (user && email === user.email && password === user.password){
            localStorage.setItem("currentUser", user.name);
            alert("Login successful!!")
            window.location.href = "dashboard.html";
        }
        else{
            alert("Invalid credentials!!");
        }
    })
}

const signupBtn = document.getElementById("signupBtn");
if (signupBtn){
    signupBtn.addEventListener("click",()=>{
        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        // const user = {
        //     name: name,
        //     email: email,
        //     password: password
        // }
        if(!name.trim() || !email.trim() || !password.trim()){
            alert("Please fill all fields");
            return;
        }
        const user = {name, email, password}
        localStorage.setItem("user",JSON.stringify(user));
        alert("Signup successful!!");
        window.location.href = "login.html"
    })
}