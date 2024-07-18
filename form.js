document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide the form
    document.getElementById('contact-form').style.display = 'none';
    
    // Show the success message
    document.getElementById('success-message').style.display = 'block';
    
    // After 4 seconds, hide the success message and show the form again
    setTimeout(function() {
        document.getElementById('success-message').style.display = 'none';
        document.getElementById('contact-form').reset();
        document.getElementById('contact-form').style.display = 'block';
    }, 4000);
});