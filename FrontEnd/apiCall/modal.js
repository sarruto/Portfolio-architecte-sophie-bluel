import { works } from "./works.js";
// Fonction pour afficher les works dans la galerie
function displayWorks(works) {
  const gallery = document.querySelector('.gallery-modal');
  gallery.innerHTML = ''; // Effacer le contenu précédent de la galerie

  works.forEach(work => {
    const image = document.createElement('img');
    image.src = work.imageUrl;
    image.alt = work.title;

    let editButton = document.createElement('button');
    editButton.textContent = 'éditer';
    editButton.classList.add('edit-button');
    
    let figCaption = document.createElement('figcaption');
    figCaption.appendChild(editButton);
    

    let figure = document.createElement('figure');
    figure.dataset.id=work.id;

    figure.appendChild(image);
    figure.appendChild(figCaption);
    figure.appendChild(getIconTrash());
    gallery.appendChild(figure);
  });
}
function getIconTrash() {
  let img = document.createElement('img');
  img.src = "./assets/icons/trash.png";
  let back = document.createElement('div');
  back.classList.add('backicons');
  img.classList.add('trashicons');
  back.appendChild(img);
  return back;
}



// Fonction pour ouvrir la modale et afficher la galerie des works
function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
  displayWorks(works)
  //fetchWorks(); // Appel de la fonction pour récupérer et afficher les works dans la modale
}

// Fonction pour fermer la modale
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Sélection du bouton d'ouverture de la modale
const openModalBtn = document.getElementById('openModalBtn');

// Sélection du bouton de fermeture de la modale
const closeModalBtn = document.querySelector('.closeModal');

// Écouteur d'événement pour le clic sur le bouton d'ouverture de la modale
openModalBtn.addEventListener('click', openModal);

// Écouteur d'événement pour le clic sur le bouton de fermeture de la modale
closeModalBtn.addEventListener('click', closeModal);

const modal=document.getElementById('modal');
modal.addEventListener('click',closeModal) ;

const modalContent=document.querySelector('.modal-content');
modalContent.addEventListener('click',stopPropagation);
function stopPropagation(event) {
event.stopPropagation()

}



 












/*
const buttonBox = document.querySelector(".buttonBox");
buttonBox.classList.add("hidden");



buttonBox.classList.remove("hidden");

buttonBox.classList.toggle("hidden");
*/




  
  // Appel initial pour récupérer les travaux et les afficher
  //fetchWorks();
  






  /*
  // Fonction pour récupérer les works depuis l'API
async function fetchWorks() {
  try {
    const worksResponse = await fetch('http://localhost:5678/api/works');
    const works = await worksResponse.json();
    displayWorks(works);
  } catch (error) {
    console.log(error);
  }
}*/