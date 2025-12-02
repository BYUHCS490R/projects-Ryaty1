const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
      fullname: document.getElementById('fullname').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      area: document.getElementById('area').value.trim(),
      updates: document.getElementById('updates').checked,
      agree: document.getElementById('agree').checked
    };

    if (!formData.fullname || !formData.email || !formData.phone) {
      alert('Please fill in your full name, email, and phone number.');
      return;
    }

    if (!formData.agree) {
      alert('Please agree to the community guidelines to join.');
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'response.json', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onreadystatechange = function () {
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
}

function displaySuccessMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.style.cssText = `
    background-color: #4CAF50;
    color: white;
    padding: 20px;
    margin: 20px auto;
    border-radius: 8px;
    text-align: center;
    font-size: 1.1em;
    max-width: 500px;
  `;
  messageDiv.textContent = message;

  const main = document.querySelector('main');
  if (main) {
    main.insertBefore(messageDiv, main.firstChild);
  }

  if (form) {
    form.style.display = 'none';
  }

  setTimeout(() => {
    messageDiv.remove();
    if (form) {
      form.style.display = 'flex';
    }
  }, 5000);
}
