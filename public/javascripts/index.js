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

    ifLoggedin();
    loadPosts();

}

//Function that checks if the user is logged in and changes the page based on that
function ifLoggedin() {

    const authToken = localStorage.getItem("auth_token");
    fetch("/api/auth/index", {
        method: "GET",
        headers: {
            "authorization": "Bearer " + authToken
        }
    })
    .then((response) => response.text())
    .then((page) => {
        if(page != null) {
            document.getElementById("content").innerHTML = page;
            
            //A stupid way of changing buttons if the user is logged in
            try {

                document.getElementById("post-form").addEventListener("submit", onSubmit);
                let register_logout = document.getElementById("register_logout");
                register_logout.addEventListener("click", logout);
                register_logout.innerHTML = "Logout";
                register_logout.href = "";
                document.getElementById("login").remove();

                register_logout = document.getElementById("hamburger_register_logout");
                register_logout.addEventListener("click", logout);
                register_logout.innerHTML = "Logout";
                register_logout.href = "";
                document.getElementById("hamburger_login").remove();

            }
            catch {

            }
        }
    })
    .catch((e) => {
        console.log("error" + e);
    })

}

//Load posts
async function loadPosts() {

    fetch("http://localhost:3000/api/posting/posts")
            .then(response => response.json())
            .then(data => {
                data.forEach(post => {

                    addNewPost(post.title, post.user, post.text, post.commentCount, post._id);  

                });
            });
        
}

//When making a post using the form
 function onSubmit(event) {
    console.log("jou2");
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("authToken", localStorage.getItem("auth_token"));
    console.log(formData);

    fetch("../api/posting/post", {
        method: "POST",
        body: formData
    })
    .then((response) => response.json())
    .catch((e) => {
        console.log("error" + e);
    })

    location.reload();

}


//Creating posts one at a time
//Creating elements and chucking stuff into them
function addNewPost(title, user, text, commentCount, id) {

    console.log("text: " + text);
    const postDiv = document.getElementById("posts");
    let newItem = document.createElement("div");
    newItem.classList.add("card-panel");

    let itemTitle = document.createElement("h2")
    let itemUser = document.createElement("h4");
    let itemText = document.createElement("div");
    itemText.classList.add("codeblock");
    let itemCommentCount = document.createElement("a");

    itemCommentCount.setAttribute('href', '/post/'+id)

    itemTitle.appendChild(document.createTextNode(title))
    itemUser.appendChild(document.createTextNode("By: " + user));
    itemText.insertAdjacentHTML('beforeend', text);
    itemCommentCount.appendChild(document.createTextNode(commentCount + " comments"));

    newItem.appendChild(itemTitle);
    newItem.appendChild(itemUser);
    newItem.appendChild(itemText);
    newItem.appendChild(itemCommentCount);

    postDiv.appendChild(newItem);
}

//Self explanatory

function logout(){
    localStorage.removeItem("auth_token");
    location.reload();
  }

