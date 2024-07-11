function hideSideBar(value) {
    // Applicable for all

    var check = document.getElementById("new-bar");
    if (check.classList.contains("d-none")) {
        var updateBox = document.getElementById("side-bar");
        updateBox.classList.add("d-none");
        var updateBox = document.getElementById("new-bar");
        updateBox.classList.remove("d-none");
        updateBox.classList.add("d-block");
       

        // To handle the image because it is outside of both divs , main side bar as well as hidden one
        var handleImg = document.getElementById("handle-img-box");
        handleImg.classList.add("handle-img-margin");

        // Wrap container which includes search bar , table , roles and other things
        var handleImg = document.getElementById("wrap");
        handleImg.classList.add("left-bar-close");
    }
    else {
        var updateBox = document.getElementById("side-bar");
        updateBox.classList.remove("d-none");
        var updateBox = document.getElementById("new-bar");
        updateBox.classList.remove("d-block");
        updateBox.classList.add("d-none");
       
       
        var handleImg = document.getElementById("handle-img-box");
        handleImg.classList.remove("handle-img-margin");
        var handleImg = document.getElementById("wrap");
        handleImg.classList.remove("left-bar-close");
    }

}