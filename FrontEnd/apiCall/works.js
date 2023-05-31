// Faire appel à l'api
const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

function displayWorks(works){
  const gallery = document.querySelector(".gallery");

  works.forEach(work => { 
    const image = document.createElement("img");
    image.src = work.imageUrl;
    image.alt = work.title;

    let figCaption = document.createElement("figcaption");
    figCaption.textContent= work.title;

    let figure = document.createElement("figure");

    figure.appendChild(image);
    figure.appendChild(figCaption);
    gallery.appendChild(figure);
})
}

displayWorks(works);


//Création boutton

const resCat = await fetch("http://localhost:5678/api/categories");
const categories = await resCat.json();

function displayBtn(categories){
  const filterCategories = document.querySelector(".buttonBox");

  categories.forEach(categorie => { 
    const buttonCat = document.createElement('button');
    buttonCat.innerText = categorie.name;
    console.log(categorie.name);

    filterCategories.appendChild(buttonCat);
})
}

displayBtn(categories);