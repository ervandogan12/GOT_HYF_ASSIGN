//navbar start//

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//slider start//

const mediaQuery = window.matchMedia("max-width: 768px");

if (mediaQuery) {
  const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(
      ".slider-wrapper .slide-button"
    );
    const sliderScrollbar = document.querySelector(
      ".container .slider-scrollbar"
    );
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition =
        sliderScrollbar.getBoundingClientRect().width -
        scrollbarThumb.offsetWidth;

      // Update thumb position on mouse move
      const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        const newThumbPosition = thumbPosition + deltaX;
        // Ensure the scrollbar thumb stays within bounds
        const boundedPosition = Math.max(
          0,
          Math.min(maxThumbPosition, newThumbPosition)
        );
        const scrollPosition =
          (boundedPosition / maxThumbPosition) * maxScrollLeft;

        scrollbarThumb.style.left = `${boundedPosition}px`;
        imageList.scrollLeft = scrollPosition;
      };
      // Remove event listeners on mouse up
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
      // Add event listeners for drag interaction
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });
    // Slide images according to the slide button clicks
    slideButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.id === "prev-slide" ? -1 : 1;
        const scrollAmount = imageList.clientWidth * direction;
        imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    });
    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
      slideButtons[0].style.display =
        imageList.scrollLeft <= 0 ? "none" : "flex";
      slideButtons[1].style.display =
        imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    };
    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition =
        (scrollPosition / maxScrollLeft) *
        (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
    };
    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      handleSlideButtons();
    });
  };

  window.addEventListener("resize", initSlider);
  window.addEventListener("load", initSlider);
}

//slider finish//

let data;

const getData = async () => {
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
getData();

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

//////////// ELEMENT SELECTORS ////////////
const main = document.querySelector("main");
const collageContainer = document.querySelector("#collage-container");
const toggleIcon = document.querySelector("#toggle-icon");
const homeBackBtn = document.querySelector("#back-home");
const peopleBtn = document.querySelector("#people");
const navPeopleBtn = document.querySelector("#nav-people");
const locationBtn = document.querySelector("#location");
const navlocationBtn = document.querySelector("#nav-location");
const quotesBtn = document.querySelector("#quotes");
const navquotesBtn = document.querySelector("#nav-quotes");
const imgBtn1 = document.querySelector("#img-1");
const imgBtn2 = document.querySelector("#img-2");
const imgBtn3 = document.querySelector("#img-3");
// const navVehiclesBtn = document.querySelector("#nav-vehicles");
const favoritesBtn = document.querySelector("#favorites");
const navFavoritesBtn = document.querySelector("#nav-favorites");
const bar = document.querySelectorAll("span");
const searchInput = document.getElementById("search-input");
const fullPageImg = document.getElementById("fullPageImg");
const goToTopButton = document.getElementById("goToTopButton");

//////////// HELPER FUNCTIONS ////////////
const renderHomePage = () => {
  collageContainer.className = "collage-container";
  const collectionSection = document.querySelector("#collection-container");
  console.log('--160--'+collectionSection.className)
  if (collectionSection) {
    collectionSection.className = "collection-container-hidden";
  }
  isToggled && toggleHandler();
  clearSearchInput();
};

//Go to Top Button
const goToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const showGoToTopButton = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTopButton.style.display = "block";
  } else {
    goToTopButton.style.display = "none";
  }
};

//Abort Navigation Menu
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
  const collection = e.target.parentElement.parentElement.dataset.key;


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
  collectionRender(collection);
};

const deleteFromFavorites = (e) => {
  const sentence = e.target.parentElement.lastChild.textContent;
  const collection = e.target.parentElement.parentElement.dataset.key;
  console.log(collection+"--242--");
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
  collectionRender(collection);
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
  const newDiv = document.createElement("div");
  newDiv.className = "card";
  const newImg = document.createElement("img");
  newImg.src = arrayItem.imageUrl;
  newImg.alt = `${arrayItem.image} photo`;
  newDiv.appendChild(newImg);
  const newP = document.createElement("p");
  const newText = document.createTextNode(
    `${arrayItem.firstName} ${
      arrayItem.lastName === "None" || arrayItem.lastName === "Unknown"
        ? ""
        : arrayItem.lastName
    }`
  );
  newP.appendChild(newText);
  newDiv.appendChild(newP);
  newDiv.setAttribute("data-id", arrayItem.id);
  return newDiv;
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

const collectionRender = (collection) => {
  console.log("--351--");
  collageContainer.className = "collage-container-hidden";
  const collectionSection = document.querySelector("#collection-container");
  if (collectionSection) {
    collectionSection.remove();
  }

  const fullPageImg = document.createElement("div");
  fullPageImg.id = "fullPageImg";
  fullPageImg.className = "full-page";
  fullPageImg.addEventListener("click", abortFullPageImg);

  const newSection = document.createElement("section");
  newSection.id = "collection-container";
  newSection.className = "collection-container";
  newSection.setAttribute("data-key", collection);
  switch (collection) {
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
        quotesData[collection].map((item) => {
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
          quotesData[collection].map((item) => {
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
const collectionRenderHandler = (e) => {
  let collection = e.target.dataset.key;
  toggleHandler();
  clearSearchInput();
  collectionRender(collection);
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

  collectionRender("searchSection");
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

////////////// EVENT LISTENERS //////////
window.addEventListener("scroll", showGoToTopButton);
homeBackBtn.addEventListener("click", renderHomePage);
searchInput.addEventListener("input", searchHandler);
peopleBtn.addEventListener("click", collectionRenderHandler);
locationBtn.addEventListener("click", collectionRenderHandler);
imgBtn1.addEventListener("click", collectionRenderHandler);
imgBtn2.addEventListener("click", collectionRenderHandler);
imgBtn3.addEventListener("click", collectionRenderHandler);
quotesBtn.addEventListener("click", collectionRenderHandler);
// speciesBtn.addEventListener("click", collectionRenderHandler);
// starshipsBtn.addEventListener("click", collectionRenderHandler);
//vehiclesBtn.addEventListener("click", collectionRenderHandler);
favoritesBtn.addEventListener("click", collectionRenderHandler);
toggleIcon.addEventListener("click", toggleHandler);
navPeopleBtn.addEventListener("click", collectionRenderHandler);
// navSpeciesBtn.addEventListener("click", collectionRenderHandler);
// navStarshipsBtn.addEventListener("click", collectionRenderHandler);
// navVehiclesBtn.addEventListener("click", collectionRenderHandler);
navFavoritesBtn.addEventListener("click", collectionRenderHandler);
goToTopButton.addEventListener("click", goToTop);
