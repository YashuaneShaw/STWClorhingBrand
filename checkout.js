//  Names:  Cahil Cowan    Jabari Baker    Keyshawn Williams   Amoy Graham     Yashaune Shaw 
//  IDs:    2209746        2303813         2106838             2301112         2304899
//  Teacher: CAnuli
//  Occurrence: Wednesday 8am 


/*
    4.	Checkout Page: Kevin
    Checkout
        a.	Show a summary of the shopping cart with the total cost.
        b.	Allow the user to enter their shipping details (e.g., name, address, amount being paid).
        c.	When the user confirms the checkout, generate an invoice.

    Include:
        d.	Confirm button (confirms the checkout)
        e.	Cancel button (go back to the cart)
*/


// Retrieve basket data
let basket = JSON.parse(localStorage.getItem("data")) || [];
let allProducts = JSON.parse(localStorage.getItem("AllProducts")) || [];

// Elements
let summaryContainer = document.querySelector('.summary');
let totalQuantityElement = document.getElementById('total-quantity');
let totalPriceElement = document.getElementById('total-price');

// Generate Cart Summary
let generateCartSummary = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    let discount = 0.1;

    summaryContainer.innerHTML = `
        <div class='shopping'><strong>Shopping Cart Summary</strong> </div>
        ${basket.map(item => {
            let product = allProducts.find(p => p.id === item.id);
            if (!product) return ''; // Skip if the product is missing
            let { name, price } = product;
            
            totalQuantity += item.item;
            totalPrice += item.item * price - discount;

            return `<div>${name} - Qty: ${item.item}, Price: $${(item.item * price).toFixed(2)}</div>`;
        }).join('')}
    `;

    totalQuantityElement.innerHTML = `Total Quantity: ${totalQuantity}`;
    totalPriceElement.innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;
};

// Cancel Button
document.getElementById('close-btn').addEventListener('click', function()
{
    window.location.href = 'cart.html'; // Redirect to cart page
});

// Confirm Button
document.getElementById('confirm-btn').addEventListener('click', function(event)
{
    event.preventDefault();
    let account =  JSON.parse(localStorage.getItem('Registered_Accounts')) || [];

    // Collect user inputs
    const fullName = document.getElementById('fullName').value;
    const address = document.getElementById('street-address').value;
    const parish = document.getElementById('parish').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip-code').value;

    if (!fullName || !address || !parish || !city || !zip)
    {
        alert('Please fill out all fields.');
        return;
    }

    // Store the shipping details in localStorage
    const shippingInfo = {
        fullName,
        address,
        parish,
        city,
        zip
    };
    localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
    
    window.location.href = 'invoice.html'; // Redirect to cart page
})

generateCartSummary();

