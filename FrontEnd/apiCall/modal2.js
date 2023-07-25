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

  imageInput.addEventListener("change", function () {
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
