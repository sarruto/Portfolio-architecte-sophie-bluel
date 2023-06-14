// Faire appel à l'API pour les works

const worksResponse = await fetch("http://localhost:5678/api/works");
const works = await worksResponse.json();

// Fonction pour afficher les works

function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
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

// Faire appel à l'API pour les categories

const categoriesResponse = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesResponse.json();

// Fonction pour afficher les boutons de catégorie et gérer le filtre

function displayBtn(categories, works) {
  const buttonBoxContainer = document.querySelector(".buttonBox");
  categories.unshift({ id: 0, name: "Tous"});
  /*
  const allButton = document.createElement('button');
  
  allButton.classList.add("active");
  allButton.innerText = 'Tous';
  buttonBoxContainer.appendChild(allButton);

  allButton.addEventListener('click', () => {
    displayWorks(works);
    document.querySelector(".active").classList.remove("active");
    allButton.classList.add("active");
  
  });

  allButton.classList.add("button");
  */
  categories.forEach(category => {
    const buttonCat = document.createElement('button');
  
    buttonCat.innerText = category.name;
    buttonBoxContainer.appendChild(buttonCat);
    if (category.id === 0) {
      buttonCat.classList.add("active");
  
    }

    buttonCat.addEventListener('click', () => {
      let filteredWorks = works; 
      if (category.id !== 0){
        filteredWorks = works.filter(work => work.categoryId === category.id);
      }
      
      displayWorks(filteredWorks);
      document.querySelector(".active").classList.remove("active");
      buttonCat.classList.add("active");
    });
  });
}

displayWorks(works);
displayBtn(categories, works);

const buttonBox = document.querySelector(".buttonBox");
buttonBox.classList.add("hidden");



buttonBox.classList.remove("hidden");

buttonBox.classList.toggle("hidden");
