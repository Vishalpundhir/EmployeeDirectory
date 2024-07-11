

function addEmployee() {
    var newEmployeeData = {
        name: document.getElementById("new-Employee-First-Name").value + " " + document.getElementById("new-Employee-Last-Name").value,
        email: document.getElementById("new-Employee-Email").value,
        location: document.getElementById("new-Employee-Location").value,
        department: document.getElementById("new-Employee-Department").value,
        role: document.getElementById("new-Employee-Role").value,
        empNo: document.getElementById("new-Employee-EmpNo").value,
        status: document.getElementById("new-Employee-Status").value,
        joinDate: document.getElementById("new-Employee-Join-Date").value,
        image: document.getElementById("new-Employee-Image").files[0]
    };

    if (newEmployeeData.image) {

        var reader = new FileReader();
        reader.onload = function (e) {
            newEmployeeData.imgSrc = e.target.result;
            var idList = ["new-Employee-EmpNo", "new-Employee-First-Name", "new-Employee-Last-Name", "new-Employee-Email", "new-Employee-Join-Date"];
            let i = 0;
            for (i = 0; i < 5; i++) {
                if (document.getElementById(idList[i]).value == "") {
                    var showBorderColor = document.getElementById(idList[i]);
                    if (showBorderColor.classList.contains("border-blue")) showBorderColor.classList.remove("border-blue");
                    showBorderColor.classList.add("border-red");
                    var errorChk = document.getElementById(idList[i] + "-error");
                    if (errorChk.classList.contains("d-none")) x.classList.remove("d-none");
                    errorChk.classList.add("d-block");
                }
            }
            if (document.getElementById("new-Employee-Join-Date").value == "") {
                var errorChk = document.getElementById("new-Employee-Join-Date-error");
                if (errorChk.classList.contains("d-none")) x.classList.remove("d-none");
                errorChk.classList.add("d-block");
            }
            else {
                localStorage.setItem("newEmployeeData", JSON.stringify(newEmployeeData));
                alert("Data is added")
                window.location.href = "index.html";
            }
            // window.close();
        };
        reader.readAsDataURL(newEmployeeData.image);
    } else {
        newEmployeeData.imgSrc = "../Assets/Images/default-avatar.png"; // You can customize this based on your needs
        var idList = ["new-Employee-EmpNo", "new-Employee-First-Name", "new-Employee-Last-Name", "new-Employee-Email", "new-Employee-Join-Date"];
        let i = 0;
        for (i = 0; i < 5; i++) {
            if (document.getElementById(idList[i]).value == "") {
                var showBorderColor = document.getElementById(idList[i]);
                if (showBorderColor.classList.contains("border-blue")) showBorderColor.classList.remove("border-blue");
                showBorderColor.classList.add("border-red");

                var errorChk = document.getElementById(idList[i] + "-error");
                if (errorChk.classList.contains("d-none")) errorChk.classList.remove("d-none");
                errorChk.classList.add("d-block");
            }
        }

        if (document.getElementById("new-Employee-Join-Date").value == "") {
            var errorChk = document.getElementById("new-Employee-Join-Date-error");
            if (errorChk.classList.contains("d-none")) x.classList.remove("d-none");
            errorChk.classList.add("d-block");
        }
        else {
            localStorage.setItem("newEmployeeData", JSON.stringify(newEmployeeData));
            alert("Data is added");
            window.location.href = "index.html";
        }
    }

}

//Validation function
function validateForm() {
    var email = document.getElementById("new-Employee-Email").value;
    if (!email.includes('@')) {
        alert("Please enter a valid email address.");
        return false;
    }
    var empNo = document.getElementById("new-Employee-EmpNo").value;
    if (!/^\d+$/.test(empNo)) {
        alert("Please enter a valid value for Emp No. It can only have numeric values");
        return false;
    }
    return true;
}



// Function to hide error while user type 
function showInputLine(id) {
    var hideError = document.getElementById(id + "-error");
    if (hideError.classList.contains("d-block")) hideError.classList.remove("d-block");
    hideError.classList.add("d-none");
    var showBorderColor = document.getElementById(id);
    if (showBorderColor.classList.contains("border-red")) showBorderColor.classList.remove("border-red");
    showBorderColor.classList.add("border-blue");
}

// Function to show error while user type and left the filed without filling anything
function showError(id) {
    var inputLength = document.getElementById(id).value;
    if (inputLength.trim().length === 0) {
        var showError = document.getElementById(id + "-error");
        if (showError.classList.contains("d-none")) showError.classList.remove("d-none");
        showError.classList.add("d-block");
        var showBorderColor = document.getElementById(id);
        if (showBorderColor.classList.contains("border-blue")) showBorderColor.classList.remove("border-blue");
        showBorderColor.classList.add("border-red");

    }
}


// Function to preview the uploaded image
function previewImage() {
    var preview = document.getElementById("preview");
    var fileInput = document.getElementById("new-Employee-Image");

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}


function closeAddEmployeePage() {
    window.close();
    window.location.href = "index.html";
}

// Population of Dropdowns Dynamically

const locationData = ['Hyderabad', 'Bengaluru', 'Mumbai', 'London'];
function populateDropdownLocation() {
    const dropdown = document.getElementById('new-Employee-Location');
    dropdown.innerHTML = '';
    locationData.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        dropdown.appendChild(option);
    });
}
populateDropdownLocation();

const roleData = ['UX Designer', 'Full-stack Developer'];
function populateDropdownRole() {
    const dropdown = document.getElementById('new-Employee-Role');
    dropdown.innerHTML = '';
    roleData.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        dropdown.appendChild(option);
    });
}
populateDropdownRole();

const departmentData = ['UI/UX', 'Product Engg', 'QA'];
function populateDropdownDepartment() {
    const dropdown = document.getElementById('new-Employee-Department');
    dropdown.innerHTML = '';
    departmentData.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        dropdown.appendChild(option);
    });
}
populateDropdownDepartment();

const managerData = ['Willian Smith', 'Lorem Ipsum'];
function populateDropdownManager() {
    const dropdown = document.getElementById('new-Emp-Manager');
    dropdown.innerHTML = '';
    managerData.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        dropdown.appendChild(option);
    });
}
populateDropdownManager();

const projectData = ['Willian Smith', 'Lorem Ipsum'];
function populateDropdownProject() {
    const dropdown = document.getElementById('new-Emp-Project');
    dropdown.innerHTML = '';
    projectData.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        dropdown.appendChild(option);
    });
}
populateDropdownProject();

const statusData = ['Active', 'Disable'];
function populateDropdownStatus() {
    const dropdown = document.getElementById('new-Employee-Status');
    dropdown.innerHTML = '';
    statusData.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.text = optionText;
        dropdown.appendChild(option);
    });
}
populateDropdownStatus();




