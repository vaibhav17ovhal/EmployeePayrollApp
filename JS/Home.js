window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHTML();
});

const createInnerHTML = () => {
    //let empPayrollList = createEmpPayrollJSON();
    const headerHTML = "<th>Profile Pic</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>"
    let innerHTML = `${headerHTML}`;
    innerHTML = `${innerHTML}
    <tr>
        <td class="profile" alt=""><img src="../Assets/image6.png"></td>
        <td>Vaibhav Ovhal</td>
        <td>Male</td>
        <td>
            <div class="dept-label"><mark>HR</mark> &nbsp; &nbsp;<mark>Developer</mark></div>
        </td>
        <td>50000</td>
        <td>15 - Aug - 2019</td>
        <td>
            <img id="1" onclick="remove(this)" alt="delete" src="../Assets/bin.png" alt="" style="height: 25px; width: 25px;">
            <img id="1" onclick="update(this)" alt="edit" src="../Assets/pencil.png" alt="" style="height: 25px; width: 25px;">
        </td>
    </tr>`;
    document.querySelector('#display').innerHTML = innerHTML;
}

