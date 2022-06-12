


//pagina de login é validada utilizando uma fake API do reqres

//para validar o login é necessario utilizar:
//email: eve.holt@reqres.in
//senha: cityslicka

const init = () => {
    const validateEmail = (event) => {
        let input = event.currentTarget;
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailTest = regex.test(input.value);
        var formGroup = input.parentElement;

        if(!emailTest) {
            formGroup.className = "form-group error";
        } else {
            formGroup.className = "form-group success";
        }
    }

    const validatePassword = (event) => {
        let input = event.currentTarget;
        var formGroup = input.parentElement;

        if(input.value.length < 8) {
            formGroup.className = "form-group error";
        } else {
            formGroup.className = "form-group success";
        }
    }

    const errorHandler = () => {
        submitSmall.textContent = "Error!";
    }

    const successHandler = () => {
        submitSmall.textContent = "Sent!";
    }
    
    const inputEmail = document.querySelector('input[type="email"]');
    const inputPassword = document.querySelector('input[type="password"]');
    const submitbtn = document.querySelector('button[id="submit"]');		
    const submitSmall = document.querySelector('small[id="status"]');

    inputEmail.addEventListener('input', validateEmail);
    inputPassword.addEventListener('input', validatePassword);

    if(submitbtn) {
        submitbtn.addEventListener('click', (event) => {
            event.preventDefault();

            fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputEmail.value,
                    password: inputPassword.value,
                })
            }).then((response) => {
                if (response.status !== 200) {
                    return errorHandler();
                }
                successHandler();

            }).catch(() => {
                errorHandler();
            })
        })
    }
}

window.onload = init;