//  Names:  Cahil Cowan    Jabari Baker    Keyshawn Williams   Amoy Graham     Yashaune Shaw 
//  IDs:    2209746        2303813         2106838             2301112         2304899
//  Teacher: CAnuli
//  Occurrence: Wednesday 8am 


/* 1.	User Authentication (LocalStorage)
 a.	Registration Page: Keyshawn
    i.	create a registration form where users can enter their first name, last name, date of birth, gender, phone number, email, tax registration number (trn), and password, etc. 
        Validate the form to ensure:
    ii.	all fields are filled (HTML validation). 
    iii.	passwords should be at least 8 characters long.
    iv.	visitor must be over 18 years old to register. Calculate using JavaScript.
    v.	trn is unique; must be of length and in the format (000-000-000). **trn is used instead of a username with login.
    vi.	store registration information (ie. first name, last name, date of birth, gender, phone number, email, tax registration number (trn), password, date of registration, cart{}, invoices[]) as a JavaScript object. Each registration record must be appended to localStorage key called RegistrationData using JavaScript (as an array of objects.)
 
Include the following buttons: 
    vii.	Register (used to stored registration form data) 
    viii.	Cancel (used to clear data from the registration form)
*/


//<<----------------------------------------------------------Registration-------------------------------------------------------------------------->>
let Registered_Data = [];
let activeUSer;

function RegistrationData(event){
    event.preventDefault();

    try{//error  handling

        let trnNumber = document.getElementById('trnNumber').value;
        let firstName  = document.getElementById('first_name').value;
        let lastName = document.getElementById('last_name').value;
        let email = document.getElementById('reg_email').value;
        let password = document.getElementById('reg_password').value;
        let confirmPassword = document.getElementById('reg_password2').value;
        let  phoneNumber = document.getElementById('reg_phone').value;
        let regGender  = document.getElementById('gender').value;
        let Dob =  document.getElementById('date').value;


        const pass_notice =  document.getElementById('pass_notice');
        const trn_notice =  document.getElementById('TRN_notice');

        let accounts = JSON.parse(localStorage.getItem('Registered_Data')) || [];//check if Registered_Account already exist in local storage, if not initialized account as an array 


        //validation to ensure that no  field is empty
        if (trnNumber == "" || firstName == "" || lastName == "" || email == "" ||  password == "" 
                || confirmPassword == "" || phoneNumber == "" || regGender == "" || Dob == ""){
                alert("Please fill all the fields");
        }

        
        //validation for the trn pattern
        //because of the event.preventDefualt function the form would not perform any built in validations 
        let trnPattern = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/;
        if (!trnPattern.test(trnNumber)) {
                alert("Invalid TRN format. Use the format: 000-000-000");
                trn_notice.innerHTML =  "Invalid TRN format. Use the format: 000-000-000 <p> Please ensure to include  the hyphens (after every 3 digits) in the correct position.";

                trn_notice.focus();// ensure the user is taken to the error in the form for the trn entry 

                return; // Stop execution if pattern doesn't match
        }


        
       

        if (accounts.some(account => account.trnNumber === trnNumber)) {
                //.some returns a boolean check, if an account with the trn already exist then the  function will return true
                //and execute the folloing message 
                alert("An account with this TRN already exists.");
                return; // Stop execution if TRN is duplicate
        }

        if(!validationPassword(password)){
                alert("Password must be at least 8 characters long.");
                pass_notice.innerHTML =  "Password must be at least 8 characters long.";
                password.value = '';
                password.focus();
                return; // Stop execution if password is too short

        }

        if(!ageValidation(Dob)){//validate if the person creating a new account is  18 years old or older

                alert("Invalid Date of Birth");
                return; // Stop execution if date of birth is invalid
        }

        if(password !==  confirmPassword){//validate  if the password and confirm password are not the same

                alert("Password and Confirm Password do not match");
                return;
        }

        let userId ='00000'+ (accounts.length + 1);//create a unique ID number for each customer 


        
        accounts.push({
                "UserId":  userId,
                "trnNumber": trnNumber,
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password,
                "phoneNumber": phoneNumber,
                "regGender": regGender,
                "Dob": Dob,

                dateOfRegistration: new Date().toISOString(), // Capture current date/time
                cart: {}, // Empty cart object
                invoices: [] // Empty invoices array
        });


        localStorage.setItem('Registered_Data', JSON.stringify(accounts));
        alert('Account created');
        window.location.href = "index.html";


    }catch(error){//catch  any error that may occur during the execution of the function

        console.error('Error, Unable  to create account: ' +error);//message to indicate  that an error has occurred and  the error is logged in the console and what function caused it
        alert('Error, Unable to create account');
    }


}

function ageValidation(Dob){//function to  validate if the person creating a new account is 18 years old or older

    let dob =  new Date(Dob);

    let today = new Date();


    let age =  today.getFullYear() - dob.getFullYear();
    let month = today.getMonth() - dob.getMonth();
    let day = today.getDate() - dob.getDate();

    if (month < 0 || (month === 0 && day < 0)) {
        age--;
    }

    if(age <  18){
        return false;
    }else{
        return true;
    }


}

function validationPassword(pass){// validation point for the password to ensure that it is 8 characters or more 

    if(pass.length < 8){
        return false;
    }else{
        return true;
    }

}




/*
    b.	Login Page:Keyshawn
        i.	create a login form where visitors can enter their trn and password provided at registration.
        ii.	validate this login data by checking the currently entered trn and password against data associated with the localStorage key called, RegistrationData. 
        iii.	a visitor is given three (3) attempts to enter a correct trn and password. If login is successful, redirect the user to the product catalog. Otherwise, redirect the user to an error/account locked page.

    Include the following:
        iv.	Login button (validate user login information)
        v.	Cancel button (used to clear data from the Login form)
        vi.	Reset Password hyperlink (used to allow the user to change their password that is associated with the localStorage key called, RegistrationData by matching their trn.
*/


//<<----------------------------------------------------------LOGIN-------------------------------------------------------------------------->>
let attempt =  0;

function login(event){
    event.preventDefault();

    try{

        let account =  JSON.parse(localStorage.getItem('Registered_Data')) || [];

        let userTRN =  document.getElementById('log_trn').value;
        let userPassword = document.getElementById('log_pass').value;
    
        let user =  account.find(account => account.trnNumber === userTRN && account.password === userPassword);
    
        if(!user){
            alert('Invalid TRN or Password');
            attempt++;
            console.log("attempts" +attempt);
        }
    
        if(attempt === 3){
            alert('Account Locked');
            attempt = 0; //ensure that attempt is reset
            window.location.href = "Error.html"
        }
        if(user){
            alert('Login Successfull');
            localStorage.setItem('activeUSer', user.trnNumber);
            window.location.href = "Home.html";
        }

    }catch(error){
        console.log("error at login function" +error);
        alert('Unable to log  in, please try again.');

    }



}

//<<----------------------------------------------------------RESET PASSWORD-------------------------------------------------------------------------->>

function resetPassword(event){
    event.preventDefault();

    try{

        let trn =  document.getElementById('reset_TRN').value;
        let newPassword = document.getElementById('reset_pass').value;
        let confirmPassword = document.getElementById('reset_pass2').value;

        if(trn === ''  || newPassword === '' || confirmPassword === ''){
            alert('Please fill all fields');
            return;
        
        }


        if(!validationPassword(newPassword)){//validate the length  of the password

                alert("Password must be at least 8 characters long.");
                return; // Stop execution if password is too short
        }

        let accounts =   JSON.parse(localStorage.getItem('Registered_Data')) || [];

        let user =  accounts.find(user => user.trnNumber === trn );


        if (!user) {//if  the user does not exist

                alert("Invalid TRN. No account found.");
                return;
        }

        if(user.password === newPassword){//ensure that  the password is not the same as the current one

                alert('Password cannot match previous password');
                newPassword.reset();
                return;

        }

        if(newPassword !==  confirmPassword){//validate  password and confirm password

                alert('Password do not match');
                return;
        }

        user.Password = newPassword;

        localStorage.setItem('Registered_Data', JSON.stringify(accounts));

        alert('Password Successfully reset');
        window.location.href = "index.html";
    }catch(error){
        console.log("Error at reset password function" +error);
        alert('Error resetting password');

    }


}