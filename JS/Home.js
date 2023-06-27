let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHTML();
});

const createInnerHTML = () => {
    const headerHTML = "<th>Profile Pic</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Notes</th><th>Actions</th>";
    let innerHTML = `${headerHTML}`;
    //let empPayrollList = createEmpPayrollJSON();
    for (const empPayrollData of empPayrollList){
        innerHTML = `${innerHTML}
    <tr>
        <td class="profile" alt=""><img src="${empPayrollData._profilePic}"></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHTML(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${empPayrollData._startDate}</td>
        <td>${empPayrollData._note}</td>
        <td>
            <img id="${empPayrollData._id}" onclick="remove(this)" alt="delete" src="../Assets/bin.png" alt="" style="height: 25px; width: 25px;">
            <img id="${empPayrollData._id}" onclick="update(this)" alt="edit" src="../Assets/pencil.png" alt="" style="height: 25px; width: 25px;">
        </td>
    </tr>`;
    }
    document.querySelector('#display').innerHTML = innerHTML;
}

const createEmpPayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Muskaan Sharma',
            _gender: 'Female',
            _department:['HR' , 'Finance'],
            _salary: '30000',
            _startDate: '15 Aug 2019',
            _note: 'Fantastic',
            _id: new Date().getTime(),
            _profilePic: '../Assets/image1.png'
        },
        {
            _name: 'Rohan Singh',
            _gender: 'Male',
            _department:['Finance'],
            _salary: '20000',
            _startDate: '10 Jul 2018',
            _note: 'Handsome',
            _id: new Date().getTime(),
            _profilePic: '../Assets/image002.png'
        }
    ];
    return empPayrollListLocal;
}

const getDeptHTML = (deptList) => {
    let deptHTML = '';
    for (const dept of deptList){
        deptHTML = `${deptHTML}<div class = ""dept label"><mark>${dept}</mark></div>`
    }
    return deptHTML;
}

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node._id);
    if (!empPayrollData) return;
    const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHTML();                                                                                                                                                                                                                                                  
}
