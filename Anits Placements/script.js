function validateLogin() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let error = document.getElementById("error");

    if (username === "" || password === "") {
        error.innerHTML = "Please enter username and password.";
        return false;
    }

    if (username === "admin" && password === "1234") {

        window.location.href = "success.html";

        return false;
    }

    error.innerHTML = "Invalid username or password.";

    return false;
}