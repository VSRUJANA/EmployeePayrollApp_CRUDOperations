let employeePayrollList;

// Event listener when HTML page contents are loaded
window.addEventListener('DOMContentLoaded',(event)=>
    {
        employeePayrollList = GetEmployeeDataLocalStorage();
        CreateEmployeeTable();
    }
);

//Insert content to the html table using js
function CreateEmployeeTable()
{
    const headerHTML = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    let innerHTML = `${headerHTML}`;
    for(const employeePayrollData of employeePayrollList)
    {
        innerHTML = `${innerHTML}       
        <tr>
        <td><img alt = "" src="${employeePayrollData._profilePic}"></td>
        <td>${employeePayrollData._name}</td>
        <td>${employeePayrollData._gender}</td>
        <td>${GetDepartment(employeePayrollData._department)}</td>
        <td>${employeePayrollData._salary}</td>
        <td>${GetDate(employeePayrollData._startDate)}</td>
        <td>
            <img class="action-label" id="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete.svg">
            <img class="action-label" id="${employeePayrollData._id}" onclick="update(this)" alt="edit" src="../assets/icons/create.svg">
        </td>
        </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHTML;
}

//Get data from local storage
function GetEmployeeDataLocalStorage()
{
    return localStorage.getItem('EmployeePayrollList')?
                    JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
}

//Get departments for a employee to display on HTML page
function GetDepartment(deptList)
{
    let departments = '';
    for(const dept of deptList)
    {
        departments = `${departments} <div class='dept-label'>${dept}</div>`
    }
    return departments;
}

//Get date in particular format
function GetDate(startDate)
{
    let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let date = new Date(startDate);
    return date.getDate()+" "+month[date.getMonth()]+" "+date.getFullYear();
}

//Remove employee from table
function remove(node)
{
    let empData = employeePayrollList.find(emp=>emp._id == node.id);
    let index = employeePayrollList.map(emp=>emp._id).indexOf(empData._id);
    employeePayrollList.splice(index,1);
    localStorage.setItem('EmployeePayrollList',JSON.stringify(employeePayrollList));
    CreateEmployeeTable();
}

/*
const createJsonFile = () =>
{
    let empPayrollList = [
        
        {
            _name:'Srujana Valavala',
            _gender:'Female',
            _department:['Finance','Sales'],
            _salary:'350000',
            _startDate:'18 Sep 2020',
            _note:'',
            _profilePic:'../assets/ProfilePics/Ellipse -7.png',
            _id:new Date().getTime()
        },
        {
            _name:'Devrath Dixit',
            _gender:'Male',
            _department:['HR','Sales','Finance'],
            _salary:'500000',
            _startDate:'24 Oct 2019',
            _note:'',
            _profilePic:'../assets/ProfilePics/Ellipse -5.png',
            _id:new Date().getTime()
        },
        {
            _name:'Sumanjali Gidda',
            _gender:'Female',
            _department:['Sales'],
            _salary:'450000',
            _startDate:'28 Jan 2018',
            _note:'',
            _profilePic:'../assets/ProfilePics/Ellipse -1.png',
            _id:new Date().getTime()
        },
        {
            _name:'Tony Stark',
            _gender:'Male',
            _department:['Engineer','Analyst','HR'],
            _salary:'250000',
            _startDate:'12 Jul 2019',
            _note:'',
            _profilePic:'../assets/ProfilePics/Ellipse -2.png',
            _id:new Date().getTime()
        },
        {
            _name:'Steve Rogers',
            _gender:'Male',
            _department:['Logistics'],
            _salary:'350000',
            _startDate:'16 Dec 2017',
            _note:'',
            _profilePic:'../assets/ProfilePics/Ellipse -8.png',
            _id:new Date().getTime()
        },
        {
            _name:'Sowjanya Buddaraju',
            _gender:'Female',
            _department:['HR','Analyst'],
            _salary:'350000',
            _startDate:'22 May 2019',
            _note:'',
            _profilePic:'../assets/ProfilePics/Ellipse -4.png',
            _id:new Date().getTime()
        },
        {
            _name:'Ravi Yeluri',
            _gender:'Female',
            _department:['HR'],
            _salary:'500000',
            _startDate:'18 Feb 2016',
            _note:'',
            _profilePic:'../assets/ProfilePics/Ellipse -3.png',
            _id:new Date().getTime()
        }
    ]
    return empPayrollList;
}
*/
