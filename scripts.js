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
  console.log('--18--'+slideIndex);
  showSlides(slideIndex += n);
  console.log('--20--'+slideIndex);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  console.log('--18--'+slideIndex);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  console.log('--30--'+slides.length);
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length
    console.log('--32--'+slideIndex);}
  for (i = 0; i < slides.length; i++) {
    console.log('--34--'+slideIndex);
    slides[i].style.display = "none";  
  }

  slides[slideIndex-1].style.display = "block";  

}
//slider finish//

let data;

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
  data = await response.json();
};
getCharData();

let quotesData;
const getQuotesData = async () => {
  const response = await fetch("https://ervandogan12.github.io/GotData/quotes.json");
  quotesData = await response.json();
    // quotesData['locations'].forEach((item) => {
    //   console.log(item);
    // });
};
getQuotesData();



let myFavorites = [];
let foundItemsInSearch = [];

const favorites = localStorage.getItem("myFavorites");
if (favorites) {
  myFavorites = JSON.parse(favorites);
}
let isToggled = false;

// Selectors//
const homeBackBtn = document.querySelector("#back-home");
const characterBtn = document.querySelector("#character");
const navCharacterBtn = document.querySelector("#nav-character");
const main = document.querySelector("main");
const collageContainer = document.querySelector("#collage-container");
const toggleIcon = document.querySelector("#toggle-icon");
const locationBtn = document.querySelector("#location");
const navlocationBtn = document.querySelector("#nav-location");
const quotesBtn = document.querySelector("#quotes");
const navquotesBtn = document.querySelector("#nav-quotes");
const imgBtn1 = document.querySelector("#img-1");
const imgBtn2 = document.querySelector("#img-2");
const imgBtn3 = document.querySelector("#img-3");
const favoritesBtn = document.querySelector("#favorites");
const navFavoritesBtn = document.querySelector("#nav-favorites");
const bar = document.querySelectorAll("span");
const searchInput = document.getElementById("search-input");
const fullPageImg = document.getElementById("fullPageImg");
const scrollToTopBtn = document.querySelector(".scrollToTopBtn");

//////////// HELPER FUNCTIONS ////////////
const renderHomePage = () => {
  collageContainer.className = "collage-container";
  const categorySection = document.querySelector("#category-container");
  console.log('--160--'+categorySection.className)
  if (categorySection) {
    categorySection.className = "category-container-hidden";
  }
  isToggled && toggleHandler();
  clearSearchInput();
};

//Go to Top Button


var rootElement = document.documentElement;

function handleScroll() {
  // Do something on scroll
  console.log("--175--");
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0.08) {
    console.log("--120--"+rootElement.scrollHeight);
    console.log("--121--"+rootElement.clientHeight);
    console.log("--122--"+scrollTotal);
    console.log("--123--"+rootElement.scrollTop / scrollTotal);
    // Show button
    scrollToTopBtn.classList.add("showBtn");
  } else {
    console.log("--182--");
    // Hide button
    scrollToTopBtn.classList.remove("showBtn");
  }
}

function scrollToTop() {
  // Scroll to top logic
  console.log("--190--");
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}



//Abort Nav Menu
const screenTouchToggle = (e) => {
  if (e.target.id === "toggle-navigation") {
  } else if (e.target.id === "toggle-navigation-list") {
  } else if (e.target.id === "toggle-navigation") {
  } else if (e.target.id === "toggle-icon") {
  } else if (e.target.className === "bar") {
  } else if (e.target.className === "list-item") {
  } else {
    isToggled && toggleHandler();
  }
};

document.addEventListener("click", screenTouchToggle);

//Show Image Full Screen
const showImgFullPage = (e) => {

  let fullPageImg = e.target.parentElement.parentElement.lastChild;
  console.log('--199--'+fullPageImg);
  fullPageImg.className = "location-fullpage";
  fullPageImg.style.backgroundImage = "url(" + e.target.src + ")";
   console.log('--202--'+ e.target.src);
   console.log('--203--'+ fullPageImg.style.backgroundImage);
  fullPageImg.style.display = "block";
};
const abortFullPageImg = (e) => {
  e.target.style.display = "none";
  console.log('--206--'+e.target);
};

//Clear Search Input
const clearSearchInput = () => {
  searchInput.value = "";
  isToggled && toggleHandler();
  isToggled = false;
};

//Add to / Remove from Favorites
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
  console.log(category+"--242--");
  Object.keys(myFavorites).forEach((key) => {
    console.log("--234--");
    myFavorites[key].forEach((item) => {
      console.log("--236--");
      if (myFavorites[key] && item.sentence === sentence) {
        console.log("--238--");
        myFavorites[key] = myFavorites[key].filter(
          (item) => item.sentence !== sentence
        );
        if (myFavorites[key].length === 0) {
          console.log("--242--");
          delete myFavorites[key];
        }
      }
    });
  });
  console.log(myFavorites);
  console.log("--249--");
  localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
  console.log("--251--");
  categoryRender(category);
};

// Create QUOTE Card

const createQuoteCard = (arrayItem) => {
  const newDiv = document.createElement("div");
  newDiv.className = "quota-card";
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
  newDiv.appendChild(newIcon);
  const newQuotaTitle = document.createElement("h1");
  const newQuotaName = document.createElement("p");
  const newQuotaNameText = document.createTextNode(arrayItem.character);
  const newQuotaText = document.createTextNode(arrayItem.sentence);
  newQuotaTitle.appendChild(newQuotaText);
  newQuotaName.appendChild(newQuotaNameText);
  newDiv.appendChild(newQuotaName);
  newDiv.appendChild(newQuotaTitle);
  newDiv.setAttribute("data-id", arrayItem.id);
  return newDiv;
};
// Create character Card
const createCharCard = (arrayItem) => {
  const newDivCard = document.createElement("div");
  const newDivInner = document.createElement("div");
  const newDivFront = document.createElement("div");
  const newDivBack = document.createElement("div");
  newDivCard.className = "card";
  newDivInner.className="card-inner";
  newDivFront.className="card-front";
  newDivBack.className="card-back";
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

// Create character Card
const createLocationCard = (arrayItem) => {
  const newDiv = document.createElement("div");
  newDiv.className = "location-card";
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
  newDiv.appendChild(newPName);
  newPrule.appendChild(newRulText);
  newDiv.appendChild(newPrule);
  newPloc.appendChild(newLocText);
  newDiv.appendChild(newPloc);
  newPType.appendChild(newTypeText);
  newDiv.appendChild(newPType);
  newDiv.appendChild(newImg);
  newDiv.setAttribute("data-id", arrayItem._id);

  return newDiv;
};

const categoryRender = (category) => {
  console.log("--351--");
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
        data.forEach((item) => {
          const newDiv = createCharCard(item);
          newSection.appendChild(newDiv);
        });
      }

      break;

    case "quotes":
      {
        console.log('---388---');
        quotesData[category].map((item) => {
          const newDiv = createQuoteCard(item);
          newSection.appendChild(newDiv);
        });
      }

      break;
    case "favorites":
      {

        Object.keys(myFavorites).forEach((key) => {
          console.log('---400---');
          myFavorites[key].forEach((item) => {
            console.log('---402---');
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
          });
        }
        break;

    case "searchSection":
      {
        console.log('---415---');
        foundItemsInSearch.map((item) => {
          console.log('---417---');
          const newDiv = createQuoteCard(item);
          newSection.appendChild(newDiv);
        });
      }

      break;

    default:
      {
        data.forEach((item) => {
          const newDiv = createCharCard(item);
          newSection.appendChild(newDiv);
        });
      }
      break;
  }
  newSection.appendChild(fullPageImg);
  main.appendChild(newSection);
  isToggled && toggleHandler();
};

//////////// EVENT HANDLERS /////////////////////
const categoryRenderHandler = (e) => {
  let category = e.target.dataset.key;
  toggleHandler();
  clearSearchInput();
  categoryRender(category);
};


const searchHandler = (e) => {
console.log('---450---');
  const searchText = e.target.value.toLowerCase();
  foundItemsInSearch = [];
    console.log('---454---');
    quotesData["quotes"].map((item) => {
      console.log('---456---');
      if (searchText && item.character.toLowerCase().includes(searchText)) {
        console.log('---458---');
        foundItemsInSearch.push(item);
      }
    });

  categoryRender("searchSection");
};

const toggleHandler = () => {
  if (!isToggled) {
    document.querySelector("#toggle-container").className =
      "toggle-pushed-container";
    document.querySelector("#toggle-navigation").className =
      "toggle-pushed-navigation";
    isToggled = true;
  } else {
    isToggled = false;
    document.querySelector("#toggle-container").className = "toggle-container";
    document.querySelector("#toggle-navigation").className =
      "toggle-navigation";
  }
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
toggleIcon.addEventListener("click", toggleHandler);
navCharacterBtn.addEventListener("click", categoryRenderHandler);
navFavoritesBtn.addEventListener("click", categoryRenderHandler);
scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);