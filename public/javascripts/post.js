if(document.readyState !== "loading"){

    console.log("Document is ready");
    initializeCode();

} 
else {

    document.addEventListener("DOMContentLoaded", function(){

        console.log("Document ready after waiting!");
        initializeCode();

    })
}


function initializeCode() {

    postid = document.getElementById("comments").getAttribute("postid");
    console.log(postid);
    ifLoggedin();
    loadComments();
    
}

//Function that checks if the user is logged in and changes the page based on that
function ifLoggedin() {

    const authToken = localStorage.getItem("auth_token");
    fetch("/api/auth/post", {
        method: "GET",
        headers: {
            "authorization": "Bearer " + authToken
        }
    })
    .then((response) => response.text())
    .then((page) => {
        if(page != null) {

            document.getElementById("content").innerHTML = page;
            document.getElementById("comment-form").addEventListener("submit", onSubmit);

            let register_logout = document.getElementById("register_logout");
            register_logout.addEventListener("click", logout);
            register_logout.innerHTML = "Logout";
            register_logout.href = "";
            document.getElementById("login").remove();

        }
    })
    .catch((e) => {
        console.log("error" + e);
    })

}

//Load comments
async function loadComments() {

    fetch("http://localhost:3000/api/posting/comments/"+postid, {

    })
            .then(response => response.json())
            .then(data => {

                data.forEach(comment => {

                    console.log(data);
                    addNewComment(comment.user, comment.text);  

                });
            });
        
}

//When making a comment using the form
 function onSubmit(event) {

    console.log("jou2");
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("postId", postid);
    formData.append("authToken", localStorage.getItem("auth_token"))
    console.log(formData);

    fetch("/api/posting/comment", {

        method: "POST",
        body: formData

    })
    .then((response) => response.json())
    .catch((e) => {
        console.log("error" + e);
    })

    location.reload();

}

//Creating comments one at a time
//Creating elements and chucking stuff into them
function addNewComment(user, text, commentCount, id) {

    let postDiv = document.getElementById("comments");
    let newItem = document.createElement("div");
    newItem.classList.add("card-panel");

    let itemUser = document.createElement("h2");
    let itemText = document.createElement("p");

    itemUser.appendChild(document.createTextNode(user));
    itemText.appendChild(document.createTextNode(text));

    newItem.appendChild(itemUser);
    newItem.appendChild(itemText);

    postDiv.appendChild(newItem);

}

/*
function getScriptParam() {
    var scripts = document.getElementsByTagName('script');
    var lastScript = scripts[scripts.length-1];
    var scriptName = lastScript;
    return scriptName.getAttribute('postid')
}*/

//Self explanatory
function logout(){

    localStorage.removeItem("auth_token");
    location.reload();

  }

