// document.addEventListener('DOMContentLoaded', function() {
//     const orderData = JSON.parse(localStorage.getItem('orderData'));
//     const cartState = JSON.parse(localStorage.getItem('cartState'));

//     if (orderData) {
//         // Generate HTML for the order details
//         let cartItemsHtml = '';

//         if (cartState && cartState.length > 0) {
//             cartItemsHtml = '<ul>';
//             cartState.forEach(item => {
//                 cartItemsHtml += `
//                     <li>
//                         <img src="${item.image}" alt="${item.title}" style="width: 50px; height: auto;">
//                         <div>${item.title}</div>
//                         <div>₦${item.price}</div>
//                         <div>Quantity: ${item.quantity}</div>
//                     </li>
//                 `;
//             });
//             cartItemsHtml += '</ul>';
//         } else {
//             cartItemsHtml = '<p>No items in the cart.</p>';
//         }

//         const orderDetails = `
//             <p>Thank you for your purchase!</p>
//             <p>You will be redirect to the homepage after 10seconds!</p>
//             <p>Transaction Reference: ${orderData.reference}</p>
//             <p>Items:</p>
//             ${cartItemsHtml}
//             <p>Email: ${orderData.email}</p>
//             <p>Total Amount: ₦${orderData.totalAmount / 100}</p>
//         `;

//         document.getElementById('orderDetails').innerHTML = orderDetails;
// clear data
// localStorage.removeItem('orderData');
// localStorage.removeItem('cartState');
//     } else {
//         document.getElementById('orderDetails').innerHTML = 
//         '<p>No order information available.</p><p>You will be redirect to the homepage after 10seconds!</p>';

//     }


//     setTimeout(function() {
//         window.location.href = 'index.html';
//     }, 100000);

// });


// document.addEventListener('DOMContentLoaded', function() {
//     const orderData = JSON.parse(localStorage.getItem('orderData'));
//     const cartState = JSON.parse(localStorage.getItem('cartState'));

//     if (orderData) {
//         // Generate HTML for the order details
//         let cartItemsHtml = '';

//         if (cartState && cartState.length > 0) {
//             cartItemsHtml = '<ul>';
//             cartState.forEach(item => {
//                 cartItemsHtml += `
//                     <li>
//                         <img src="${item.image}" alt="${item.title}" style="width: 50px; height: auto;">
//                         <div>${item.title}</div>
//                         <div>₦${item.price}</div>
//                         <div>Quantity: ${item.quantity}</div>
//                     </li>
//                 `;
//             });
//             cartItemsHtml += '</ul>';
//         } else {
//             cartItemsHtml = '<p>No items in the cart.</p>';
//         }

//         const orderDetails = `
//             <p>Thank you for your purchase!</p>
//             <p>You will be redirect to the homepage after 10seconds!</p>
//             <p>Transaction Reference: ${orderData.reference}</p>
//             <p>Items:</p>
//             ${cartItemsHtml}
//             <p>Email: ${orderData.email}</p>
//             <p>Total Amount: ₦${orderData.totalAmount / 100}</p>
//         `;

//         document.getElementById('orderDetails').innerHTML = orderDetails;

//         // Do not remove the order data from localStorage
//     } else {
//         document.getElementById('orderDetails').innerHTML = 
//         '<p>No order information available.</p><p>You will be redirected to the homepage after 10 seconds!</p>';
//     }

//     setTimeout(function() {
//         window.location.href = 'index.html';
//     }, 10000);
// });


document.addEventListener('DOMContentLoaded', function() {
    const orderData = JSON.parse(localStorage.getItem('orderData'));
    const cartState = JSON.parse(localStorage.getItem('cartState'));

    if (orderData) {
        // Generate HTML for the order details
        let cartItemsHtml = '';

        if (cartState && cartState.length > 0) {
            cartItemsHtml = '<ul>';
            cartState.forEach(item => {
                cartItemsHtml += `
                    <li>
                        <img src="${item.image}" alt="${item.title}" style="width: 50px; height: auto;">
                        <div>${item.title}</div>
                        <div>₦${item.price}</div>
                        <div>Quantity: ${item.quantity}</div>
                    </li>
                `;
            });
            cartItemsHtml += '</ul>';
        } else {
            cartItemsHtml = '<p>No items in the cart.</p>';
        }

        const orderDetails = `
            <p>Thank you for your purchase!</p>
            <p>You will be redirected to homepage in 10 seconds!</p>
            <p>Transaction Reference: ${orderData.reference}</p>
            <p>Items:</p>
            ${cartItemsHtml}
            <p>Email: ${orderData.email}</p>
            <p>Total Amount: ₦${orderData.totalAmount / 100}</p>
        `;

        document.getElementById('orderDetails').innerHTML = orderDetails;

        // Save order data to localStorage for admin access
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        const orderId = Date.now();
        orders.push({ id: orderId, ...orderData, items: cartState });
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear the order data from localStorage after displaying it
        localStorage.removeItem('orderData');
        localStorage.removeItem('cartState');
    } else {
        document.getElementById('orderDetails').innerHTML = 
        '<p>No order information available.</p><p>You will be redirected to homepage in 10 seconds!</p>';
    }

    // Redirect to homepage after 10 seconds
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 10000);
});
