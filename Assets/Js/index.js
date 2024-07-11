// some dummy data to show initially

var data = [];

function fetchEmployeeData() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'employee.json', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    data = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    reject(new Error('Error fetching employee data. Status code: ' + xhr.status));
                }
            }
        };
        xhr.send();
    });
}

function populateTable(data) {
    var tableBody = document.querySelector("#myTable tbody");

    tableBody.innerHTML = "";
    data.forEach(function (item) {
        var row = tableBody.insertRow();
        row.classList.add("employee-row");

        // Add cells
        for (let i = 1; i <= 9; i++) {
            var cell = row.insertCell();

            switch (i) {
                case 1:
                    // Checkbox cell
                    cell.innerHTML = '<input type="checkbox" onchange="deleteBtnEnable()">';
                    break;
                case 2:
                    // Details cell
                    cell.classList.add("head-user", "common");
                    cell.innerHTML = `
                        <div class="emp-details-box">
                            <div><img class="emp-img" src="${item.imgSrc}"></div>
                            <div>
                                <div class="emp-name">${item.name}</div>
                                <div class="emp-email">${item.email}</div>
                            </div>
                        </div>
                    `;
                    break;
                case 7:
                    // Status cell
                    cell.classList.add("head-status", "common");
                    cell.innerHTML = item.status === "Disable"
                        ? `<div class="disable-box">${item.status}</div>`
                        : `<div class="active-box">${item.status}</div>`;
                    break;
                case 9:
                    // Dots cell
                    cell.classList.add("head-dots");
                    let new_id = 'option-div' + item.name;
                    cell.innerHTML = `<div id=${new_id} class="choice-box d-none">
                        <div class="choice">1. View Details</div>
                        <div class="choice">2. Edit</div>
                        <div class="choice">3. Delete</div>
                    </div>
                    <button class="choice-btn"  id=${new_id} onclick="showThreeOptionBox(id)">
                        <img class="ellipsis" src="../Assets/Images/ellipsis.png">
                    </button>`;
                    break;
                default:
                    // Common cells
                    cell.classList.add(`common-cell${i}`, "common");
                    cell.textContent = getCellContent(item, i);
                    break;
            }
        }
    });

    updateFilterButtons();

    function getCellContent(item, cellNumber) {
        switch (cellNumber) {
            case 3:
                return item.location;
            case 4:
                return item.department;
            case 5:
                return item.role;
            case 6:
                return item.empNo;
            case 8:
                return item.joinDate;
            default:
                return "";
        }
    }
}

fetchEmployeeData().then(function () {
    populateTable(data);
}).catch(function (error) {
    console.error(error);
});






//  Export file of csv

function exportToExcel() {
    var visibleData = getVisibleData();
    var selectedData = getSelectedData();
    console.log(selectedData);
    if (visibleData.length > 0 || selectedData.length > 0) {

        var check = document.getElementById("delete-btn");
        if (check.disabled == false) {

            var csvContent = "data:text/csv;charset=utf-8,"
                + selectedData.map(row => Object.values(row).join(",")).join("\n");

            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "exported_data.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        }
        else {

            var csvContent = "data:text/csv;charset=utf-8,"
                + visibleData.map(row => Object.values(row).join(",")).join("\n");

            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "exported_data.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } else {
        alert("No data to export!");
    }
}

// Function to get visible data of current screen

function getVisibleData() {
    var visibleData = [];
    var table = document.getElementById("myTable");
    var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var rowData = {
            'User': cells[1].textContent,
            'Location': cells[2].textContent,
            'Department': cells[3].textContent,
            'Role': cells[4].textContent,
            'Emp No': cells[5].textContent,
            'Status': cells[6].textContent,
            'Join Date': cells[7].textContent
        };
        visibleData.push(rowData);
    }
    return visibleData;
}

// to get data of cells for which user clicked 
function getSelectedData() {
    var selectedData = [];
    var table = document.getElementById("myTable");
    var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        if (cells[0].getElementsByTagName("input")[0].checked) {
            var rowData = {
                'User': cells[1].textContent,
                'Location': cells[2].textContent,
                'Department': cells[3].textContent,
                'Role': cells[4].textContent,
                'Emp No': cells[5].textContent,
                'Status': cells[6].textContent,
                'Join Date': cells[7].textContent
            };
            selectedData.push(rowData);
        }

    }
    return selectedData;
}






// Filter rows based on the selected alphabet

function filterByAlphabet(alphabet) {
    var filteredData = data.filter(function (item) {
        return item.name.toUpperCase().startsWith(alphabet);
    });
    populateTable(filteredData);
    var alphabetDivs = document.getElementsByClassName("alphabet-divs");
    for (var i = 0; i < alphabetDivs.length; i++) {
        alphabetDivs[i].classList.remove("selected-alphabet");
    }

    var filterImg = document.getElementById("filter-img");
    filterImg.classList.remove("filter-icon-img-modified");
    filterImg.classList.add("filter-icon-img");

    document.getElementById(alphabet).classList.add("selected-alphabet");

}

// function to reset the selected alphabet

function resetAlphabetFilter() {
    // Remove selected class from all divs
    var alphabetDivs = document.getElementsByClassName("alphabet-divs");
    for (var i = 0; i < alphabetDivs.length; i++) {
        alphabetDivs[i].classList.remove("selected-alphabet");
    }
    var filterImg = document.getElementById("filter-img");
    filterImg.classList.remove("filter-icon-img");
    filterImg.classList.add("filter-icon-img-modified");


    // Reset the table with original data
    populateTable(data);
}


// Open the Add Employee page
function openAddEmployeePage() {
    // window.open('add_employee.html', '_blank');
    window.location.href = 'add_employee.html';
}

// Delete button 

function deleteSelectedRows() {
    var table = document.getElementById("myTable");
    var checkboxes = table.querySelectorAll('tbody input[type="checkbox"]:checked');

    checkboxes.forEach(function (checkbox) {
        var row = checkbox.closest('tr');
        var rowIndex = row.rowIndex;
        table.deleteRow(rowIndex);
        data.splice(rowIndex - 1, 1);
    });

    document.getElementById("delete-btn").disabled = true;
}


// Function to check all check boxes when we click on main heaeder check box
function FnCheckAll() {
    var checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = event.target.checked;
    });
    deleteBtnEnable()
}

// Function to enable check box when atlest one check box is clicked
function deleteBtnEnable() {
    var checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    var cnt = 0;
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            cnt++;
        }
        else {

        }
    });
    if (cnt > 0) {
        var options = document.getElementById("delete-btn");
        options.disabled = false;
    }
    else {
        var options = document.getElementById("delete-btn");
        options.disabled = true;
    }

}

// to sort data is ascending of descending order
var isAscendingOrder = true;
function sortData() {
    var sortedData;
    if (isAscendingOrder) {
        sortedData = data.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else {
        sortedData = data.slice().sort((a, b) => b.name.localeCompare(a.name));
    }
    isAscendingOrder = !isAscendingOrder;
    // now put data in table
    populateTable(sortedData);
}

// Show three option of click on three dots
var flag = true;
function showThreeOptionBox(id) {
    if (flag == true) {
        var options = document.getElementById(id);
        options.classList.remove("d-none");
        options.classList.add("d-block");
    } else {
        var options = document.getElementById(id);
        options.classList.remove("d-block");
        options.classList.add("d-none");
    }
    flag = !flag;
}

// Function to create dropdown (new)
function createCustomSelect(selectId, optionsId, selectedTextId, optionsData) {
    var customSelect = document.getElementById(selectId);
    var optionsContainer = document.getElementById(optionsId);
    var selectedText = document.getElementById(selectedTextId);

    selectedText.textContent = "0 selected";
    if (selectId == "locationDropdown") {
        selectedText.textContent = "Location";
    }
    if (selectId == "departmentDropdown") {
        selectedText.textContent = "Department";
    }
    if (selectId == "statusDropdown") {
        selectedText.textContent = "Status";
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
    var statusSelectedOptions = getSelectedOptions("statusOptions");

    var filteredData = data.filter(function (item) {
        return (locationSelectedOptions.length === 0 || locationSelectedOptions.includes(item.location)) &&
            (departmentSelectedOptions.length === 0 || departmentSelectedOptions.includes(item.department)) &&
            (statusSelectedOptions.length === 0 || statusSelectedOptions.includes(item.status));
    });
    populateTable(filteredData);
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
    resetSelectedOptions("statusOptions");
    populateTable(data);
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
    var statusSelectedOptions = getSelectedOptions("statusOptions");
    var applyBtn = document.getElementById("apply-Btn");
    var resetBtn = document.getElementById("reset-Btn");

    if (
        locationSelectedOptions.length === 0 &&
        departmentSelectedOptions.length === 0 &&
        statusSelectedOptions.length === 0
    ) {
        applyBtn.disabled = true;
        resetBtn.disabled = true;
    } else {
        applyBtn.disabled = false;
        resetBtn.disabled = false;
    }
}


// To create the options of dropdown
createCustomSelect("locationDropdown", "locationOptions", "locationDropdownText", ["Bengaluru", "Hyderabad", "Mumbai", "London"]);
createCustomSelect("departmentDropdown", "departmentOptions", "departmentDropdownText", ["Product Engg", "QA"]);
createCustomSelect("statusDropdown", "statusOptions", "statusDropdownText", ["Active", "Disable"]);

// search employees

function searchEmployees() {
    var searchTerm = document.getElementById("searchInput").value.toLowerCase();
    var filteredData = data.filter(function (item) {
        return item.name.toLowerCase().includes(searchTerm);
    });
    populateTable(filteredData);
}


// New functions using local storage
var newEmployeeDataString = localStorage.getItem("newEmployeeData");
if (newEmployeeDataString) {
    var newEmployeeData = JSON.parse(newEmployeeDataString);
    addEmployeeToTable(newEmployeeData);
    console.log(newEmployeeData);
    localStorage.removeItem("newEmployeeData");
}
function addEmployeeToTable(newEmployeeData) {
    data.push(newEmployeeData);
    populateTable(data);
}
window.addEventListener("storage", handleStorageEvent);
function handleStorageEvent(event) {
    if (event.key === "newEmployeeData") {
        var newEmployeeData = JSON.parse(localStorage.getItem("newEmployeeData"));
        if (newEmployeeData) {
            data.push(newEmployeeData);
            populateTable(data);
            localStorage.removeItem("newEmployeeData");
        }
    }
}


// Dynamic generation of Alphabetic options


function populateAlphabeticOptions() {

    var outerdiv = document.getElementById("dynamic-filter-div");
    for (var i = 65; i <= 90; i++) {
        var newDiv = document.createElement("div");
        newDiv.className = "boxx alphabet-divs";
        newDiv.id = String.fromCharCode(i);
        newDiv.innerHTML = String.fromCharCode(i);
        newDiv.onclick = function () {
            filterByAlphabet(this.id);
        };
        outerdiv.appendChild(newDiv);
    }


}
// Generate Alphabetic options
populateAlphabeticOptions();

