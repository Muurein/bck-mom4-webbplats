const url = "http://localhost:1500/api";

window.onload = () => {
    const token = localStorage.getItem("token");

    // begränsa åtkomligheten till profilen
    if (!token) {
        alert("Logga in för att se din profil!");
        window.location.href = "index.html";
    } else {
        fetchUser();
    }
}


//skapa en funktion för att se till att infon på min profil är dynamisk
async function fetchUser() {
    
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${url}/profile`, { 
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        
        //validering
        if(!response.ok) {
            const errorText = await response.text();
            throw new Error("Kunde inte hämta användardata");
        }

        const userData = await response.json();
        renderProfile(userData);

    } catch(error) {
        console.log("Något gick fel vid hämtning av användardata: ", error.message);
    }
}

//bygg upp profil sidan med just den inloggade användarens info
function renderProfile(user) {
    document.getElementById("usernameProfile").textContent = user.username;
    document.getElementById("firstNameProfile").textContent = user.firstName;
    document.getElementById("lastNameProfile").textContent = user.lastName;
    document.getElementById("emailProfile").textContent = user.email;
}