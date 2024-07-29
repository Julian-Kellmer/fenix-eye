emailjs.init("y-TvIPaZrOv6WDzQK");

const contactForm = document.getElementById("contact-form")
const nameForm = document.getElementById("name-form")
const surname = document.getElementById("surname-form")
const email = document.getElementById("email-form")
const message = document.getElementById("message-form")
const submitBTN = document.getElementById("submit-form");

const serviceID = "service_huhh05q"
const templateID = "template_9tgyiur"

document.addEventListener("DOMContentLoaded", () => {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault()

        var response = grecaptcha.getResponse();
        if (response.length === 0) {
            let timerInterval;
                Swal.fire({
                    title: "Por favor, completa el reCAPTCHA antes de enviar el formulario.",
                    html: "Me cerrare en <b></b> milisegundos",
                    timer: 2000,
                    imerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                    },
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("I was closed by the timer");
                    }
                })} else {
                        submitBTN.innerText = "Enviando...";
                        submitBTN.setAttribute("data-text", "Enviando...");
            
                        const templateParams = {
                            nameForm: nameForm.value,
                            surname: email.value,
                            email: email.value,
                            message: message.value,
                        };

                        emailjs.send(serviceID, templateID, templateParams).then(function (res) {
                            Swal.fire({
                                title: "¡El correo electrónico se ha enviado con éxito!",
                                text: "En breve nos comunicaremos con usted",
                                icon: "success",
                                confirmButtonColor: "#18bcc7",
                                confirmButtonText: "Listo",
                        });

          submitBTN.innerText = "Enviado!";
          submitBTN.setAttribute("data-text", "Enviado!");
        },
        function (err) {
          submitBTN.innerText = "Error";
          submitBTN.setAttribute("data-text", "Error");

          Swal.fire({
            title: "¡Ha ocurrido un error!",
            text: "Contactese con a@da.com.ar",
            icon: "error",
            confirmButtonText: "Listo",
          });
        }
      );
    }
    });
})


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