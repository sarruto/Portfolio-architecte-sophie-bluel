// Fonction pour ouvrir la modale
function openModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
  }
  
  // Fonction pour fermer la modale
  function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }
  
  // Événement au clic sur le bouton "Ouvrir la modale"
  const openModalButton = document.getElementById('openModalButton');
  openModalButton.addEventListener('click', openModal);
  
  // Événement au clic sur le bouton "Fermer"
  const closeButton = document.getElementById('closeButton');
  closeButton.addEventListener('click', closeModal);
  
  // Appel à l'API pour récupérer les travaux
  async function fetchWorks() {
    try {
      const response = await fetch('http://localhost:5678/api/works');
      const works = await response.json();
      displayWorks(works);
    } catch (error) {
      console.error('Erreur lors de la récupération des travaux :', error);
    }
  }
  
  // Fonction pour afficher les travaux dans la modale
  function displayWorks(works) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
  
    works.forEach(work => {
      const image = document.createElement('img');
      image.src = work.imageUrl;
      image.alt = work.title;
      gallery.appendChild(image);
    });
  }
  
  // Appel initial pour récupérer les travaux et les afficher
  fetchWorks();
  