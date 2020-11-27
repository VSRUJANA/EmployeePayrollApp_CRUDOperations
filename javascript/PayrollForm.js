let isUpdate = false;
let empPayrollObject = {};

window.addEventListener('DOMContentLoaded', (event) => 
{
    // Event listener for Name
    const name = document.querySelector('#name'); 
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() 
    {
        if(name.value.length == 0) 
        { 
            textError.textContent = ""; 
            return; 
        } 
        try 
        {
            (new EmployeePayRoll()).name = name.value;
            textError.textContent = "";
        }
        catch (e) 
        {
            textError.textContent = e;
        }
    });

    // Event listener for Salary
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function()
    {
        output.textContent = salary.value; 
    });
    
    CheckForUpdate();
});

// Check for update
function CheckForUpdate()
{
    let empUpdate = localStorage.getItem('EditEmployee');
    isUpdate = empUpdate?true:false;
    if(!isUpdate) return;
    empPayrollObject = JSON.parse(empUpdate);
    SetForm();
}

//Set the form if update is true
function SetForm()
{
    document.querySelector('#name').value = empPayrollObject._name;
    document.querySelector('.name-error').textContent = '';
    SetSelectedValues('[name=profile]',empPayrollObject._profilePhoto);
    SetSelectedValues('[name=gender]',empPayrollObject._gender);
    SetSelectedValues('[name=department]',empPayrollObject._department);
    document.querySelector('#salary').value = empPayrollObject._salary;
    document.querySelector('#notes').value = empPayrollObject._notes;
    SetDate(empPayrollObject._startDate);
}

function SetSelectedValues(property,value)
{
    document.querySelectorAll(property).forEach(item=>
    {
        if(Array.isArray(value))
        {
            if(value.includes(item.value))
                item.checked = true;
        }
        else if(item.value === value)
        {
            item.checked = true;
        }
    });    
}

function SetDate(startDate)
{
    let date = new Date(startDate);
    let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    document.querySelector('#day').value = date.getDate();
    document.querySelector('#month').value = month[date.getMonth()];
    document.querySelector('#year').value = date.getFullYear();
}

// Display appropriate value of salary
function ResetValue()
{
    const output = document.querySelector('.salary-output');
    output.textContent = 400000;
}

const save = (event) => 
{
    event.preventDefault();
    event.stopPropagation();
    try
    {
        CreateAndUpdateStorage(); 
        Reset();  
        window.location.replace("../pages/HomePage.html")
    }
    catch(e)
    {
        alert(e);
    }
}

function SaveToLocalStorage(employeeData)
{
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined)
    {
        employeePayrollList.push(employeeData);
    }
    else
    {
        employeePayrollList = [employeeData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
    alert("Employee added successfully!");
}

// Save data to local HTML Storage
function CreateAndUpdateStorage()
{
    let employeeList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    
    if(employeeList)
    {
        let empData = employeeList.find(item=>item._id == empPayrollObject._id);
        if(!empData)
        {
            employeeList.push(CreateNewEmployee());
        }
        else
        {
            let index = employeeList.map(data=>data._id).indexOf(empData._id);
            employeeList.splice(index,1,CreateNewEmployee(empData._id)); 
        }          
    }
    else
    {
        employeeList = [CreateNewEmployee()];
    }
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeeList));
}

//Create new employee
const CreateNewEmployee = (id)=>
{
    let employee = new Employee();
    if(!id)employee.Id = GetNewId();
    else employee.Id = id;
    SetEmployeePayrollObject(employee);
    return employee;
}

//Set the objects with values from the form
function SetEmployeePayrollObject(employee)
{
    employee.Name = document.getElementById('name').value; 
    empPayrollObject._name = employee.Name;  

    let profile = document.getElementsByName('profile');       
    for(i = 0; i < profile.length; i++)
    {
        if(profile[i].checked)
            employee.ProfilePhoto = profile[i].value;
    }  
    empPayrollObject._profilePhoto = employee.ProfilePhoto;

    let gender = document.getElementsByName('gender');
    for(i = 0; i < gender.length; i++)
    {
        if(gender[i].checked)
            employee.Gender = gender[i].value;
    } 
    empPayrollObject._gender = employee.Gender;

    let empDepartment = new Array();
    let department = document.getElementsByName('department');
    for(i = 0; i < department.length; i++)
    {
        if(department[i].checked)
            empDepartment.push(department[i].value);
    } 
    employee.Department = empDepartment;
    empPayrollObject._department = empDepartment;

    employee.Salary = document.getElementById('salary').value; 
    empPayrollObject._salary = employee.Salary;
    
    let startDate = new Date(document.querySelector('#year').value+"-"+document.querySelector('#month').value+"-"+document.querySelector('#day').value);
    employee.StartDate = startDate;
    empPayrollObject._startDate = startDate;

    employee.Notes = document.querySelector('#notes').value;
    empPayrollObject._notes = employee.Notes; 
}

//Get id method
function GetNewId()
{
    let empId = localStorage.getItem('EmployeeID');
    empId = !empId ? 1:(parseInt(empId)+1).toString();
    localStorage.setItem('EmployeeID',empId);
    return empId;
}