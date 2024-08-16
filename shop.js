
var Products = [
    {
        'id': 1, image: 'Images/IMG-20240623-WA0021-removebg-preview.png', price: 20000, title: 'Black Isi Agu Igbo Fabric'
    },
    {
        'id': 3, image: 'Images/Dl8SFJhWsAAopDN-removebg-preview.png', price: 15000, title: 'Coral Orange Red Neck & Hand Bead'
    },
    {
        'id': 3, image: 'Images/aso ofi multi.png', price: 30000, title: 'Multicolor strip Aso ofi'
    },
    {
        'id': 4, image: 'Images/isi_agu_wine1080x1440.png', price: 20000, title: 'Wine Isi Agu Igbo Fabric'
    },
    {
        'id': 5, image: 'Images/IMG-20240627-WA0016-removebg-preview.png', price: 20000, title: 'Blue Color Hausa Fabric'
    },
    {
        'id': 6, image: 'Images/Ofi7-removebg-preview (1).png', price: 25000, title: 'Silver Red Aso Ofi'
    },
    {
        'id': 7, image: 'Images/beads7-removebg-preview.png', price: 10000, title: 'White Neck Bead'
    },
    {
        'id': 8, image: 'Images/red fabric.webp', price: 20000, title: 'Red Isi Agu Fabric'
    },
    {
        'id': 9, image: 'Images/aso ofi 2.png', price: 25000, title: 'Red Black & White Aso Ofi'
    },
    {
        'id': 10, image: 'Images/IMG-20240627-WA0012__1_-removebg-preview.png', price: 15000, title: 'White Plain Fabric'
    },
    {
        'id': 11, image: 'Images/IMG-20240623-WA0019.jpg', price: 30000, title: 'Red Igbo Isi Agu Fabric'
    },
    {
        'id': 12, image: 'Images/IMG-20240627-WA0019__1_-removebg-preview.png', price: 15000, title: 'Purple Plain Fabric'
    },
    {
        'id': 13, image: 'Images/color aso ofi.png', price: 20000, title: 'MultiColored Aso Ofi'
    },
    {
        'id': 14, image: 'Images/handbeads2-removebg-preview.png', price: 5000, title: 'Blue & Red Hand Bead'
    },
    {
        'id': 15, image: 'Images/handbead3.png', price: 5000, title: 'Cream Coral Orange Red Hand Bead'
    },
    {
        'id': 16, image: 'Images/IMG-20240627-WA0002-removebg-preview.png', price: 20000, title: 'Plain Color Hausa Fabric'
    },
];

const body = document.querySelector('body')
const ProductItem = document.getElementById('ProductItem')
shoppingBasket = document.querySelector('.shoppingBasket')
close = document.querySelector('.close')
prodList = document.querySelector('.prodList')
quantity = document.querySelector('.quantity')
totPrice = document.querySelector('.totPrice')

const inputSearch = document.getElementById('inputSearch');
const searchButton = document.querySelector('.searchButton');

let checkOutList = [];

shoppingBasket.onclick = () => {
    body.classList.add('active')
};

close.onclick = () => {
    body.classList.remove('active')
};



// Function to get products from local storage and combine them with the initial products
function getAllProducts() {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    return [...Products, ...storedProducts];
}


function displayProducts(products) {
    const ProductItem = document.getElementById('ProductItem');
    ProductItem.innerHTML = ""; // Clear existing products
    products.forEach((item) => {
        let div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
            <div class="productItem">
                <div class="overlayDiv">
                    <a href="#!" class="productLink">
                        <img src="${item.image}" alt="${item.title}">
                    </a>
                </div>
                <div class="productInfo">
                    <span class="title">${item.title}</span>
                    <h5>₦${item.price}</h5>
                    <button onclick="addToCart(${item.id})" class="cartBtn">
                         ADD TO CART
               </button> 
                </div>
            </div>
        `;
        ProductItem.appendChild(div);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // Display existing products
    displayProducts(getAllProducts());

    // Handle form submission
    
});



// adding more products to the shop
function addToCart(id) {
    const product = getAllProducts().find(p => p.id === id);
    if (product) {
        const existingProductIndex = checkOutList.findIndex(item => item.id === id);
        if (existingProductIndex === -1) {
            // Product is not in the cart yet
            checkOutList.push({ ...product, quantity: 1 });
        } else {
            // Product is already in the cart
            checkOutList[existingProductIndex].quantity += 1;
        }
        reloadCart();
        saveCartToLocalStorage();
    } else {
        console.error('Product not found'); // Debugging
    }
}




// saving cartItem to LS
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(checkOutList.filter(item => item != null)));
}

// counting inside the cart
function reloadCart() {
    prodList.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    const cartState = [];

    checkOutList.forEach((item, key) => {
        if (item != null) {
            totalPrice += parseInt(item.price * item.quantity);
            count += item.quantity;

            // to get item details on order page
            cartState.push({
                key: key,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            });



            let li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.image}" alt="" srcset="">   
                <div>${item.title}</div>
                <div>₦${item.price}</div>
                <div>
                    <button onclick="change(${key}, ${item.quantity - 1})">-</button>
                    <div class="count">${item.quantity}</div>
                    <button onclick="change(${key}, ${item.quantity + 1})">+</button>
                </div>
            `;
            prodList.appendChild(li);
        }
    });
    totPrice.innerHTML = `<small>SUBTOTAL (${count} items)  :  ₦ </small>` + totalPrice;
    localStorage.setItem('totalAmount', JSON.stringify(totalPrice));
    localStorage.setItem('cartState', JSON.stringify(cartState));
    quantity.innerHTML = count;
}

// The data in the checkout
function change(key, quantity) {
    if (quantity == 0) {
        checkOutList[key] = null;
    } else {
        checkOutList[key].quantity = quantity;
    }
    reloadCart();
    saveCartToLocalStorage(); 
}

// getting cartitem from local storage
function loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        checkOutList = JSON.parse(cartData);
        reloadCart();
    }
}
loadCartFromLocalStorage();

searchButton.addEventListener('click', (e) => {
    let searchValue = inputSearch.value;

    if (searchValue !== "") {
        let searchCategory = Products.filter(function (item) {
            return item.title.toLowerCase().includes(searchValue.toLowerCase());
        });

        if (searchCategory.length > 0) {
            displayProducts(searchCategory);
        } else {
            alert("No products found!");
            displayProducts(Products);
        }

        inputSearch.value = "";
    } else {
        alert("Please input a title!");
    }
});











