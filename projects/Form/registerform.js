const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dob: document.getElementById('dob').value,
        password: document.getElementById('password').value,
        state: document.getElementById('state').value,
        gender: document.querySelector('input[name="gender"]:checked')?.value || '',
        comments: document.getElementById('comments').value,
        agree: document.getElementById('agree').checked,
        experience: document.getElementById('experience').value 
    };
    
    console.log('Form Data:', formData);
    
    if (!formData.fullname || !formData.email || !formData.password) {
        alert('Please fill in your full name, email, and password.');
        return;
    }
    
    if (formData.password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }
    
    if (!formData.agree) {
        alert('You must agree to the terms and conditions.');
        return;
    }

    if (formData.experience < 1 || formData.experience > 50) {
        alert("Experience must be between 1 and 50 years.");
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'submit.json', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            displaySuccessMessage(response.message);
            form.reset();
            console.log('Server Response:', response);
        } else if (xhr.readyState === 4) {
            alert('Error submitting form. Please try again.');
        }
    };
    
    xhr.send();
});

function displaySuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        background-color: #4CAF50;
        color: white;
        padding: 20px;
        margin: 20px auto;
        border-radius: 8px;
        text-align: center;
        font-size: 1.2em;
        max-width: 500px;
    `;
    messageDiv.textContent = message;
    
    const main = document.querySelector('main');
    main.insertBefore(messageDiv, main.firstChild);
    
    form.style.display = 'none';
    
    setTimeout(() => {
        messageDiv.remove();
        form.style.display = 'flex';
    }, 5000);
}
