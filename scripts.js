//navbar start//

function myNavFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//slider start//

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}
//slider finish//

let charData;

const getCharData = async () => {
  const url = "https://game-of-thrones1.p.rapidapi.com/Characters";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ac7004bf47msh2f4c6c7b1900cc8p1928afjsn3080a2b617ef",
      "X-RapidAPI-Host": "game-of-thrones1.p.rapidapi.com",
    },
  };

  let response = await fetch(url, options);
  charData = await response.json();
};
getCharData();

let quotesData;
const getQuotesData = async () => {
  const response = await fetch(
    "https://ervandogan12.github.io/GotData/quotes.json"
  );
  quotesData = await response.json();
};
getQuotesData();

let myFavorites = [];
let foundItemsInSearch = [];

const favorites = localStorage.getItem("myFavorites");
if (favorites) {
  myFavorites = JSON.parse(favorites);
}

// Selectors//
const homeBackBtn = document.querySelector("#back-home");
const characterBtn = document.querySelector("#character");
const main = document.querySelector("main");
const collageContainer = document.querySelector("#collage-container");
const locationBtn = document.querySelector("#location");
const quotesBtn = document.querySelector("#quotes");
const imgBtn1 = document.querySelector("#img-1");
const imgBtn2 = document.querySelector("#img-2");
const imgBtn3 = document.querySelector("#img-3");
const favoritesBtn = document.querySelector("#favorites");
const bar = document.querySelectorAll("span");
const searchInput = document.getElementById("search-input");
const fullPageImg = document.getElementById("fullPageImg");
const scrollToTopBtn = document.querySelector(".scrollToTopBtn");

const renderHomePage = () => {
  collageContainer.className = "collage-container";
  const categorySection = document.querySelector("#category-container");
  if (categorySection) {
    categorySection.className = "category-container-hidden";
  }
  clearSearchInput();
};

var rootElement = document.documentElement;

function handleScroll() {
  // Do something on scroll

  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0.08) {
    // Show button
    scrollToTopBtn.classList.add("showBtn");
  } else {
    // Hide button
    scrollToTopBtn.classList.remove("showBtn");
  }
}

function scrollToTop() {
  // Scroll to top logic

  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const showImgFullPage = (e) => {
  let fullPageImg = e.target.parentElement.parentElement.lastChild;

  fullPageImg.className = "location-fullpage";
  fullPageImg.style.backgroundImage = "url(" + e.target.src + ")";

  fullPageImg.style.display = "block";
};
const abortFullPageImg = (e) => {
  e.target.style.display = "none";
};

//Clear Search Input
const clearSearchInput = () => {
  searchInput.value = "";
};

const addToFavorites = (e) => {
  const sentence = e.target.parentElement.lastChild.textContent;
  const category = e.target.parentElement.parentElement.dataset.key;

  quotesData["quotes"].forEach((item) => {
    if (sentence === item.sentence) {
      if (myFavorites["quotes"]) {
        myFavorites["quotes"].push({
          character: item.character,
          sentence: item.sentence,
        });
      } else {
        myFavorites["quotes"] = [
          { character: item.character, sentence: item.sentence },
        ];
      }
    }
  });

  localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
  categoryRender(category);
};

const deleteFromFavorites = (e) => {
  const sentence = e.target.parentElement.lastChild.textContent;
  const category = e.target.parentElement.parentElement.dataset.key;

  Object.keys(myFavorites).forEach((key) => {
    myFavorites[key].forEach((item) => {
      if (myFavorites[key] && item.sentence === sentence) {
        myFavorites[key] = myFavorites[key].filter(
          (item) => item.sentence !== sentence
        );
        if (myFavorites[key].length === 0) {
          delete myFavorites[key];
        }
      }
    });
  });
  console.log(myFavorites);

  localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
  categoryRender(category);
};

// Create QUOTE Card

const createQuoteCard = (arrayItem) => {
  const newDivQuote = document.createElement("div");
  newDivQuote.className = "quota-card";
  const newIcon = document.createElement("i");
  newIcon.className = "far fa-bookmark icon";
  newIcon.addEventListener("click", addToFavorites);
  newIcon.title = "Add to Favorites";
  Object.keys(myFavorites).forEach((key) => {
    myFavorites[key].forEach((item) => {
      if (item.sentence === arrayItem.sentence) {
        newIcon.className = "far fa-bookmark inFav";
        newIcon.removeEventListener("click", addToFavorites);
        newIcon.addEventListener("click", deleteFromFavorites);
        newIcon.title = "Remove";
      }
    });
  });
  newDivQuote.appendChild(newIcon);
  const newQuotaTitle = document.createElement("h1");
  const newQuotaName = document.createElement("p");
  const newQuotaNameText = document.createTextNode(arrayItem.character);
  const newQuotaText = document.createTextNode(arrayItem.sentence);
  newQuotaTitle.appendChild(newQuotaText);
  newQuotaName.appendChild(newQuotaNameText);
  newDivQuote.appendChild(newQuotaName);
  newDivQuote.appendChild(newQuotaTitle);
  newDivQuote.setAttribute("data-id", arrayItem.id);
  return newDivQuote;
};
// Create character Card
const createCharCard = (arrayItem) => {
  const newDivCard = document.createElement("div");
  const newDivInner = document.createElement("div");
  const newDivFront = document.createElement("div");
  const newDivBack = document.createElement("div");
  newDivCard.className = "card";
  newDivInner.className = "card-inner";
  newDivFront.className = "card-front";
  newDivBack.className = "card-back";
  const newImg = document.createElement("img");
  newImg.src = arrayItem.imageUrl;
  newImg.alt = `${arrayItem.image} photo`;
  newDivFront.appendChild(newImg);
  newDivInner.appendChild(newDivFront);
  newDivInner.appendChild(newDivBack);
  newDivCard.appendChild(newDivInner);
  const nameP = document.createElement("p");
  const namePtext = document.createTextNode(`NAME: ${arrayItem.fullName}`);
  nameP.appendChild(namePtext);
  newDivBack.appendChild(nameP);
  const titleP = document.createElement("p");
  const titlePtext = document.createTextNode(`TITLE: ${arrayItem.title}`);
  titleP.appendChild(titlePtext);
  newDivBack.appendChild(titleP);
  const familyP = document.createElement("p");
  const familyPtext = document.createTextNode(`FAMILY: ${arrayItem.family}`);
  familyP.appendChild(familyPtext);
  newDivBack.appendChild(familyP);
  newDivCard.setAttribute("data-id", arrayItem.id);
  return newDivCard;
};

// Create location Card
const createLocationCard = (arrayItem) => {
  const newDivLocation = document.createElement("div");
  newDivLocation.className = "location-card";
  const newImg = document.createElement("img");
  newImg.src = arrayItem.url;
  newImg.alt = `${arrayItem.name} photo`;

  newImg.addEventListener("click", showImgFullPage);

  const newPName = document.createElement("p");
  const newNameText = document.createTextNode(`Name: ${arrayItem.name} `);
  const newPType = document.createElement("p");
  const newTypeText = document.createTextNode(`Type: ${arrayItem.type}`);
  const newPloc = document.createElement("p");
  const newLocText = document.createTextNode(`Location: ${arrayItem.location}`);
  const newPrule = document.createElement("p");
  const newRulText = document.createTextNode(`Rulers: ${arrayItem.rulers}`);

  newPName.appendChild(newNameText);
  newDivLocation.appendChild(newPName);
  newPrule.appendChild(newRulText);
  newDivLocation.appendChild(newPrule);
  newPloc.appendChild(newLocText);
  newDivLocation.appendChild(newPloc);
  newPType.appendChild(newTypeText);
  newDivLocation.appendChild(newPType);
  newDivLocation.appendChild(newImg);
  newDivLocation.setAttribute("data-id", arrayItem._id);

  return newDivLocation;
};

const categoryRender = (category) => {
  collageContainer.className = "collage-container-hidden";
  const categorySection = document.querySelector("#category-container");
  if (categorySection) {
    categorySection.remove();
  }

  const fullPageImg = document.createElement("div");
  fullPageImg.id = "fullPageImg";
  fullPageImg.className = "full-page";
  fullPageImg.addEventListener("click", abortFullPageImg);

  const newSection = document.createElement("section");
  newSection.id = "category-container";
  newSection.className = "category-container";
  newSection.setAttribute("data-key", category);
  switch (category) {
    case "characters":
      {
        charData.forEach((item) => {
          const newDiv = createCharCard(item);
          newSection.appendChild(newDiv);
        });
      }

      break;

    case "quotes":
      {
        quotesData[category].map((item) => {
          const newDiv = createQuoteCard(item);
          newSection.appendChild(newDiv);
        });
      }

      break;
    case "favorites":
      {
        Object.keys(myFavorites).forEach((key) => {
          myFavorites[key].forEach((item) => {
            const newDiv = createQuoteCard(item);
            newSection.appendChild(newDiv);
          });
        });
      }
      break;

    case "locations":
      {
        quotesData[category].map((item) => {
          const newDiv = createLocationCard(item);
          newSection.appendChild(newDiv);
          newSection.appendChild(fullPageImg);
        });
      }
      break;

    case "searchSection":
      {
        foundItemsInSearch.map((item) => {
          const newDiv = createQuoteCard(item);
          newSection.appendChild(newDiv);
        });
      }

      break;

    default:
      {
        charData.forEach((item) => {
          const newDiv = createCharCard(item);
          newSection.appendChild(newDiv);
        });
      }
      break;
  }

  main.appendChild(newSection);
};

const categoryRenderHandler = (e) => {
  let category = e.target.dataset.key;
  clearSearchInput();
  categoryRender(category);
};

const searchHandler = (e) => {
  console.log("---450---");
  const searchText = e.target.value.toLowerCase();
  foundItemsInSearch = [];

  quotesData["quotes"].map((item) => {
    if (searchText && item.character.toLowerCase().includes(searchText)) {
      foundItemsInSearch.push(item);
    }
  });

  categoryRender("searchSection");
};

//Listeners//
homeBackBtn.addEventListener("click", renderHomePage);
searchInput.addEventListener("input", searchHandler);
characterBtn.addEventListener("click", categoryRenderHandler);
locationBtn.addEventListener("click", categoryRenderHandler);
imgBtn1.addEventListener("click", categoryRenderHandler);
imgBtn2.addEventListener("click", categoryRenderHandler);
imgBtn3.addEventListener("click", categoryRenderHandler);
quotesBtn.addEventListener("click", categoryRenderHandler);
favoritesBtn.addEventListener("click", categoryRenderHandler);
scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);
