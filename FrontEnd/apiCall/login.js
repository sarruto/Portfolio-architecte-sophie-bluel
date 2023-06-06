document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const userData = {
      email: email,
      password: password
    };
  
    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Login réussi');
          // Actions à effectuer après le login réussi
  
          // Récupérer la réponse JSON
          return response.json();
        } else {
          console.log('Échec de la connexion');
          // Actions à effectuer après l'échec du login
          document.getElementById('error-message').style.display = 'block';
          throw new Error('Erreur dans l\'identifiant ou le mot de passe');
        }
      })
      .then(data => {
        // Stocker la réponse du login dans le localStorage
        localStorage.setItem('loginResponse', JSON.stringify(data));
        
        // Rediriger vers la page du site avec les boutons d'actions
        window.location.href = "https://exemple.com/page-du-site";
      })
      .catch(error => {
        console.log('Erreur lors de la requête de login', error);
      });
  });
  