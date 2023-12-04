import { error } from "winston";

async function postForgot(username,password){
    const response = await fetch("/api/session/forgot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username,password}),
    });

    const result = await response.json();
    return result;
}

const form= document.getElementById("form");

forgotForm.addEventListener("submit", async (event) =>{
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const newPassword = document.getElementById("newPassword").value;
    const repeatPassword = document.getElementById("repeatPassword").value;
    if(newPassword != repeatPassword){
        alert("The passwords must match");
    }else{
        postForgot(username, newPassword)
        .then((data) => alert("Password reseted", data.response))
        .catch((error) => alert("Error resetting the password"))
    }
})