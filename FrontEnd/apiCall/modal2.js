import { categories } from "./works.js";

// Événement pour retourner à la modale delate photo lors du clic sur le bouton
const arrowLeft = document.querySelector(".arrowLeft");
arrowLeft.addEventListener("click", toggleModal);

function toggleModal() {
  document.querySelector(".modalAjout").classList.toggle("hidden");
  document.querySelector(".modaldelete").classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
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




  /*imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        imagePreview.src = reader.result;
      });
      reader.readAsDataURL(file);
      const title = file.name.replace(/\.[^/.]+$/, "");
      titleInput.value = title;

      blueBorderDiv.classList.add("imageSelected");
      addPhotoLabel.style.display = "none";
      formatTextDiv.style.display = "none";
      iconsPictureImg.style.display = "none";
    } else {
      blueBorderDiv.classList.remove("imageSelected");
      imagePreview.src = "";
      titleInput.value = "";
      addPhotoLabel.style.display = "block";
      formatTextDiv.style.display = "block";
      iconsPictureImg.style.display = "block";
    }
  });
  */

  let imageOk = false;
  let titleOk = false;
  let categorieOk = false;

  imageInput.addEventListener("change", function (){
    const file = this.files[0];
    const maxsize = 4*1024*1024;
    
    if (file.size > maxsize){
      console.log("image supérieur à 4mo")
      return false

    }

    let img = document.querySelector(".preview img");
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(this.source)
      document.querySelector(".preview").classList.toggle("hidden")
      document.querySelector(".blueBorder").classList.toggle("hidden")
    } 
  })

  titleInput.addEventListener("change", function(){
    if (this.value.length>3 &&  this.value.length<50  ) {
      titleOk = true; 

    }
  else {
  titleOk = false; 
  console.log("Taille de titre invalide")

  }
  })
  let select = document.getElementById(category);
  categories.foreach (category => {
    let option = document.createElement("option");
    option.value = category.id;
    option.label = category.name;
    select.add (option,null);
  })
    
  
  






  // Ajoute un événement de clic au bouton "Retour"
  returnButton.addEventListener("click", resetFields);

  // Ajoute un événement de clic à l'icône de fermeture
  closeButton.addEventListener("click", resetFields);

  function resetFields() {
    imageInput.value = "";
    imagePreview.src = "";
    titleInput.value = "";
    blueBorderDiv.classList.remove("imageSelected");
    addPhotoLabel.style.display = "block";
    formatTextDiv.style.display = "block";
    iconsPictureImg.style.display = "block";
  }
});
