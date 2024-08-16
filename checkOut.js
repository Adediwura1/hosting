        const form = document.getElementById('checkoutForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const address1 = document.getElementById('address1').value;
    const address2 = document.getElementById('address2').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const region = document.getElementById('region').value;
    const postalCode = document.getElementById('postalCode').value;

    const formData = {
        fullName,
        emailAddress,
        phoneNumber,
        gender,
        address1,
        address2,
        country,
        city,
        region,
        postalCode
    };

    localStorage.setItem('checkoutData', JSON.stringify(formData));

    payWithPaystack(emailAddress);
});

const paystackButton = document.getElementById('paystackButton');



function payWithPaystack(email) {
    const totalAmount = JSON.parse(localStorage.getItem('totalAmount')) * 100;

    let handler = PaystackPop.setup({
        key: 'pk_test_9a99a67d1e4a1ac30a80511697d98f516981ef07',
        email: email,
        amount: totalAmount,
        currency: 'NGN',
        ref: '' + Math.floor((Math.random() * 1000000000) + 1),
        callback: function(response) {
            // Store transaction reference and other order info
            const orderData = {
                reference: response.reference,
                email: email,
                totalAmount: totalAmount
            };
            localStorage.setItem('orderData', JSON.stringify(orderData));

            // Redirect to order confirmation page
            alert('Payment successful. Transaction reference: ' + response.reference);
            window.location.href = 'confirmation.html';
            clearCart();

        },
        onClose: function() {
            alert('Transaction was not completed, window closed.');
            window.location.href = 'shop.html';
        }
    });
    handler.openIframe();
}










// clearcart after transaction successful
function clearCart() {
    checkOutList = [];
    localStorage.removeItem('cart');
    localStorage.removeItem('totalAmount');
    reloadCart();
}

