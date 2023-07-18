
// Événement pour retourner à la modale delate photo lors du clic sur le bouton
const arrowLeft = document.getElementById("arrowLeft");
arrowLeft.addEventListener("click", toggleModal);

function toggleModal(){
  document.querySelector(".modalAjout").classList.toggle("hidden");
  document.querySelector(".modaldelete").classList.toggle("hidden");
}