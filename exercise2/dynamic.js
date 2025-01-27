// global variable setup:  🌟 what is global variable??
// Gets a reference to the elements with ID 'formfield' from the HTML
// This is where all input fields are contained
let formfield = document.getElementById('formfield');

// add functions: create a new <input> element and set its attributes
function add(){
  let newField = document.createElement('input');
  newField.setAttribute('type','text'); // make it text input
  newField.setAttribute('name','text'); // set the name attribute 
  newField.setAttribute('class','text'); // add the 'text' css class
  newField.setAttribute('size',50); // set the width into 50
  newField.setAttribute('placeholder','Optional Field'); // add placeholder text 
  formfield.appendChild(newField); // add the new input field to the form using appendChild() 🌟 explain this!
}

// remove function: Gets all <input> elements inside the formfield and check if it needed to be delete
function remove(){
  let input_tags = formfield.getElementsByTagName('input'); // select all <input> tags
  if(input_tags.length > 2) { // if the number of <input> tags > 2, delete the last input fiels.
    formfield.removeChild(input_tags[(input_tags.length) - 1]);
  }
}