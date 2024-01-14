import { categories } from "./works.js";
import { works, displayWorks } from "./works.js";
import { displayModalWorks } from "./modal.js";

// Événement pour retourner à la modale delate photo lors du clic sur le bouton
const arrowLeft = document.querySelector(".arrowLeft");
arrowLeft.addEventListener("click", toggleModal);
function toggleModal() {
  document.querySelector(".modalAjout").classList.toggle("hidden");
  document.querySelector(".modaldelete").classList.toggle("hidden");
}

const imageInput = document.getElementById("image");
const imagePreview = document.createElement("img");
const blueBorderDiv = document.querySelector(".blueBorder");
const formatTextDiv = blueBorderDiv.querySelector(".formatTexte");
const addPhotoLabel = blueBorderDiv.querySelector("label[for='image']");
const iconsPictureImg = blueBorderDiv.querySelector(".iconsPicture");
const returnButton = document.querySelector(".arrowLeft");
const closeButton = document.querySelector(".closeModal");
blueBorderDiv.appendChild(imagePreview);
const titleInput = document.getElementById("title");

let imageOk = false;
let titleOk = false;
let categorieOk = false;
imageInput.addEventListener("change", function () {
  const file = this.files[0];
  const maxsize = 4 * 1024 * 1024;

  if (file.size > maxsize) {
    console.log("image supérieur à 4mo");
    document.querySelector(".imageError").classList.remove("hidden");
    imageOk = false;
    checkEntries();
    return;
  }

  let img = document.querySelector(".preview img");
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    URL.revokeObjectURL(this.source);
    document.querySelector(".preview").classList.toggle("hidden");
    document.querySelector(".blueBorder").classList.toggle("hidden");
  };
  imageOk = true;
  document.querySelector(".imageError").classList.add("hidden");
  checkEntries();
});

let titlelState = false;
titleInput.addEventListener("input", function () {
  if (this.value.length > 3 && this.value.length < 50) {
    titleOk = true;
    if (titlelState === false) {
      document.querySelector(".titleError").classList.toggle("hidden");
      titlelState = true;
    }
  } else {
    titleOk = false;
    if (titlelState === true) {
      document.querySelector(".titleError").classList.toggle("hidden");
      titlelState = false;
    }
    console.log("Taille de titre invalide");
  }
  checkEntries();
});
let select = document.getElementById("category");
categories.unshift({
  id: 0,
  name: "",
});
categories.forEach((category) => {
  let option = document.createElement("option");
  option.value = category.id;
  option.label = category.name;
  select.add(option, null);
});
select.addEventListener("change", () => {
  if (select.value !== "0") {
    categorieOk = true;
    document.querySelector(".categoryError").classList.add("hidden");
  } else {
    categorieOk = false;
    document.querySelector(".categoryError").classList.remove("hidden");
    console.log("Une catégorie est nécessaire");
  }

  checkEntries();
});

function checkEntries() {
  if (imageOk && titleOk && categorieOk) {
    console.log("0k");
    document.querySelector(".validerButton input").disabled = false;
  } else {
    document.querySelector(".validerButton input").disabled = true;
  }
}

function resetFields() {
  imageInput.value = "";
  imagePreview.src = "";
  titleInput.value = "";
  blueBorderDiv.classList.remove("imageSelected");
  addPhotoLabel.style.display = "block";
  formatTextDiv.style.display = "block";
  iconsPictureImg.style.display = "block";
}

// Faire appel à l'API pour les works

// Création d'un nouvel objet FormData
const form = document.querySelector("#addForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const images = document.querySelector("#image");
  const file = images.files[0];

  // Ajout des données au formulaire
  formData.append("image", file);

  const token = sessionStorage.getItem("token");
  // Configuration de la requête

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  // Envoi de la requête
  fetch("http://localhost:5678/api/works", options)
    .then((response) => response.json())
    .then((work) => {
      console.log("Réponse de l'API:", work);
      // Faites quelque chose avec la réponse de l'API ici
      works.push(work);
      displayWorks(works);
      displayModalWorks(works);
      form.reset();
      imageOk = false;
      categorieOk = false;
      titleOk = false;
      checkEntries;
      document.querySelector(".preview").classList.toggle("hidden");
      document.querySelector(".blueBorder").classList.toggle("hidden");
    })
    .catch((error) => console.error("Erreur lors de l'appel API:", error));
});
