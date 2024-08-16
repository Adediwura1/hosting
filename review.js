
document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const customerName = document.getElementById('customer-name').value;
    const reviewText = document.getElementById('review-text').value;
    const reviewImage = document.getElementById('review-image').files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imageData = e.target.result;
        const review = {
            customerName,
            reviewText,
            imageData
        };
        
        // Save to local storage
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        
        // Display review
        displayReview(review);
    };
    
    if (reviewImage) { 
        reader.readAsDataURL(reviewImage);
    } else {
        reader.onload({ target: { result: null } });
    }

    document.getElementById('review-form').reset();
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
