if(document.readyState !== "loading"){

    console.log("Document is ready");
    initializeCode();

} 
else {

    document.addEventListener("DOMContentLoaded", function(){

        //Materialize menu bar functionality
        console.log("Document ready after waiting!");
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});

    })
}
