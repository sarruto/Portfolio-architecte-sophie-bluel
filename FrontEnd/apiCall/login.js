document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userData = {
    email: email,
    password: password,
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Login réussi");

        return response.json();
      } else {
        console.log("Échec de la connexion");

        document.getElementById("error-message").style.display = "block";
        throw new Error("Erreur dans l'identifiant ou le mot de passe");
      }
    })
    .then((data) => {
      // Stocker la réponse du login dans le localStorage
      sessionStorage.setItem("token", data.token);

      // Rediriger vers la page du site
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.log("Erreur lors de la requête de login", error);
    });
});
