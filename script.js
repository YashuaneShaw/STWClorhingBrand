//  Names:  Cahil Cowan    Jabari Baker    Keyshawn Williams   Amoy Graham     Yashaune Shaw 
//  IDs:    2209746        2303813         2106838             2301112         2304899
//  Teacher: CAnuli
//  Occurrence: Wednesday 8am 




/*
    2.	Product Catalogue: Yashaune
        a.	Product List (Using Arrays & Objects)
            i.	Create an array of product objects in JavaScript. Each product should have:
                `name`
                `price`
                `description`
                `image`

        b.	An updated product list must be kept on localStorage, as AllProducts. 
        c.	Display the product list dynamically on the website. 
        d.	Each product should have an “Add to Cart” button.
        e.	Add to Cart:
            i.	Shopping Cart (localStorage and Objects)
                1.	When a user clicks the “Add to Cart” button, add the selected product to the user’s shopping cart. 
                2.	Shopping cart must include, product details along with the taxes, discounts, subtotal and current total cost
*/

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', function () {
    const products = [
        {
            id: 1,
            name: "STW Female Full Suit",
            price: 4500,
            description: "This stylish full suit is designed for comfort and a sleek look, perfect for women who want to make a bold statement. Whether for casual outings or semi-formal events, it combines fashion with functionality.",
            image: "Assets/STW Female Full Suit.jpg",
        },
        {
            id: 2,
            name: "STW Female Sweater Suit",
            price: 5500,
            description: "Keep warm and chic with this elegant sweater suit designed for women. It offers a cozy fit and fashionable appearance, ideal for both relaxation and outdoor activities.",
            image: "Assets/STW Female Sweater.jpg",
        },
        {
            id: 3,
            name: "STW Special Edition Sweater",
            price: 10000,
            description: "Elevate your wardrobe with this exclusive special edition sweater. Crafted for style and comfort, it’s perfect for those looking for something unique.",
            image: "Assets/STW Special Edition Sweater.jpg",
        },
        {
            id: 4,
            name: "STW Special Edition Shorts",
            price: 9500,
            description: "These special edition shorts combine comfort and contemporary fashion. A versatile addition to your wardrobe, whether you’re lounging at home or out for a casual day in the sun.",
            image: "Assets/STW Shorts.jpg",
        },
        {
            id: 5,
            name: "STW Bennie",
            price: 4500,
            description: "A trendy and cozy accessory, the STW Bennie is designed to keep you warm while complementing your casual looks. Available in a range of styles, this item is a must-have for fashion-conscious individuals.",
            image: "Assets/STW Bennie.jpg",
        },
        {
            id: 6,
            name: "STW Cap",
            price: 6000,
            description: "Complete your casual ensemble with this stylish STW Cap. Featuring a sleek design and comfortable fit, it’s perfect for sunny days or adding a sporty edge to your outfit.",
            image: "Assets/STW Cap.jpg",
        },
        {
            id: 7,
            name: "STW White Cap",
            price: 6000,
            description: "This classic white cap offers a clean and simple look for any occasion. A versatile accessory that pairs well with any casual or athletic wear.",
            image: "Assets/STW Wgite Cap.jpg",
        },
        {
            id: 8,
            name: "STW Sweater",
            price: 8000,
            description: "A cozy and fashionable choice for chilly weather, this STW Sweater combines both comfort and style, making it a great addition to your wardrobe.",
            image: "Assets/STW Sweater.jpg",
        },
        {
            id: 9,
            name: "STW Red Bennie",
            price: 4500,
            description: "Add a pop of color to your winter wear with the STW Red Bennie. This vibrant, cozy hat is perfect for staying warm while showcasing your unique style.",
            image: "Assets/STW Red Bennie.png",
        },
        {
            id: 10,
            name: "STW Brown Belt",
            price: 2000,
            description: "A stylish brown belt designed for durability and elegance, making it the perfect accessory for any outfit. This classic piece adds a refined touch to both casual and semi-formal looks.",
            image: "Assets/STW Belt.jpg",
        },
        {
            id: 11,
            name: "STW Black Belt",
            price: 2000,
            description: "A timeless black belt made for versatility and style, suitable for any outfit.",
            image: "Assets/STW Belt 2.jpg",
        },
        {
            id: 12,
            name: "STW Girls Bag",
            price: 5500,
            description: "A stylish bag designed for girls, combining practicality and trendy aesthetics for everyday use.",
            image: "Assets/STW Bag Girls.jpg",
        },
        {
            id: 13,
            name: "STW Bag",
            price: 5000,
            description: "This sleek and durable bag is perfect for carrying essentials in style, whether for work or leisure.",
            image: "Assets/STW Bag.jpg",
        },
        {
            id: 14,
            name: "STW Male Full Suit",
            price: 8000,
            description: "An all-in-one full suit designed for men, offering a blend of sophistication and comfort.",
            image: "Assets/STW Male Full Suit.jpg",
        },
        {
            id: 15,
            name: "STW Male Full Suit 2",
            price: 8000,
            description: "A premium male full suit offering a sophisticated and stylish look for formal occasions, providing a perfect fit and exceptional comfort.",
            image: "Assets/STW Male Full Suit2.jpg",
        },
        {
            id: 16,
            name: "STW Male Full Suit 3",
            price: 8000,
            description: "This modern male full suit combines elegance with contemporary design, making it ideal for business events or formal gatherings.",
            image: "Assets/STW Male Full Suit3.jpg",
        },
        {
            id: 17,
            name: "STW White Bennie",
            price: 4500,
            description: "A comfortable and stylish white bennie featuring sleek 'STW' writing, perfect for casual wear and adding a bold touch to any outfit.",
            image: "Assets/STW White Bennie  Grey Writing.png",
        },
        {
            id: 18,
            name: "STW White Bennie",
            price: 4500,
            description: "This classic white bennie, with its minimalistic design and 'STW' branding, is perfect for adding a cool, laid-back vibe to any casual look.",
            image: "Assets/STW White Bennie.png",
        },
        {
            id: 19,
            name: "STW Sweater 2",
            price: 8500,
            description: "A cozy and stylish sweater, perfect for cooler days. With its premium fabric and timeless design, this sweater offers both warmth and style.",
            image: "Assets/STW Sweater2.jpg",
        },
        {
            id: 20,
            name: "STW Sweater 3",
            price: 8500,
            description: "This modern sweater combines comfort with high-quality fabric, ideal for both casual and semi-formal occasions during the colder months.",
            image: "Assets/STW Sweater3.jpg",
        },
        {
            id: 21,
            name: "STW Sweater 4",
            price: 8500,
            description: "A versatile sweater made from soft, durable material, perfect for layering and providing warmth in style. A must-have in any wardrobe.",
            image: "Assets/STW Sweater4.jpg",
        },
        {
            id: 22,
            name: "STW Sweater 5",
            price: 8500,
            description: "This sleek and fashionable sweater is designed to keep you warm while ensuring you look effortlessly stylish. Ideal for every season.",
            image: "Assets/STW Sweater Cool.jpg",
        },
    ];

    // Store products in localStorage
    localStorage.setItem('AllProducts', JSON.stringify(products));

    // Render products dynamically
    const productList = document.getElementById('product-list');
    products.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('row');
        productDiv.setAttribute('data-product-name', product.name);
        productDiv.setAttribute('data-product-price', product.price);

        productDiv.innerHTML = `
            <div class="row-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="stars">
                <a href="#"><i class="ri-star-fill"></i></a>
                <a href="#"><i class="ri-star-fill"></i></a>
                <a href="#"><i class="ri-star-fill"></i></a>
                <a href="#"><i class="ri-star-fill"></i></a>
                <a href="#"><i class="ri-star-fill"></i></a>
                <a href="#">5/5</a>
            </div>
            <div class="row-in">
                <div class="row-left">
                    <button class="add-to-cart" data-id="${product.id}">
                        Add to cart
                        <i class="ri-shopping-cart-fill"></i>
                    </button>
                </div>
                <div class="row-right">
                    <h6>$${product.price.toFixed(2)}</h6>
                </div>
            </div>
        `;

        productList.appendChild(productDiv);
    });

    // Add to cart functionality
    let basket = JSON.parse(localStorage.getItem("data")) || [];

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            const existingProduct = basket.find(item => item.id === productId);

            if (existingProduct) {
                existingProduct.item += 1; // Increment item quantity
            } else {
                basket.push({ id: productId, item: 1 }); // Add new product to basket
            }

            localStorage.setItem("data", JSON.stringify(basket));
            updateCartCount();
        });
    });

    // Update cart item count
    function updateCartCount() {
        const cartIcon = document.getElementById("cartAmount");
        cartIcon.innerHTML = basket.map(item => item.item).reduce((a, b) => a + b, 0);
    }

    updateCartCount(); // Initial update on page load

    // Toggle search input display
document.getElementById("search-icon").addEventListener("click", function(e) {
    e.preventDefault();
    let searchInput = document.getElementById("search-input");
    searchInput.style.display = searchInput.style.display === "block" ? "none" : "block";
});

document.getElementById("search-input").addEventListener("input", function() {
    let searchTerm = this.value.toLowerCase();
    let products = document.querySelectorAll(".row");

    products.forEach(function(product) {
        let productName = product.getAttribute("data-product-name").toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});
});









