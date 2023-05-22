// Appel de l'API et récupération des données
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    // Génération du code HTML de la galerie
    const gallerie = document.getElementById('gallery'); // Élément HTML où afficher la galerie

    data.forEach(travaux => {
      // Création d'un élément de la galerie pour chaque travail
      const gallerieTravaux = document.createElement('div');
      gallerie.className = 'gallerie-travaux';

      // Création de l'image
      const image = document.createElement('img');
      image.src = travaux.imageUrl;
      image.alt = travaux.titre;

      // Création du titre
      const titre = document.createElement('h3');
      titre.textContent = travaux.titre;

      // Ajout de l'image et du titre à l'élément de la galerie
      gallerieTravaux.appendChild(image);
      gallerieTravaux.appendChild(titre);

      // Ajout de l'élément de la galerie à la galerie principale
      
      gallerie.appendChild(gallerieTravaux);
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite :', error);
  });