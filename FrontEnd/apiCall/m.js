import { works } from "./works.js";

// Fonction pour afficher les works dans la galerie de la modale
function displayWorks(works) {
  const gallery = document.querySelector(".gallery-modal");
  gallery.innerHTML = ""; // Effacer le contenu précédent de la galerie

  works.forEach(work => {
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

  // Ajout de l'événement de suppression du work
  back.addEventListener("click", () => {
    deleteWork(workId);
    console.log("delete")
  });

  return back;
}

// Fonction pour supprimer un work

async function deleteWork(workId) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE"
    });

    if (response.ok) {
      // Suppression réussie, mettre à jour la galerie
      const updatedWorksResponse = await fetch("http://localhost:5678/api/works");
      const updatedWorks = await updatedWorksResponse.json();
      displayWorks(updatedWorks);
    } else {
      console.error("Erreur lors de la suppression du work.");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du work :", error);
  }
}

// Fonction pour ouvrir la modale et afficher la galerie des works
function openModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
  displayWorks(works);

  // Récupérer tous les éléments avec la classe "backicons" et ajouter l'événement de suppression
  const backIcons = document.querySelectorAll(".backicons");
  backIcons.forEach(icon => {
    const workId = icon.parentElement.dataset.id; // Récupérer l'id du work
    icon.addEventListener("click", () => {
      deleteWork(workId);
    });
  });
}

// Fonction pour fermer la modale
function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Événement pour ouvrir la modale lors du clic sur le bouton
const openModalBtn = document.getElementById("openModalBtn");
openModalBtn.addEventListener("click", openModal);

// Événement pour fermer la modale lors du clic sur la croix
const closeModalBtn = document.querySelector(".closeModal");
closeModalBtn.addEventListener("click", closeModal);



















