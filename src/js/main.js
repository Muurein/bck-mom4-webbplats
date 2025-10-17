let headerList = {
    "Accept": "*/*",
    "Content-Type": "Application/json"
};

const url = "http://localhost:1500/api";

window.onload = () => {
    document.querySelector("sign-up").addEventListener("submit", signUp);
    document.querySelector("sign-in").addEventListener("submit", signIn);
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
            //created_at
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const data = await response.json();

    } catch (error) {
        console.log("Det uppstod ett fel vid skapande av en ny användare: ", error);
    }
}


//logga in användare
//ska hämta användarnamn och lösenord
//ska skapa token
//ska verifieria token
//ska ta användaren till min profil
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
function renderProfile(username, password, firstName, lastName, email) {

}


