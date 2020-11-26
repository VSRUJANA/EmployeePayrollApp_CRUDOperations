class EmployeePayRoll 
{
   // getter and setter method
   get id() { return this._id; }
   set id(id) 
   { 
     this._id = id; 
   }
 
   get name() { return this._name; }
   set name(name) 
   { 
     let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
     if (nameRegex.test(name))
       this._name = name; 
     else throw 'invalid name';
   }
 
   get profilePic() { return this._profilePic; }
   set profilePic(profilePic) { 
     this._profilePic = profilePic; 
   }
 
   get gender() { return this._gender; }
   set gender(gender) { 
     this._gender = gender; 
   }
 
   get department() { return this._department; }
   set department(department) { 
     this._department = department; 
   }
 
   get salary() { return this._salary; }
   set salary(salary) { 
     this._salary = salary; 
   }
 
   get note() { return this._note; }
   set note(note) { 
       if(note == "")
       this._note = "Empty"
       else
       this._note = note; 
   }
 
   get startDate() { return this._startDate; }
   set startDate(startDate) 
  { 
    this._startDate = startDate; 
  }
 
   // method
   toString() {
     return "id=" + this._id + ", name='" + this._name + ", gender='" + this._gender + 
            ", profilePic='" + this._profilePic + ", department=" + this._department +
            ", salary=" + this._salary + ", startDate=" + this._startDate.toString("dd/MM/yyyy") + ", note=" + this._note;
   }
}