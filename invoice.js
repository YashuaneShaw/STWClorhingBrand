//  Names:  Cahil Cowan    Jabari Baker    Keyshawn Williams   Amoy Graham     Yashaune Shaw 
//  IDs:    2209746        2303813         2106838             2301112         2304899
//  Teacher: CAnuli
//  Occurrence: Wednesday 8am 


/*
    5.	Invoice Generation: Amoy
        a.	After checkout, generate an invoice with the following details:
            `Name of company`
            `Date of invoice`
            `Shipping information` (from checkout)
            `Invoice number` (unique)
            ‘trn’
            `Purchased items` (name, quantity, price, discount)
            `Taxes`
            `Subtotal`
            `Total cost`

        b.	Append this invoice to the user’s array of invoices (array of objects). Also store the invoice to localStorage with the key called AllInvoices (as an array of objects) to access later.
        
    After generating the invoice
        c.	Optionally, display a message indicating that the invoice has been “sent” to the user’s email.
*/




// Retrieve basket data

let basket = JSON.parse(localStorage.getItem("data")) || [];

let allProducts = JSON.parse(localStorage.getItem("AllProducts")) || [];
    

function generateInvoice() {
    // Retrieve additional data from localStorage
    let activeUSer = localStorage.getItem("activeUSer") || null

    let accounts = JSON.parse(localStorage.getItem('Registered_Data')) || [];

    const shippingInfo = localStorage.getItem("shippingInfo"); // Shipping info from checkout page

    // Generate invoice date and number
    document.getElementById("invoice-date").textContent = new Date().toLocaleDateString();

    document.getElementById("invoice-number").textContent = Math.floor(Math.random() * 1000000);

    // Parse and format the shipping information
    if (shippingInfo) {

        const parsedShippingInfo = JSON.parse(shippingInfo);

        const formattedShippingInfo = `

            <br>&emsp;&emsp;Full Name: ${parsedShippingInfo.fullName}<br> 
            &emsp;&emsp;Address: ${parsedShippingInfo.address}<br>
            &emsp;&emsp;Parish: ${parsedShippingInfo.parish}<br> 
            &emsp;&emsp;City: ${parsedShippingInfo.city}<br>
            &emsp;&emsp;ZIP: ${parsedShippingInfo.zip}

        `;
        document.getElementById("shipping-info").innerHTML = formattedShippingInfo;
    } else {

        document.getElementById("shipping-info").textContent = "Not provided";

    }

    document.getElementById("trn-number").textContent = activeUSer|| "Not provided";

    const invoiceItemsDiv = document.getElementById("invoice-items");

    let subtotal = 0;

    // Populate invoice items and calculate totals
    basket.forEach(item => {
        let product = allProducts.find(p => p.id === item.id);
        if (!product) return;

        const lineTotal = item.item * product.price;
        subtotal += lineTotal;

        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${item.item}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>$${lineTotal.toFixed(2)}</td>
            </tr>
        `;
        invoiceItemsDiv.innerHTML += row;
    });

    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;

    document.getElementById("invoice-subtotal").textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById("invoice-tax").textContent = `Tax (5%): $${tax.toFixed(2)}`;
    document.getElementById("invoice-total").textContent = `Total Amount: $${total.toFixed(2)}`;

    // Save invoice to localStorage
    const invoice = {
        companyName: "STW Clothing Brand",
        invoiceDate: new Date().toLocaleDateString(),
        shippingInfo: shippingInfo,
        invoiceNumber: document.getElementById("invoice-number").textContent,
        trn: activeUSer,
        basket,
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    };

    const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    allInvoices.push(invoice);
    localStorage.setItem("AllInvoices", JSON.stringify(allInvoices));

    const updateInvoice = accounts.find(account => account.trnNumber === activeUSer); //search and create a reference point to update the user invoice array

    if(updateInvoice) {

        updateInvoice.invoices.push(invoice);//add the new invoice information to the user 's invoice array

        localStorage.setItem("Registered_Data", JSON.stringify(accounts));

    }
    else

    {
        alert('Unable to add invoice to account');
    }


}


// Function to send email (simulated)
function sendEmail() {
     alert("Invoice has been sent to your email.");
     window.location.href = 'home.html';  // Redirects to home.html after alert
}

// Generate invoice on page load
window.onload = generateInvoice;
