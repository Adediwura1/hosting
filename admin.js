
$(document).ready(function(){
    $('#menu-btn').click(function(){
        $('#menu').toggleClass("active")
    })
    })
 
    let Menu = document.getElementById('Menu-Id');
    function toggleMenu (){
        Menu.classList.toggle("open-menu");
    }


    const Dashboard = document.getElementById("Nav_Dashboard")
    const New_Products = document.getElementById("Nav_add_product")
    const Review = document.getElementById("Nav_customers")
    const Profile = document.getElementById("Profile")
    const Orders = document.getElementById('Nav_Order_list')
    
    let interface = document.querySelector(".interface")
    let orderPage = document.querySelector('.orderConfirmation')
    let Product_Container = document.querySelector(".product_container")
    let Review_body = document.querySelector(".Review-page")
    let Profile_body = document.querySelector(".profile-body")
   Dashboard.addEventListener("click",()=>{
    interface.style.display = "block"
    Product_Container.style.display = "none"
    Review_body.style.display = "none"
    Profile_body.style.display = "none"
    orderPage.style.display= "none"

   })
   Orders.addEventListener('click', () =>{
    orderPage.style.display= "block"
    interface.style.display = "none"
    Product_Container.style.display = "none"
    Review_body.style.display = "none"
    Profile_body.style.display = "none"
   })


   New_Products.onclick = () => {
    Product_Container.style.display = "block"
    interface.style.display = "none"
    Review_body.style.display = "none"
    Profile_body.style.display = "none"
    orderPage.style.display= "none"

   };
Review.onclick = () =>{
    Review_body.style.display = "block"
    Product_Container.style.display = "none"
    interface.style.display = "none"
    Profile_body.style.display = "none"
    orderPage.style.display= "none"

};
Profile.onclick = () => {
    Profile_body.style.display = "block"
    Review_body.style.display = "none"
    Product_Container.style.display = "none"
    interface.style.display = "none"
    orderPage.style.display= "none"

}

// coming

var Navitems = document.querySelectorAll("#items li");
Navitems.forEach(function(item){
    item.addEventListener("click", function(){
        Navitems.forEach(function(item){
            item.classList.remove("active");
        });
        this.classList.add("active");
    })
})




    // submission for adding new products
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('product-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const productName = document.getElementById('product-name').value;
        const productPrice = document.getElementById('product-price').value;
        const productImage = document.getElementById('product-image').files[0];
        const productId = document.getElementById('product-id').value;
        const productCategory = document.getElementById('product-category').value;

        if (productName && productPrice && productImage && productId && productCategory) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newProduct = {
                    id: parseInt(productId),
                    title: productName,
                    price: parseInt(productPrice),
                    image: e.target.result,
                    category: productCategory
                };

                saveProduct(newProduct);
                displayProducts(getAllProducts());
                document.getElementById('product-form').reset(); // Clear form fields
            };
            reader.readAsDataURL(productImage);
        }
    });
});

function saveProduct(newProduct) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
}


// to return home
let Home = document.getElementById("Home")
Home.addEventListener("click",()=>{
    window.location.href = "shop.html"
})
let logOut = document.getElementById("Nav-logout")
logOut.addEventListener ("click", ()=>{
    window.location.href = "index.html"
})








document.addEventListener('DOMContentLoaded', function() {
    // Load profile data
    const profileData = loadProfileData();
    if (profileData) {
        document.getElementById('resultName').innerText = profileData.name;
        document.getElementById('resultEmail').innerText = profileData.email;
        document.getElementById('resultPhone').innerText = profileData.phone;
        document.getElementById('resultAddress').innerText = profileData.address;
        document.getElementById('resultPicture').src = profileData.pictureUrl;

        document.getElementById('profile-container').style.display = 'none';
        document.getElementById('resultSection').style.display = 'block';
    }

    // Load reviews
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach(review => displayReview(review));

    // Orders related code
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersDiv = document.getElementById('orders');

    if (orders.length > 0) {
        let ordersHtml = '<ul>';
        orders.forEach(order => {
            let itemsHtml = '<ul>';
            order.items.forEach(item => {
                itemsHtml += `
                    <li>
                        <img src="${item.image}" alt="${item.title}" style="width: 50px; height: auto;">
                        <div>${item.title}</div>
                        <div>₦${item.price}</div>
                        <div>Quantity: ${item.quantity}</div>
                    </li>
                `;
            });
            itemsHtml += '</ul>';

            ordersHtml += `
                <li>
                    <h2>Order ID: ${order.id}</h2>
                    <p>Reference: ${order.reference}</p>
                    <p>Total Amount: ₦${order.totalAmount / 100}</p>
                    <p>Email: ${order.email}</p>
                    <p>Items:</p>
                    ${itemsHtml}
                </li>
            `;
        });
        ordersHtml += '</ul>';
        ordersDiv.innerHTML = ordersHtml;
    } else {
        ordersDiv.innerHTML = '<p>No orders available.</p>';
    }
});

function displayReview(review) {
    const reviewList = document.getElementById('review-list');
    const reviewItem = document.createElement('li');
    const reviewDetails = document.createElement('div');
    reviewDetails.innerHTML = `<strong>${review.customerName}</strong>: ${review.reviewText}`;
    reviewItem.appendChild(reviewDetails);
    
    if (review.imageData) {
        const img = document.createElement('img');
        img.src = review.imageData;
        reviewItem.insertBefore(img, reviewDetails);
    }
    reviewList.appendChild(reviewItem);
}

function saveProfileData(name, email, phone, address, pictureUrl) {
    const profileData = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        pictureUrl: pictureUrl
    };
    localStorage.setItem('profileData', JSON.stringify(profileData));
}

function loadProfileData() {
    const profileData = localStorage.getItem('profileData');
    if (profileData) {
        return JSON.parse(profileData);
    }
    return null;
}

document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const picture = document.getElementById('picture').files[0];
    let pictureUrl = "";

    if (picture) {
        pictureUrl = URL.createObjectURL(picture);
    } else {
        pictureUrl = document.getElementById('resultPicture').src;
    }

    // Set the result section with the form data
    document.getElementById('resultName').innerText = name;
    document.getElementById('resultEmail').innerText = email;
    document.getElementById('resultPhone').innerText = phone;
    document.getElementById('resultAddress').innerText = address;
    document.getElementById('resultPicture').src = pictureUrl;

    // Save profile data to local storage
    saveProfileData(name, email, phone, address, pictureUrl);

    // Show the result section and hide the form container
    document.getElementById('profile-container').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';
    alert('Profile submitted');
});

document.getElementById('editButton').addEventListener('click', function() {
    // Fill form fields with current profile details
    document.getElementById('name').value = document.getElementById('resultName').innerText;
    document.getElementById('email').value = document.getElementById('resultEmail').innerText;
    document.getElementById('phone').value = document.getElementById('resultPhone').innerText;
    document.getElementById('address').value = document.getElementById('resultAddress').innerText;

    // Show the form container and hide the result section
    document.getElementById('profile-container').style.display = 'block';
    document.getElementById('resultSection').style.display = 'none';
    document.querySelector(".interface").style.display = 'none';
});


