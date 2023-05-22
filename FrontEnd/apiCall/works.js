// Faire appel à l'api
fetch("http://localhost:5678/api/works")
  // Recuperer une promesse en réponse
  .then((response) => response.json())
  .then((data) => {
    // Créer la gallerie HTML

    const gallerieContainers = document.querySelectorAll(".gallery");
    // Récupérer les boutons de filtre du DOM
    const filtreBoutons = document.querySelectorAll(".filtre-btn");

    //Filtrage de la galerie
    const filtreGalerie = (category) => {
      gallerieContainers.forEach((gallerieContainer) => {
        // Supprimer le contenu existant du conteneur de galerie
        gallerieContainer.innerHTML = "";

        // Chercher la categorie sélectioné
        data.forEach((travaux) => {
          // Vérifier si la catégorie correspond à la catégorie sélectioné
          if (category === "" || travaux.category.name === category) {
            // Créer un nouvel élément de galerie
            const gallerieTravaux = document.createElement("div");
            gallerieTravaux.className = "gallerie-travaux";

            // Créer l'image
            const image = document.createElement("img");
            image.src = travaux.imageUrl;
            image.alt = travaux.titre;
            gallerieTravaux.appendChild(image);

            // Créer le titre
            const titre = document.createElement("h3");
            titre.textContent = travaux.title;
            gallerieTravaux.appendChild(titre);

            // Ajouter l'élément à la galerie dans le DOM
            gallerieContainer.appendChild(gallerieTravaux);
          }
        });
      });
    };

    // Ajouter un gestionnaire d'événement de clic à chaque bouton de filtre
    filtreBoutons.forEach((button) => {
      button.addEventListener("click", () => {
        // Récupérer la catégorie sélectionnée à partir de l'attribut personnalisé "data-category"
        const selectedCategory = button.getAttribute("filtre-categorie");
        // Filtrer la galerie en fonction de la catégorie sélectionnée
        filtreGalerie(selectedCategory);
      });
    });

    // Afficher tous les éléments de la galerie
    filtreGalerie("");

    // Pour gérer les erreurs
  })
  .catch((error) => {
    console.error("Une erreur s'est produite:", error);
  });
e