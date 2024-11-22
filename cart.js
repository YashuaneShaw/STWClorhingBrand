//  Names:  Cahil Cowan    Jabari Baker    Keyshawn Williams   Amoy Graham     Yashaune Shaw 
//  IDs:    2209746        2303813         2106838             2301112         2304899
//  Teacher: CAnuli
//  Occurrence: Wednesday 8am 



/*
    3.	Cart Page: Jabari
        a.	Create a shopping cart page that lists the items in the cart (name, price, quantity, sub-total, discount, tax, and total, etc).
        b.	Allow users to remove items from the cart and update quantities.
        c.	Calculate and display the total price of the items in the cart.

    Include:
        d.	Clear All button (remove all items from shopping cart)
        e.	Check Out button (redirects to Checkout Page)
        f.	Close button (close the shopping cart view) 
*/

// Elements
let label = document.getElementById('label');

let shoppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Update the cart item count on all pages where the cart badge appears
let calculation = () => {

    let cartAmount = basket.map((x) => x.item).reduce((x, y) => x + y, 0); // Calculate the total number of items in the cart

    document.getElementById("cartAmount").innerHTML = cartAmount; // Update the cart badge
};

// Generate Cart Items in the cart page

let generateCartItems = () => {

    if (basket.length !== 0) {

        shoppingCart.innerHTML = basket.map((x) => {

            let { id, item } = x;

            let allProducts = JSON.parse(localStorage.getItem("AllProducts"));

            let search = allProducts.find(product => product.id === id); // Find product by ID

            if (!search) return ''; // Handle missing product case

            let { image, name, price } = search;

            return `
                <div class="cart-item">
                    <img width="150" src="${image}" alt="${name}">
                    <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${name}</p>
                                <p class="cart-item-price">$${price.toFixed(2)}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-trash"></i> <!-- Trash icon to remove item -->
                        </div>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i> <!-- Decrement button -->
                            <div id="${id}" class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i> <!-- Increment button -->
                        </div>
                        <h3>$${(item * price).toFixed(2)}</h3> <!-- Total price for this item -->
                    </div>
                </div>
            `;
        }).join("");

        calculateTotals(); // Update subtotal, discount, and total

    } else {

        shoppingCart.innerHTML = '';

        label.innerHTML = `
            <h2 class="cart-empty">Cart is Empty</h2>
            <a href="Product.html"><button class="HomeBtn">Back to product page</button></a>
        `;
    }
    
};

// Increment item in cart
let increment = (id) => {
    let selectedItem = basket.find((x) => x.id === id); // Find the selected item by its ID
    if (selectedItem) {
        selectedItem.item += 1; // Increment the item count
    } else {
        basket.push({ id, item: 1 }); // If the item isn't in the basket, add it with a quantity of 1
    }
    generateCartItems(); // Update the cart items display
    localStorage.setItem("data", JSON.stringify(basket)); // Save the updated basket to localStorage
    calculation(); // Update the cart badge count
};

// Decrement item in cart
let decrement = (id) => {
    let selectedItem = basket.find((x) => x.id === id); // Find the selected item by its ID
    if (selectedItem && selectedItem.item > 1) {
        selectedItem.item -= 1; // Decrease the item count if it's greater than 1
    } else {
        basket = basket.filter((x) => x.id !== id); // Remove the item from the basket if quantity is 1
    }
    generateCartItems(); // Update the cart items display
    localStorage.setItem("data", JSON.stringify(basket)); // Save the updated basket to localStorage
    calculation(); // Update the cart badge count
};

// Remove item from cart
let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id); // Remove the item from the basket based on its ID
    generateCartItems(); // Update the cart items display
    localStorage.setItem("data", JSON.stringify(basket)); // Save the updated basket to localStorage
    calculation(); // Update the cart badge count
};

// Clear the entire cart
let clearCart = () => {
    basket = []; // Empty the basket
    generateCartItems(); // Update the cart items display
    localStorage.setItem("data", JSON.stringify(basket)); // Save the empty basket to localStorage
    calculation(); // Update the cart badge count
};

// Calculate and display subtotal, discount, and total
let calculateTotals = () => {
    if (basket.length !== 0) {
        let allProducts = JSON.parse(localStorage.getItem("AllProducts"));
        let subtotal = basket
            .map((x) => {
                let product = allProducts.find((product) => product.id === x.id);
                return product ? product.price * x.item : 0;
            })
            .reduce((x, y) => x + y, 0);

        let discount = subtotal > 100 ? 10 : 0; // Example discount: $10 off if subtotal > $100
        let total = subtotal - discount;

        label.innerHTML = `
            <h2 class="subtotal">Subtotal: $${subtotal.toFixed(2)}</h2>
            <h2 class="discount" >Discount: $${discount.toFixed(2)}</h2>
            <h2 class="total" >Total: $${total.toFixed(2)}</h2>
            <button onclick="checkout()" class="checkout-btn">Check Out</button>
            <button onclick="clearCart()" class="clear-btn">Clear Cart</button>
           <button onclick="closeCart()" class="close-btn">Close</button>
            `;
    } else {
        label.innerHTML = ''; // Clear totals if the basket is empty
    }
};


// Checkout function
let checkout = () => {
    if (basket.length === 0) {
        alert("Your cart is empty!");
    } else {
        window.location.href = 'checkout.html'
    }
};

// Close Cart (example for modal)
let closeCart = () => {
    window.location.href = 'Product.html'; // This will take the user to the home page 
};

// Initialize
generateCartItems();
calculation();
