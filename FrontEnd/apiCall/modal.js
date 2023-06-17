// Fonction pour ouvrir la modale
function openModal() {
    const modal = document.querySelector('.modal');
   // modal.style.display = 'flex';
    modal.classList.remove("hidden");
  }
  
  // Fonction pour fermer la modale
  function closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add("hidden");
   
    //modal.style.display = 'none';
  }
  
  // Ouvrir la modale au clic
  const openModalButton = document.getElementById('openModalBtn');
  openModalButton.addEventListener('click', openModal);
  
  // Fermer la modale au clic 
  const closeButton = document.querySelector('.closeModal');
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
  //fetchWorks();
  