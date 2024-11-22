//  Names:  Cahil Cowan    Jabari Baker    Keyshawn Williams   Amoy Graham     Yashaune Shaw 
//  IDs:    2209746        2303813         2106838             2301112         2304899
//  Teacher: CAnuli
//  Occurrence: Wednesday 8am 


/*
    6.	Additional Functionality: everyone
        a.	ShowUserFrequency() – Show’s user requency based on Gender and Age Group:
            i.	show how many registered users fall under specific gender categories (e.g. Male, Female, Other)
            ii.	show how many registered users fall under different age groups (e.g., 18-25, 26-35, 36-50, 50+).
            iii.	Display this data on a dashboard or a separate page. 
        b.	ShowInvoices() - displays all invoices and allow the visitor to search for any of the invoices (using trn) stored in AllInvoices from localStorage using console.log().
        c.	GetUserInvoices() – displays all the invoices for a user based on trn stored in the localStorage key called, RegisterData. 
*/


//Function to check for the number of different genders that have made a account 
let males = document.getElementById('malecount');
let females = document.getElementById('femalecount');
let others = document.getElementById('othercount');

function DashBoardCount(){
    let users = JSON.parse(localStorage.getItem('Registered_Data')) || [];
    const genderCount = countGender(users);

    document.getElementById('male').style.width = (genderCount.male * 100) + "px";
    document.getElementById('female').style.width = (genderCount.female * 100) + "px";
    document.getElementById('other').style.width = (genderCount.other * 100) + "px";

    showInvoices();

    ageCalculations(users);
    males.textContent = genderCount.male;
    females.textContent = genderCount.female;
    others.textContent = genderCount.other;
}


function countGender(users){

    let blueCount= 0;
    let pinkCount = 0;
    let otherCount = 0;

    users.forEach(account => {

        if(account.regGender === "Male"){
            blueCount++;
        }
        if(account.regGender === "Female"){
            pinkCount++;
        }
        if(account.regGender === "Other"){
            otherCount++;
        }

    });

    console.log(blueCount);//test function to ensure that data  is being read from local storage and  gender is being counted correctly
    console.log(pinkCount);
    console.log(otherCount);



    return { male: blueCount , female: pinkCount, other: otherCount };


}


//Function to get the number of users in the different age groups
function ageCalculations(users){
    

    let groupA = document.getElementById("groupA");
    let groupB = document.getElementById("groupB");
    let groupC = document.getElementById("groupC");
    let groupD = document.getElementById("groupD"); 

    // users = JSON.parse(localStorage.getItem('Registered_Data')) || [];

    let groupsA = 0;
    let groupsB = 0;
    let groupsC = 0;
    let groupsD = 0;

    users.forEach(account => {//loop over all existing accounts in local storage
        

        let dob =  new Date(account.Dob);

        let today = new Date();
    
    
        let age =  today.getFullYear() - dob.getFullYear();
        let month = today.getMonth() - dob.getMonth();
        let day = today.getDate() - dob.getDate();
    
        if (month < 0 || (month === 0 && day < 0)) {
            age--;
        }

        if(age >= 18 && age <= 25){ groupsA++;}

        if(age >= 26 && age <= 35){groupsB++;}
        
        if(age >= 36 && age <= 50){groupsC++;}
        
        if(age > 50){ groupsD++;}
       

    });
    console.log(groupA);

    groupA.innerHTML = groupsA;
    groupB.innerHTML = groupsB;
    groupC.innerHTML = groupsC;
    groupD.innerHTML = groupsD;


}

// window.onload

//------------------------------------------SHOW ALL INVOICES IN THE CONSOLE LOG ------------------------------------------
function showInvoices() {
    try {
        let invoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];
        invoices.forEach(invoice => {
            console.log(invoice);
        });
    } catch (error) {
        console.error('Error parsing invoices from localStorage:', error);
    }
}

//------------------------------------------------GetUserIncoices----------------------------------------------------------
function getUserInvoices(event) {
    event.preventDefault(); // Prevent form submission and page reload.

    try {
        // Retrieve the TRN from the search input field.
        let searchTRN = document.getElementById('search').value;

        // Reference the display element.
        const display = document.getElementById('display');

        // Clear previous results.
        display.innerHTML = '';

        // Retrieve and parse user data from localStorage.
        let Registered_Data = JSON.parse(localStorage.getItem('Registered_Data')) || [];

        // Find the user by TRN.
        let user = Registered_Data.find(user => user.trnNumber === searchTRN);

        if (!user) {
            // If no user is found, display a message.
            display.innerHTML = '<p>No user found with this TRN.</p>';
            return;
        }

        // Check if the user has invoices.
        if (!user.invoices || user.invoices.length === 0) {
            display.innerHTML = `<p>No invoices found for user with TRN: ${searchTRN}</p>`;
            return;
        }

        // Display the user's invoices.
        user.invoices.forEach(invoice => {
            display.innerHTML += `
                <div>
                    <p><strong>Invoice ID:</strong> ${invoice.invoiceNumber}</p>
                    <p><strong>Amount:</strong> ${invoice.total}</p>
                    <p><strong>Date:</strong> ${invoice.invoiceDate}</p>
                    <hr>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error retrieving invoices:', error);
        display.innerHTML = '<p>An error occurred while retrieving invoices. Please try again.</p>';
    }
}
