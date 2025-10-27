let headerList = {
    "Accept": "http://localhost:1234",
    "Content-Type": "application/json"
};

const url = "http://localhost:1500/api"; //OM DU ORORAR DIG: ÄNDRA FÖR FAN INGEN URL

// window.onload = () => {
//     fetchUser();
// }

//lyssnar efter knapptryck bara om man är på startsidan
document.getElementById("sign-up-form").addEventListener("submit", (e) => {
    signUp(e);
});
document.getElementById("sign-in-form").addEventListener("submit", (e) => {
    e.preventDefault();
    signIn(e);
 });

//registrera ny användare via data från formuläret
function signUp(event) { 
    event.preventDefault();

    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;

    //är alla fält ifyllda?
    if (!username || !password || !firstName || !lastName || !email) {
        document.getElementById("signupError").textContent = "Alla fält behöver vara ifyllda";
        return;
    }

    //kolla om lösenordet är långt nog
    if(password.length < 10) {
        document.getElementById("signupPasswordError").textContent = "Lösenordet behöver vara minst 10 tecken långt"
    }

    newUser(username, password, firstName, lastName, email);
}

//skapa ny användare
async function newUser(username, password, firstName, lastName, email) {
    try {
        let user = {
            username,
            password,
            firstName,
            lastName, 
            email,
        }

        const response = await fetch(`${url}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
            
        });

        const data = await response.json();

        if(response.ok) {
            alert("Kontot har skapats. Nu kan du logga in!");
            window.location.href = "index.html";
        } 
    } catch (error) {
        console.log("Det uppstod ett fel vid skapande av en ny användare: ", error);
    }
}


//logga in användare
function signIn(event) {
    event.preventDefault();

    const username = document.getElementById("signinUsername").value;
    const password = document.getElementById("signinPassword").value;

    //är alla fält ifyllda?
    if (!username || !password) {
        document.getElementById("noAllSignIn").textContent = "Alla fält behöver vara ifyllda";
        return;
    }

    fetch(url + "/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
        
    })
    .then(response => {
        if(!response.ok) {
            document.getElementById("wrongSignIn").textContent =  "Användarnamnet eller lösenordet är fel";
            throw new Error("Inloggningen misslyckades");
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem("token", data.token); 
        alert("Du är nu inloggad!");

        //tar användaren till profilen
        window.location.href = "profile.html";

    })
    .catch(error => {
        console.error("Inloggningen misslyckades: ", error.message);
    });
}



//så man inte kan öppna profilen utan token
function authProfile() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Logga in för att se din profil!");
    }
}
