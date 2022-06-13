'use strict'
//Defining global variables
let oddDuckNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass']
let oddDuckImages = ['pics/bag.jpg', 'pics/banana.jpg', 'pics/bathroom.jpg', 'pics/boots.jpg', 'pics/breakfast.jpg', 'pics/bubblegum.jpg', 'pics/chair.jpg', 'pics/cthulhu.jpg', 'pics/dog-duck.jpg', 'pics/dragon.jpg', 'pics/pen.jpg', 'pics/pet-sweep.jpg', 'pics/scissors.jpg', 'pics/shark.jpg', 'pics/sweep.png', 'pics/tauntaun.jpg', 'pics/unicorn.jpg', 'pics/water-can.jpg', 'pics/wine-glass.jpg']


let allProducts = [];
let maxVotes = 5;

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.clicks = 0;
  this.views = 0;
 allProducts.push(this);
} 
function createProduct() {
  for(let i = 0;i < oddDuckNames.length;i++) {
  new Product(oddDuckNames[i], oddDuckImages[i])
  }
}
//render images
Product.prototype.render = function (i) {
  let img = document.getElementById(`image${i}`);
  img.src = this.src;
};

//for loop to create new products using names and images array

createProduct();

function getRandomProduct() {
  let random = Math.floor(Math.random() * oddDuckImages.length);
  return allProducts[random];
}
getRandomProduct();


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
function randomRenderImage(){
  randomProducts = makeRandomProductArray();
  for(let i = 0; i < randomProducts.length; i++){
    let randomProduct = randomProducts[i];

    randomProduct.views++;
    randomProduct.render(i);
  }
}
randomRenderImage();

function addClickHandler(i) {
  let img = document.getElementById(`image${i}`);
  img.addEventListener("click", randomRenderImage);
  allProducts[i].clicks++;
}
console.log(randomProducts)
addClickHandler(0);
addClickHandler(1);
addClickHandler(2);


// Product.prototype.results = function() {
//   let liCell = document.createElement('li');
//   liCell.textContent = `${this.name} was clicked ${this.clicks }`
// }

// let retrievedProductsParsed = JSON.parse(localStorage.getItem('allProducts'));