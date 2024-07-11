
// to toggle the form based on click on button 
function toggleForm() {
    var form = document.getElementById('form');
    var outerContainer = document.getElementById('emp-roles');
    var empSection = document.getElementById('employess-section');
    var filterSection = document.getElementById('filter-section');

    if (form.classList.contains("d-none")) {
        form.classList.remove("d-none")
        form.classList.add("d-block")
        outerContainer.classList.remove("flex")
        outerContainer.classList.add("d-none")
        empSection.classList.remove("d-block")
        empSection.classList.add("d-none")
        filterSection.classList.remove("d-block")
        filterSection.classList.add("d-none")
    } else {
        form.classList.remove("d-block")
        form.classList.add("d-none")
        outerContainer.classList.remove("d-none")
        outerContainer.classList.add("flex")
        empSection.classList.remove("d-none")
        empSection.classList.add("d-block")
        filterSection.classList.remove("d-none")
        filterSection.classList.add("d-block")
    }
}

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    checkboxes.style.display = checkboxes.style.display === "block" ? "none" : "block";
}

// add employee list
var employeeData = [
    "Employee 1",
    "Employee 2",
    "Employee 3",
    "Employee 4",
    "Employee 1",
    "Employee 2",
    "Employee 3",
    "Employee 4",
];

var checkboxesDiv = document.getElementById("checkboxes");
employeeData.forEach(function (employee) {
    var label = document.createElement("label");
    label.innerHTML = `${employee}     <input style="float:right" type="checkbox" value="${employee}" /> `;
    checkboxesDiv.appendChild(label);
});

// some dummy data to show initially
var data = [
    {
        role: "Customer Service Manager",
        department: "IT",
        location: "Hyderabad",
        selectedEmployeesCount: "+41"
    },
    {
        role: "Ux Designer",
        department: "Product Engg",
        location: "Hyderabad",
        selectedEmployeesCount: "+41"
    },
    {
        role: "Asistant Backend Developer",
        department: "UI/UX",
        location: "Hyderabad",
        selectedEmployeesCount: "+41"
    },
    {
        role: "Human Resource Manager",
        department: "IT",
        location: "Hyderabad",
        selectedEmployeesCount: "+41"
    },
    {
        role: "Front End Developer",
        department: "QA",
        location: "Hyderabad",
        selectedEmployeesCount: "+41"
    },
];


//Prototype method to populate data in the employee roles section
Array.prototype.populateData = function () {
    var outerContainer = document.querySelector('.emp-roles');
    outerContainer.innerHTML = '';

    this.forEach(function (item) {
        var innerDiv = document.createElement('div');
        innerDiv.classList.add('emp-roles-desc');
        innerDiv.innerHTML = `
            <div class="emp-one">    
            <div class="role-details role-details-top flex-role">
            <div class="role-name">${item.role}</div>
            <div class="edit-img-box"><img class="edit-img" src="../Assets/Images/edit.svg"> </div>
        </div>
        <div class="role-details flex-role" >
            <div class="flex">
                <div><img class="location-img" src="../Assets/Images/team_svgrepo.com.svg"></div>
                <div class="location">Department</div>
            </div>
            <div class="location" id="department">${item.department}</div>
        </div>
        <div class="role-details flex-role" >
            <div class="flex">
                <div><img class="location-img" src="../Assets/Images/location-pin-alt-1_svgrepo.com.svg"></div>
                <div class="location" >Location</div>
            </div>
            <div class="location" id="location">${item.location}</div>
        </div>
        <div class="role-details flex-role">
            <div class="location total-Employees">Total Employees</div>
            <div>
                <img class="men-img-one" src="../Assets/Images/men-modified.png">
                <img class="women-img-one" src="../Assets/Images/female-modified.png">
                <img class="men-img-two" src="../Assets/Images/men-modified.png">
                <div class="expand">${item.selectedEmployeesCount}</div>
            </div>
        </div>
        <div class="view">
            <div class="view-heading"><a href="roleDetailes.html">View all Employees</a> </div>
            <div><img class="arrow-vector" src="../Assets/Images/vector-2.svg"> </div>
        </div>
            </div>`;

        outerContainer.appendChild(innerDiv);
    });
    updateFilterButtons();
};


// Submit data
function SubmitData() {
    var selectedEmployeesCount = getSelectedEmployeesCount(); 
    var newEmployeeData = {
        role: document.getElementById("role-name").value,
        department: document.getElementById("department").value,
        location: document.getElementById("location").value,
        selectedEmployeesCount: "+" + selectedEmployeesCount 
    };

    data.push(newEmployeeData); 
     //populateData(data); 
    data.populateData();
    localStorage.setItem("newEmployeeData", JSON.stringify(newEmployeeData));
    alert("Data is added");
    toggleForm(); 
}

//to get count to selected employees
function getSelectedEmployeesCount() {
    var checkboxes = document.querySelectorAll('#checkboxes input[type="checkbox"]');
    var selectedEmployeesCount = 0;

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selectedEmployeesCount++;
        }
    });

    return selectedEmployeesCount;
}

function closePage() {
    toggleForm(); 
}

var newEmployeeDataString = localStorage.getItem("newEmployeeData");
if (newEmployeeDataString) {
    var newEmployeeData = JSON.parse(newEmployeeDataString);
    addEmployeeToTable(newEmployeeData);
    console.log(newEmployeeData);
    localStorage.removeItem("newEmployeeData");
}

function addEmployeeToTable(newEmployeeData) {
    data.push(newEmployeeData);
    populateData(data);
}

window.addEventListener("storage", handleStorageEvent);

function handleStorageEvent(event) {
    if (event.key === "newEmployeeData") {
        var newEmployeeData = JSON.parse(localStorage.getItem("newEmployeeData"));

        if (newEmployeeData) {
            data.push(newEmployeeData);
            populateData(data); //
            localStorage.removeItem("newEmployeeData");
        }
    }
}



// Function to create dropdown (new)
function createCustomSelect(selectId, optionsId, selectedTextId, optionsData) {
    var customSelect = document.getElementById(selectId);
    var optionsContainer = document.getElementById(optionsId);
    var selectedText = document.getElementById(selectedTextId);

    selectedText.textContent = "0 selected";
    if(selectId == "locationDropdown"){
        selectedText.textContent = "Location";
    }
    if(selectId == "departmentDropdown"){
        selectedText.textContent = "Department";
    }
    

    optionsData.forEach(function (option) {
        var optionDiv = document.createElement("div");
        optionDiv.classList.add("option");
        optionDiv.textContent = option;
        optionDiv.setAttribute("data-value", option);
        optionDiv.onclick = function () {
            toggleOption(optionDiv);
            updateSelectedText(selectedText, optionsContainer);
            updateFilterButtons();
        };
        optionsContainer.appendChild(optionDiv);
    });

    // Toggle option 
    function toggleOption(optionDiv) {
        optionDiv.classList.toggle("selected");
    }

    // Update the count of options
    function updateSelectedText(selectedText, optionsContainer) {
        var selectedOptions = optionsContainer.querySelectorAll('.selected');
        selectedText.textContent = selectedOptions.length + " selected";
    }
     var resetBtn = document.getElementById("reset-Btn");
    resetBtn.classList.add("reset-box-margin");
}

// Function to toggle options 
function toggleOptions(optionsId) {
    var optionsContainer = document.getElementById(optionsId);
    optionsContainer.style.display = (optionsContainer.style.display === 'block') ? 'none' : 'block';
}

// To apply filters when we click on apply button
function applyFilters() {
    var locationSelectedOptions = getSelectedOptions("locationOptions");
    var departmentSelectedOptions = getSelectedOptions("departmentOptions");
   

    var filteredData = data.filter(function (item) {
        return (locationSelectedOptions.length === 0 || locationSelectedOptions.includes(item.location)) &&
            (departmentSelectedOptions.length === 0 || departmentSelectedOptions.includes(item.department)
            );
    });
    populateData(filteredData);
}

// To get options from new drop down
function getSelectedOptions(optionsId) {
    var selectedOptions = [];
    var optionsContainer = document.getElementById(optionsId);
    var options = optionsContainer.querySelectorAll('.selected');
    options.forEach(function (option) {
        selectedOptions.push(option.getAttribute("data-value"));
    });
    return selectedOptions;
}

// Reset the filters
function resetFilters() {
    resetSelectedOptions("locationOptions");
    resetSelectedOptions("departmentOptions");
    populateData(data);
}

// Function to reset selected options in a new dropdown
function resetSelectedOptions(optionsId) {
    var optionsContainer = document.getElementById(optionsId);
    var options = optionsContainer.querySelectorAll('.selected');
    options.forEach(function (option) {
        option.classList.remove("selected");
    });
    var x = optionsId.charAt(0).toUpperCase() + optionsId.slice(1);
     document.getElementById(optionsId.replace("Options", "Dropdown")).querySelector('.selected-text').textContent = x.slice(0, -7);
}

// Enable and Disable the Apply and Reset Button
function updateFilterButtons() {
    var locationSelectedOptions = getSelectedOptions("locationOptions");
    var departmentSelectedOptions = getSelectedOptions("departmentOptions");
    var applyBtn = document.getElementById("apply-Btn");
    var resetBtn = document.getElementById("reset-Btn");

    if (
        locationSelectedOptions.length === 0 &&
        departmentSelectedOptions.length === 0
    ) {
        applyBtn.disabled = true;
        resetBtn.disabled = true;
    } else {
        applyBtn.disabled = false;
        resetBtn.disabled = false;
    }
}


// To create the options of dropdown
createCustomSelect("locationDropdown", "locationOptions", "locationDropdownText", [ "Bengaluru", "Hyderabad", "Mumbai", "London"]);
createCustomSelect("departmentDropdown", "departmentOptions", "departmentDropdownText", [ "Product Engg", "QA"]);



//populateData(data);

//Call the prototype method to populate the table
data.populateData();