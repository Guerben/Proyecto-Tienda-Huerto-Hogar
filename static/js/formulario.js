document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const submitButton = this.querySelector("button[type='submit']");
        submitButton.classList.add("loading");

        const formData = new FormData(this);

        fetch('/send_email', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showFlashMessage('Mensaje enviado correctamente.', 'success');
            this.reset();
            submitButton.classList.remove('loading');
        })
        .catch(error => {
            showFlashMessage('Hubo un error al enviar el mensaje. Intenta nuevamente.', 'danger');
            console.error('Error:', error);
            submitButton.classList.remove('loading');
        });
    });

    function showFlashMessage(message, category) {
        const flashContainer = document.getElementById('flashMessages');
        const flashMessage = document.createElement('div');
        flashMessage.className = `alert alert-${category}`;
        flashMessage.textContent = message;
        flashContainer.appendChild(flashMessage);
        setTimeout(() => {
            flashMessage.remove();
        }, 5000);
    }
});