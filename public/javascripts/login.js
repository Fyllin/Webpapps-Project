if (document.readyState !== "loading") {
    initializeCodeLogin();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      initializeCodeLogin();
    });
  }
  
  function initializeCodeLogin() {
    document.getElementById("login-form").addEventListener("submit", onSubmit);
}

//Basic POST login
function onSubmit(event) {
    console.log("jou2");
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);

    fetch("api/user/login", {
        method: "POST",
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            if(data.token) {
                storeToken(data.token);
                window.location.href="/";
            } else {
                if (data.message) {
                    document.getElementById("error").innerHTML = data.message;
                }  else {
                    document.getElementById("error").innerHTML = "Very strange error!";
                }
            }

        })

}

function storeToken(token) {
    localStorage.setItem("auth_token", token);
}