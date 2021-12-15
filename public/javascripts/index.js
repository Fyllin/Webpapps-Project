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
    document.getElementById("post-form").addEventListener("submit", onSubmit);

    loadPosts();
}

async function loadPosts() {

    fetch("http://localhost:3000/api/posting/posts")
            .then(response => response.json())
            .then(data => {
                data.forEach(post => {
                    console.log(data);
                    addNewPost(post.user, post.text, post.commentCount, post._id);  

                });
            });
        
}

 function onSubmit(event) {
    console.log("jou2");
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);

    fetch("../api/posting/post", {
        method: "POST",
        body: formData
    })
        .then((response) => response.json())

}


function addNewPost(user, text, commentCount, id) {
    const postDiv = document.getElementById("posts");
    let newItem = document.createElement("div");

    let itemUser = document.createElement("h2");
    let itemText = document.createElement("p");
    let itemCommentCount = document.createElement("a");

    itemCommentCount.setAttribute('href', '/post/'+id)

    itemUser.appendChild(document.createTextNode(user));
    itemText.appendChild(document.createTextNode(text));
    itemCommentCount.appendChild(document.createTextNode(commentCount + " comments"));

    newItem.appendChild(itemUser);
    newItem.appendChild(itemText);
    newItem.appendChild(itemCommentCount);

    postDiv.appendChild(newItem);
}


function storeToken(token) {
    localStorage.setItem("auth_token", token);
}