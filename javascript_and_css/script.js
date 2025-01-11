
document.addEventListener('DOMContentLoaded', function() {
   
    function debounce(func, delay) {
        let debounceTimer;
        return function(...args) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

   
    async function fetchUser() {

        const query = document.getElementById('user-input').value 

        if(!query){
            document.getElementById('user-card').style.display = 'none';
            return;
        }
        try {
            const result = await fetch('https://randomuser.me/api');
            const data = await result.json();
            const user = data.results[0];
            console.log("Fetched User ", user);
            displayUser(user);
        } catch (error) {
            console.log("Failed to fetch user :( ", error);
        }
    }

    function displayUser(user) {
        const userCard = document.getElementById('user-card');
        userCard.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
            <h2>${user.name.first} ${user.name.last}</h2>
            <p>Email: ${user.email}</p>
            <p>Location: ${user.location.city}, ${user.location.country}</p>
        `;
        userCard.style.display = 'block'; 
    }

    
    const searchInput = document.getElementById('user-input');
    searchInput.addEventListener('input', debounce(function() {
        fetchUser(); 
    }, 500)); 
});