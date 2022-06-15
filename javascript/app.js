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
let randomProducts = [];
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


function randomRenderImage() {
  randomProducts = makeRandomProductArray();
  for (let i = 0; i < randomProducts.length; i++) {
    let randomProduct = randomProducts[i];

    randomProduct.views++;
    randomProduct.render(i);
  }
}

function clickHandler(n){
  let img = document.getElementById(`image${n}`);
  img.addEventListener('click', onClick);
}

function onClick(event) {
  let id = event.target.id;
  let currentClicks = 0;
  let totalClicksAllowed = 25;
  if (currentClicks === totalClicksAllowed) {
    for (let i = 0; i < 2; i++) {
      let img = document.getElementById(`image${i}`);
      img.removeEventListener("click", clickHandler);
    }
    alert("Voting has ended.");
  } else {
    currentClicks++;
    randomProducts[`${id[5]}`].clicks++;
    console.log(currentClicks)
    console.log(randomProducts);
    randomRenderImage();
  }
}

Product.prototype.onClick = function (i) {
  let img = document.getElementById(`image${i}`);
  img.addEventListener("click", onClick);
  };

function saveData() {
  let stringifyData = JSON.stringify(allProducts);
  localStorage.setItem("data", stringifyData);
}

function getData() {
  let newArray = [];
  let returnedItems = localStorage.getItem("data");
  JSON.parse(returnedItems);
  newArray.push(returnedItems);
  console.log(newArray);
}

function renderChart () {
  let ctx = document.getElementById("results").getContext("2d");

  let labels = [];
  let votes = [];
  let views = [];

  for (let i = 0; i < allProducts.length; i++) {
    let product = allProducts[i];
    labels.push(product.name);
    votes.push(product.clicks);
    views.push(product.views);
  }

  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# of Votes",
          data: votes,
          backgroundColor: ["rgba(255, 99, 132"],
          borderColor: ["rgba(255, 99, 132"],
          borderWidth: 1,
        },
        {
          label: "# of Views",
          data: views,
          backgroundColor: ["rgba(54, 162, 235"],
          borderColor: ["rgba(54, 162, 235"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 12,
        },
      },
    },
  });
}

//calling functions
createProduct();
getRandomProduct();
randomRenderImage();
clickHandler(0);
clickHandler(1);
clickHandler(2);
saveData();
getData();
