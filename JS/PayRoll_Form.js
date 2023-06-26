window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input' , function(){
        if(name.value.length == 0){
            textError.textContent = '';
            return
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
});

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
    employeePayrollData.date = Date.parse(date);
    alert("Employee Payroll date is populated in object: " + employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyvalue) => {
    let allItems = document.querySelectorAll(propertyvalue);
    let setter = [];
    allItems.forEach(item => {
        if (item.checked) setter.push(item.value);
    });
    return setter;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

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

const resetform = () => {
    setValue("#name", '');
    unsetSelectedValues('[name = profile]');
    unsetSelectedValues('[name = gender]');
    unsetSelectedValues('[name = department]');
    setValue("#salary", '');
    setValue("#notes", '');
    setValue("#day", '');
    setValue("#month", '');
    setValue("#year", '');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelector(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    })
}

const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
}
