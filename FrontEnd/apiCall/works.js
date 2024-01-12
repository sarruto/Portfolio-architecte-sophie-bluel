// Faire appel à l'API pour les works

const worksResponse = await fetch("http://localhost:5678/api/works");
export const works = await worksResponse.json();

// Fonction pour afficher les works

export function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Effacer le contenu précédent de la galerie

  works.forEach((work) => {
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

// Faire appel à l'API pour les catégories

const categoriesResponse = await fetch("http://localhost:5678/api/categories");
export const categories = await categoriesResponse.json();

// Fonction pour afficher les boutons de catégorie et gérer le filtre
function displayBtn(categories, works) {
  const buttonBoxContainer = document.querySelector(".buttonBox");
  categories.unshift({ id: 0, name: "Tous" });

  categories.forEach((category) => {
    const buttonCat = document.createElement("button");

    buttonCat.innerText = category.name;
    buttonBoxContainer.appendChild(buttonCat);
    if (category.id === 0) {
      buttonCat.classList.add("active");
    }

    buttonCat.addEventListener("click", () => {
      let filteredWorks = works;
      if (category.id !== 0) {
        filteredWorks = works.filter((work) => work.categoryId === category.id);
      }

      displayWorks(filteredWorks);
      document.querySelector(".active").classList.remove("active");
      buttonCat.classList.add("active");
    });
  });
}

displayWorks(works);
const token = sessionStorage.getItem("token");
// Pour gérer l'affichage en fonction de la connexion
if (token) {
  // Pour récupérer mon lien
  let link = document.querySelector("a[href='login.html']");
  link.textContent = "logout";
  link.addEventListener("click", (event) => {
    event.preventDefault();
// Supprimer les informations d'identification de l'utilisateur
    sessionStorage.removeItem("token");

// Rediriger l'utilisateur vers la page de connexion
    window.location.reload();
  });

const openModalBtn = document.querySelector(".openModalBtn");
  openModalBtn.classList.remove("hidden");
  const buttonModifier = document.querySelector(".buttonModifier");
  buttonModifier.classList.remove("hidden");
} else {
  displayBtn(categories, works);
}