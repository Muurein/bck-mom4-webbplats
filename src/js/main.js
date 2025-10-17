let headerList = {
    "Accept": "*/*",
    "Content-Type": "Application/json"
};

const url = "http://localhost:1500/api";

window.onload = () => {
    document.querySelector("sign-up").addEventListener("submit", signUp);
    document.querySelector("sign-in").addEventListener("submit", signIn);
    fetchUser();
}

//registrera ny användare via data från formuläret
function signIn(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;

    newUser(username, password, firstName, lastName, email)
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

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();
        if(response.ok) {
            window.location.href = "profile.html";
        }

    } catch (error) {
        console.log("Det uppstod ett fel vid skapande av en ny användare: ", error);
    }
}


//logga in användare
function signIn(event) {
    event.preventDefault();

    fetch("/api/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        bosy: JSON.stringify({
            username: "user",
            password: "password"
        })
    })
    .then(response => {
        if(!response.ok) {
            throw new Error("Användarnamnet eller lösenordet är fel") //passar det här?
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem("token", data.token);
        //tar användaren till min profil
        window.location.href = "profile.html";

    })
    .catch(error => {
        console.error("Inloggningen misslyckades: ", error.message);
    });
}

//skapa en funktion för att se till att infon på min profil är dynamisk
async function fetchUser() {
    //hämta user token
    const token = localStorage.getItem("token");

    //validering av token
    if(!token) {
        window.location.href = "index.html"; //omdirigerar om inget token finns men kan behöva ändra till något annat - typ som ett felmeddelande
        return;
    }

    try {
        const response = await fetch("/api/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        
        //validering
        if(!response.ok) {
            throw new Error("Kunde inte hämta användardata");
        }

        const userData = await response.json();
        renderProfile(userData);
    } catch(error) {
        console.log("Något gick fel vid hämtning av användardata: ", error.message);
    }
}

function renderProfile(user) {
    document.getElementById("usernameProfile").textContent = user.username;
    document.getElementById("passwordProfile").textContent = user.password;
    document.getElementById("firstNameProfile").textContent = user.firstName;
    document.getElementById("lastNameProfile").textContent = user.lastName;
    document.getElementById("emailProfile").textContent = user.email;
}


