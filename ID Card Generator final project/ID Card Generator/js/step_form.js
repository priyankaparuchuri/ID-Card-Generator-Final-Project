var currentTab = 0;


function showTab(n) {
    var x = studentDetailsFormElement.getElementsByClassName("tab");
    x[n].style.display = "block";

    if (n == 0) {
        studentDetailsFormElement.querySelector("#prevBtn").style.display = "none";
    } else {
        studentDetailsFormElement.querySelector("#prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        studentDetailsFormElement.querySelector("#nextBtn").innerHTML = "Submit";
    } else {
        studentDetailsFormElement.querySelector("#nextBtn").innerHTML = "Next";
    }
}

function nextPrev(n) {
    var x = studentDetailsFormElement.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    if (n == 1) {
        if (currentTab < x.length - 1) {
            x[currentTab].style.display = "none";
            currentTab = currentTab + n;
        } else {
            onFormSubmit();
            return false;
        }
    } else {
        x[currentTab].style.display = "none";
        currentTab = currentTab + n;
    }



    // x[currentTab].style.display = "none";
    // if (currentTab < x.length - 1) currentTab = currentTab + n;
    // else {
    //     onFormSubmit();
    //     return false;
    // }
    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = studentDetailsFormElement.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    for (i = 0; i < y.length; i++) {
        if (y[i].type === "file" && y[i].files.length == 0) {
            y[i].className += " invalid";
            valid = false;
        } else if (y[i].type != "file" && y[i].value == "") {
            y[i].className += " invalid";
            valid = false;
        } else {
            y[i].classList.remove("invalid");
            valid = true;
        }
    }
    return valid;

}

