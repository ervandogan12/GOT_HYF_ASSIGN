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

const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  
  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
      
      // Update thumb position on mouse move
      const handleMouseMove = (e) => {
          const deltaX = e.clientX - startX;
          const newThumbPosition = thumbPosition + deltaX;
          // Ensure the scrollbar thumb stays within bounds
          const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
          const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
          
          scrollbarThumb.style.left = `${boundedPosition}px`;
          imageList.scrollLeft = scrollPosition;
      }
      // Remove event listeners on mouse up
      const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }
      // Add event listeners for drag interaction
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });
  // Slide images according to the slide button clicks
  slideButtons.forEach(button => {
      button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = imageList.clientWidth * direction;
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
  });
   // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
      slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
      slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  }
  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
  }
  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      handleSlideButtons();
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener("resize", initSlider);
  window.addEventListener("load", initSlider);
}

//slider finish//

let data;

const getData = async () => {

  const url = 'https://game-of-thrones1.p.rapidapi.com/Characters';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ac7004bf47msh2f4c6c7b1900cc8p1928afjsn3080a2b617ef',
      'X-RapidAPI-Host': 'game-of-thrones1.p.rapidapi.com'
    }
  };

  let response = await fetch(url, options);
  data = await response.json();
}
getData();



// let data;
// const getData = async () => {
//   const response = await fetch("https://ervandogan12.github.io/GotData/characters.json");
//   data = await response.json();
//   console.log(data);
// };
// getData();


let myFavorites = [];
let foundItemsInSearch = [];

// const favorites = localStorage.getItem("myFavorites");
// if (favorites) {
//   myFavorites = JSON.parse(favorites);
// }
let isToggled = false;

//////////// ELEMENT SELECTORS ////////////
const main = document.querySelector("main");
const collageContainer = document.querySelector("#collage-container");
const toggleIcon = document.querySelector("#toggle-icon");
const homeIcon = document.querySelector("#home-icon");
const peopleBtn = document.querySelector("#people");
const navPeopleBtn = document.querySelector("#nav-people");
//const locationBtn = document.querySelector("#locations");
const navlocationBtn = document.querySelector("#nav-location");
// const starshipsBtn = document.querySelector("#starships");
// const navStarshipsBtn = document.querySelector("#nav-starships");
const imgBtn1 = document.querySelector("#img-1");
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
  fullPageImg.className = "full-page";
  fullPageImg.style.backgroundImage = "url(" + e.target.src + ")";
  fullPageImg.style.display = "block";
};

const abortFullPageImg = (e) => {
  e.target.style.display = "none";
};

//Clear Search Input
const clearSearchInput = () => {
  searchInput.value = "";
  isToggled && toggleHandler();
  isToggled = false;
};

//Add to / Remove from Favorites
const addToFavorites = (e) => {
  const id = parseInt(e.target.parentNode.dataset.id);
  let isInFavorite = myFavorites.filter(favItem => favItem.id === id);
  if(isInFavorite.length === 1){
    return
  } else {
    data.forEach(item => {
      if(item.id === id){
        myFavorites.push(item);
      }
    })
  }  
  console.log(myFavorites)  
  localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
  collectionRender();
  }


const deleteFromFavorites = (e) => {
  const id = parseInt(e.target.parentNode.dataset.id);
    myFavorites.forEach((item) => {
      if (myFavorites && item.id === id) {
        myFavorites = myFavorites.filter(
          (item) => item.id !== id
        );
        if (myFavorites.length === 0) {
          return
        }
      }
    });
  console.log(myFavorites)
  localStorage.setItem("myFavorites", JSON.stringify(myFavorites));
  collectionRender();
};

// Create Card
const createCard = (arrayItem) => {
  const newDiv = document.createElement("div");
  newDiv.className = "card";
  const newImg = document.createElement("img");
  newImg.src = arrayItem.imageUrl;
  newImg.alt = `${arrayItem.image} photo`;
  newDiv.appendChild(newImg);
  newImg.addEventListener("click", showImgFullPage);
  const newIcon = document.createElement("i");
  newIcon.className = "fa fa-heart-o icon";
  newIcon.addEventListener("click", addToFavorites);
  newIcon.title = "Add to Favorites";
  myFavorites.forEach((item) => {
      if (item.id === arrayItem.id) {
        newIcon.className = "fa fa-heart inFav";
        newIcon.removeEventListener("click", addToFavorites);
        newIcon.addEventListener("click", deleteFromFavorites);
        newIcon.title = "Remove";
      }
    });
  newDiv.appendChild(newIcon);
  const newP = document.createElement("p");
  const newText = document.createTextNode(`${arrayItem.firstName} ${(arrayItem.lastName === 'None' || arrayItem.lastName === 'Unknown') ? '' :arrayItem.lastName}`);
  newP.appendChild(newText);
  newDiv.appendChild(newP);
  newDiv.setAttribute("data-id", arrayItem.id);
  return newDiv;
};

const createCardDetails = (collectionItem) => {
  const newDiv = document.createElement("div");
  newDiv.className = "card-details";
  const newImg = document.createElement("img");
  newImg.src = collectionItem.imageUrl;
  newImg.alt = `${collectionItem.firstName} photo`;
  newDiv.appendChild(newImg);
  newImg.addEventListener("click", showImgFullPage);
  const newIcon = document.createElement("i");
  newIcon.className = "fa fa-heart-o icon";
  newIcon.addEventListener("click", addToFavorites);
  newIcon.title = "Add to Favorites";
  Object.keys(myFavorites).forEach((key) => {
    myFavorites[key].forEach((item) => {
      if (item.name === collectionItem.firstName) {
        newIcon.className = "fa fa-heart inFav";
        newIcon.removeEventListener("click", addToFavorites);
        newIcon.addEventListener("click", deleteFromFavorites);
        newIcon.title = "Remove";
      }
    });
  });
  newDiv.appendChild(newIcon);
  const newUl = document.createElement("ul");
 let details = Object.keys(collectionItem);
 details.forEach(item=>{
 
  let newDetails = document.createElement('li');

  newDetails.textContent = collectionItem[item];

  newUl.appendChild(newDetails);

 });

 newDiv.appendChild(newUl);

 
console.log('-------227-----')
 console.log(details);
 console.log('-------229-----')
  // const newText = document.createTextNode(collectionItem.firstName);
  // newP.appendChild(newText);
  // newDiv.appendChild(newUl);
  return newDiv;
};
//Render Collection Section
const collectionRender = () => {
  collageContainer.className = "collage-container-hidden";
  const collectionSection = document.querySelector("#collection-container");
  if (collectionSection) {
    collectionSection.remove();
  }
  const newSection = document.createElement("section");
  newSection.id = "collection-container";
  newSection.className = "collection-container";
  data.forEach((item) => {
    const newDiv = createCard(item);
    newSection.appendChild(newDiv);
  });
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
  const searchText = e.target.value.toLowerCase();
  foundItemsInSearch = [];
  Object.keys(data).map((key) => {
    data[key].map((item) => {
      if (searchText && item.name.toLowerCase().includes(searchText)) {
        foundItemsInSearch.push(item);
      }
    });
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
homeIcon.addEventListener("click", renderHomePage);
searchInput.addEventListener("input", searchHandler);
peopleBtn.addEventListener("click", collectionRenderHandler);
//locationBtn.addEventListener('click',  collectionRenderHandler)
imgBtn1.addEventListener("click", collectionRenderHandler);
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

