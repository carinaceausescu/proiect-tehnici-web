function getNewColor() {
    var symbols, color;
    symbols = "0123456789ABCDEF";
    color = "#";
    for(var i = 0; i < 6; i++) {
        color = color + symbols[Math.floor(Math.random() * 16)];
    }
    document.querySelector('.highlight2').style.color = color;
}

function openPopup() {
    document.getElementById("popup-oferta").style.display = "block";
}

function closePopup() {
    document.getElementById("popup-oferta").style.display = "none";
}

setTimeout(openPopup, 3000);

function save(event) {
    event.preventDefault();

    var nume = document.getElementById("nume").value.trim();
    var stilDans = document.getElementById("stilDans").value.trim();
    var email = document.getElementById("email").value.trim();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailRegex)) {
        alert("Adresa de email nu este validă!");
        return;
    }

    if (!nume || !stilDans || !email) {
        alert("Toate câmpurile sunt obligatorii!");
        return;
    }

    localStorage.setItem('ls_nume', nume);
    localStorage.setItem('ls_stilDans', stilDans);
    localStorage.setItem('ls_email', email);

    alert("Datele au fost salvate!");

    const confirmationMessage = document.createElement("div");
    confirmationMessage.textContent = Felicitări, ${nume}! Te-ai înscris cu succes la stilul ${stilDans}.;
    confirmationMessage.style.color = "green";
    confirmationMessage.style.fontSize = "18px";
    confirmationMessage.style.marginTop = "20px";

    const container = document.getElementById("message-container");
    container.innerHTML = "";
    container.appendChild(confirmationMessage);

    fetch('inscrieri.json')  
        .then(response => response.json())
        .then(data => {
            const userExists = data.some(user => 
                user.nume === nume && user.stilDans === stilDans && user.email === email
            );

            if (userExists) {
                alert("Ești deja înscris!");
            }
        })
}


