


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
  
  displayWorks(works);
const token = sessionStorage.getItem("token");
if (token){
  const openModalBtn = document.querySelector("#openModalBtn");
  openModalBtn.classList.remove("hidden");
}else{
  displayBtn(categories, works);
}




// Faire appel à l'API pour les works

const worksResponse = await fetch("http://localhost:5678/api/works");
const works = await worksResponse.json();

// Fonction pour afficher les works

function displayWorks(works) {
  const gallery = document.querySelector("#galleryPicure");
  gallery.innerHTML = ""; // Effacer le contenu précédent de la galerie

  works.forEach(work => {
    const image = document.createElement("img");
    image.src = work.imageUrl;
    image.alt = work.title;

    let figCaption = document.createElement("figcaption");
    figCaption.textContent = work.title;

    let figure = document.createElement("figure");

    figure.appendChild(image);
    figure.appendChild(figCaption);
    gallery.appendChild(figure);
  });
}






 












/*
const buttonBox = document.querySelector(".buttonBox");
buttonBox.classList.add("hidden");



buttonBox.classList.remove("hidden");

buttonBox.classList.toggle("hidden");
*/




  
  // Appel initial pour récupérer les travaux et les afficher
  //fetchWorks();
  