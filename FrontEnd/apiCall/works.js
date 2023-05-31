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
  
  const allButton = document.createElement('button');
  
  allButton.innerText = 'Tout afficher';
  buttonBoxContainer.appendChild(allButton);

  allButton.addEventListener('click', () => {
    displayWorks(works);
  });

  categories.forEach(category => {
    const buttonCat = document.createElement('button');
    buttonCat.innerText = category.name;
    buttonBoxContainer.appendChild(buttonCat);

    buttonCat.addEventListener('click', () => {
      const filteredWorks = works.filter(work => work.categoryId === category.id);
      displayWorks(filteredWorks);
    });
  });
}

displayWorks(works);
displayBtn(categories, works);