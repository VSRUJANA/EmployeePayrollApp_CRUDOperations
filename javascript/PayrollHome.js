window.addEventListener('DOMContentLoaded', ()=>
{
    createEmployeeTable();
});
const createEmployeeTable = () =>
{
    let empPayrollList = createJsonFile();
    const headerHTML = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    let innerHtml = `${headerHTML}`;
    for(const empPayrollData of empPayrollList)
    {
        innerHtml = `${innerHtml}  
         <tr>
            <td><img alt="profilePic" src="${empPayrollData._profilePic}"></td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>
            ${getDeptHtml(empPayrollData._department)}
            </td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
            <img class="action-label" id="${empPayrollData.id}" onclick="remove(this)" src="../assets/icons/delete.svg">
            <img class="action-label" id="${empPayrollData.id}" onclick="update(this)" src="../assets/icons/create.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
} 

const getDeptHtml = (deptList) => 
{
    let deptHtml = '';
    for (const dept of deptList) 
    {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

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