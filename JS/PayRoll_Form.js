let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function (){
        if(name.value.length == 0){
            textError.textContent = '';
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;;
            textError.textContent = '';
        }
        catch(e){
            textError.textContent = e;
        }
    });
    const salary = document.querySelector('#salary');
    const salaryOutput = document.querySelector('.salary-output-text');
    salaryOutput.textContent = salary.value;
    salary.addEventListener('input', function(){
        salaryOutput.textContent = salary.value;
    });
    checkForUpdate();
});
/*
const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        creatingAndUpdateStorage(employeePayrollData);

    }
    catch (e) {
        return;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    }
    catch (e) {
        setTextValue('.text-error', e)
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name = profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name = gender]').pop();
    employeePayrollData.department = getSelectedValues('[name = department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');

    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollData.StartDate = date;
    
    alert("Employee Payroll date is populated in object: " + employeePayrollData.toString());
    return employeePayrollData;
}
*/
const getSelectedValues = (propertyvalue) => {
    let allItems = document.querySelectorAll(propertyvalue);
    let setItem = [];
    allItems.forEach(item => {
        if (item.checked) setItem.push(item.value);
    });
    return setItem;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}
/*
function creatingAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"))

    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } 
    else {
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
*/
const resetform = () => {
    setValue("#name", '');
    unsetSelectedValues('[name = profile]');
    unsetSelectedValues('[name = gender]');
    unsetSelectedValues('[name = department]');
    setValue("#salary", '');
    setValue("#notes", '');
    setSelectedIndex("#day", 0);
    setSelectedIndex("#month", 0);
    setSelectedIndex("#year", 0);
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelector(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    })
}

const redirect = () => {
    window.location.href = "../Pages/Home.html"; 
}

const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name = profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name = gender]', employeePayrollObj._gender);
    setSelectedValues('[name = department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output-text', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._note);

    let date = (employeePayrollObj.StartDate).split(" ");

    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)){
            if (value.includes(item.value)){
                item.checked = true;
            }
        }
        else if (item.value == value)
            item.checked = true;
    });
}

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetform();
    }
    catch (e) {
        return;
    }
}
const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name = profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name = gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name = department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollObj.StartDate = date;
}

function createAndUpdateStorage () {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if (employeePayrollList) {
        let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
        if (!empPayrollData) {
            employeePayrollList.push(createEmployeePayrollData());
        }
        else {
            const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(empPayrollData._id));
        }
    }
    else {
        employeePayrollList = [createEmployeePayrollData()];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    }
    catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    employeePayrollData.StartDate = employeePayrollObj.StartDate;
    alert(employeePayrollData.toString());
}