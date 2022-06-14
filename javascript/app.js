"use strict";
//Defining global variables
let oddDuckNames = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "sweep",
  "tauntaun",
  "unicorn",
  "water-can",
  "wine-glass",
];
let oddDuckImages = [
  "pics/bag.jpg",
  "pics/banana.jpg",
  "pics/bathroom.jpg",
  "pics/boots.jpg",
  "pics/breakfast.jpg",
  "pics/bubblegum.jpg",
  "pics/chair.jpg",
  "pics/cthulhu.jpg",
  "pics/dog-duck.jpg",
  "pics/dragon.jpg",
  "pics/pen.jpg",
  "pics/pet-sweep.jpg",
  "pics/scissors.jpg",
  "pics/shark.jpg",
  "pics/sweep.png",
  "pics/tauntaun.jpg",
  "pics/unicorn.jpg",
  "pics/water-can.jpg",
  "pics/wine-glass.jpg",
];

let allProducts = [];
let totalClicks = 0;

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

//for loop to create new products using names and images array
function createProduct() {
  for (let i = 0; i < oddDuckNames.length; i++) {
    new Product(oddDuckNames[i], oddDuckImages[i]);
  }
}

Product.prototype.render = function (i) {
  let img = document.getElementById(`image${i}`);
  img.src = this.src;
};

function getRandomProduct() {
  let random = Math.floor(Math.random() * oddDuckImages.length);
  return allProducts[random];
}

function makeRandomProductArray() {
  let productArray = [];
  while (productArray.length < 3) {
    let randomNumber = getRandomProduct();
    if (!productArray.includes(randomNumber)) {
      productArray.push(randomNumber);
    }
  }
  return productArray;
}

let randomProducts = [];
function randomRenderImage() {
  randomProducts = makeRandomProductArray();
  for (let i = 0; i < randomProducts.length; i++) {
    let randomProduct = randomProducts[i];

    randomProduct.views++;
    randomProduct.render(i);
  }
}
function onClick(event) {
  let id = event.target.id;
  let currentClicks = 0;
  let totalClicksAllowed = 10;
  if (currentClicks === totalClicksAllowed) {
    for (let i = 0; i < 2; i++) {
      let img = document.getElementById(`image${i}`);
      img.removeEventListener("click", clickHandler);
    }
    alert("Voting has ended, please View Results.");
  } else {
    currentClicks++;
    randomProducts[`${id[5]}`].clicks++;
    randomRenderImage();
  }
}

// function renderList() {
//   let divContainer = document.getElementById("data-list");

//   for (let i = 0; i < allProducts.length; i++) {
//     let product = allProducts[i];
//     let listItem = document.createElement("li");
//     listItem.innerText = `${product.name} was clicked ${product.clicks} times, and seen ${product.views} times.`;
//     divContainer.appendChild(listItem);
//   }
// }
Product.prototype.onClick = function (i) {
  let img = document.getElementById(`image${i}`);
  img.addEventListener("click", onClick);
  };

Product.prototype.renderList = function () {
  let button = document.getElementById("results");
  let listItem = document.createElement("li");
  listItem.innerText = `${this.name} was clicked ${this.clicks} times, and seen ${this.views} times.`;
  button.appendChild(listItem);
};

function saveData() {
  let stringifyImages = JSON.stringify(allProducts);
  localStorage.setItem("images", stringifyImages);
}

function getData() {
  let newArray = [];
  let returnedItems = localStorage.getItem("images");
  newArray.push(returnedItems);
  console.log(newArray);
}

//calling functions
createProduct();
getRandomProduct();
randomRenderImage();
for (let i = 0; i < allProducts.length; i++) {
  let product = allProducts[i];
  product.renderList();
}
saveData();
getData();
