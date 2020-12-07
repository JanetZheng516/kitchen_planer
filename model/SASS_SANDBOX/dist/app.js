var modalIngredient = document.getElementById("myModalIngredient");
// Get the button that opens the modal
var btnIngredient = document.getElementById("myBtnAddIngredient");
// When the user clicks on the button, open the modal
btnIngredient.onclick = function() {
  modalIngredient.style.display = "block";
}

// Get the <span> element that closes the modal
var spanIngredient = document.getElementsByClassName("close")[1];
// When the user clicks on <span> (x), close the modal
spanIngredient.onclick = function() {
  modalIngredient.style.display = "none";
}

// Get the modal
var modalRecipe = document.getElementById("myModalRecipe");
// Get the button that opens the modal
var btnRecipe = document.getElementById("myBtnAddrecipe");
// When the user clicks on the button, open the modal
btnRecipe.onclick = function() {
  modalRecipe.style.display = "block";
}

// Get the <span> element that closes the modal
var spanRecipe = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
spanRecipe.onclick = function() {
  modalRecipe.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalIngredient) {
    modalIngredient.style.display = "none";
  }
  if (event.target == modalRecipe) {
    modalRecipe.style.display = "none";
  }
}
