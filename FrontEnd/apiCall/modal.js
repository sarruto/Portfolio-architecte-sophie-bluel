import { works, displayWorks } from "./works.js";
// Fonction pour afficher les works dans la galerie de la modal
export function displayModalWorks(works) {
  const gallery = document.querySelector(".gallery-modal");
  gallery.innerHTML = ""; // Effacer le contenu précédent de la galerie
  works.forEach((work) => {
    const image = document.createElement("img");
    image.src = work.imageUrl;
    image.alt = work.title;
    let editButton = document.createElement("button");
    editButton.textContent = "éditer";
    editButton.classList.add("edit-button");
    let figCaption = document.createElement("figcaption");
    figCaption.appendChild(editButton);
    let figure = document.createElement("figure");
    figure.dataset.id = work.id;
    figure.appendChild(image);
    figure.appendChild(figCaption);
    figure.appendChild(getIconTrash(work.id)); // Ajout de l'icône de suppression
    figure.appendChild(getIconExpand());
    gallery.appendChild(figure);
  });
}
function getIconTrash(workId) {
  let img = document.createElement("img");
  img.src = "./assets/icons/trash.png";
  let back = document.createElement("div");
  back.classList.add("backicons");
  img.classList.add("trashicons");
  back.appendChild(img);
  //Ajout de l'événement de suppression du work
  back.addEventListener("click", (event) => {
    if (deleteWork(workId)) {
      event.target.closest("figure").remove();
      let index = works.findIndex((work) => work.id === workId);
      works.splice(index, 1);
      displayWorks(works);
    }
  });
  return back;
}
function getIconExpand() {
  let img = document.createElement("img");
  img.src = "./assets/icons/expand.png";
  let back = document.createElement("div");
  back.classList.add("backiconsExpand");
  img.classList.add("expandicons");
  back.appendChild(img);
  return back;
}
// Fonction pour supprimer un work
async function deleteWork(workId) {
  console.log(workId);
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return true;
    } else {
      console.error("Erreur lors de la suppression du work.");
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du work :", error);
  }
}
// Fonction pour ouvrir la modale et afficher la galerie des works
function openModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
  displayModalWorks(works);
}

// Événement pour ouvrir la modale ajout photo lors du clic sur le bouton
const addPhotoBtn = document.getElementById("addPhotoBtn");
addPhotoBtn.addEventListener("click", toggleModal);
function toggleModal() {
  document.querySelector(".modaldelete").classList.toggle("hidden");
  document.querySelector(".modalAjout").classList.toggle("hidden");
}
// Fonction pour fermer la modale
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}
// Événement pour ouvrir la modale lors du clic sur le bouton
const openModalBtn = document.querySelector(".openModalBtn");
openModalBtn.addEventListener("click", openModal);
// Événement pour fermer la modale lors du clic sur la croix
const closeModalBtn = document.querySelector(".closeModal");
closeModalBtn.addEventListener("click", closeModal);

// Événement pour fermer la modale lors du clic en dehors de la modale
const modal = document.getElementById("modal");
modal.addEventListener("click", closeModal);
// Événement pour empêcher la fermeture de la modale lors du clic dans la modale
const modalContent = document.querySelector(".modal-content");
modalContent.addEventListener("click", (event) => {
  event.stopPropagation();
});