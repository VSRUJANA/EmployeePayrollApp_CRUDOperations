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
});


// Display appropriate value of salary
function ResetValue()
{
    const output = document.querySelector('.salary-output');
    output.textContent = 400000;
}

const save = () => 
{
    try 
    {
        let employeePayrollData = CreateEmployeePayroll();
        SaveToLocalStorage(employeePayrollData);
        return;
    }
    catch (e) 
    {
        return;
    }
}

// Create an object of Employee class
function CreateEmployeePayroll()
{ 
    try
    {
        let employeePayrollData = new EmployeePayRoll();   
        let existingList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
        employeePayrollData.id = (existingList == null) ? 1 : existingList.length + 1;
        employeePayrollData.name = getInputElementValue('#name');
        employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
        employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
        employeePayrollData.department = getSelectedValues('[name=department]');
        employeePayrollData.salary = getInputElementValue('#salary');
        employeePayrollData.note = getInputElementValue('#notes');
        let date = getInputElementValue('#year') + "," + getInputElementValue('#month') + "," + getInputElementValue('#day');
        employeePayrollData.startDate = new Date(date)
        return employeePayrollData;
    }
    catch(e)
    {
        alert(e);
    }
}

function getSelectedValues(propertyValue)
{
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach(item => 
    {
        if (item.checked)
            selectedItems.push(item.value);
    });
    return selectedItems;
}
            
const getInputElementValue = (id) =>
{
    let value = document.querySelector(id).value;
    return value; 
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