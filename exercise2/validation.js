// What does DOMContentLoaded Do?
// The DOMContentLoaded event is a special event that triggers when the HTML document has been completely loaded and parsed by the browser. 
// This means:
// The HTML structure (elements like <div>, <p>, <form>, etc.) is ready to be accessed and manipulated with JavaScript.
// It does not wait for external resources (like images, stylesheets, or iframes) to fully load. It only cares about the DOM.
// How does DOMContentLoaded work?
// document.addEventListener adds a listener for the DOMContentLoaded event.
// When the event fires, the provided function (callback) is executed.
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form"); //Selects the <form> element
    const ageCheckboxes = document.querySelectorAll('input[type="checkbox"]'); //Selects all checkboxes in the form 
    const ageCheckboxesArray = Array.from(ageCheckboxes); //Converts the NodeList (returned by querySelectorAll) into an array

    // Function to validate individual fields
    // purpose: Validates individual input fields (e.g., First Name, Last Name).
    //     field:  The input field element being validated.
    //     warningId: the id of the <span> element where the error message will appear
    //     message: The validation error message to display.
    // logic: if field is empty (field.value.trim() returns false), 1.Display the warning message in the corresponding <span> element.
    // 2.Add the CSS class invalid to the input field (useful for styling). 3. Return false to indicate the field is invalid.
    function validateField(field, warningId, message) {
        if (!field.value.trim()) {
            document.getElementById(warningId).textContent = message;
            field.classList.add('invalid');
            return false;
        }
        return true;
    }

    // Function to clear age warning
    // Purpose: Clears the age warning message when any age checkbox is selected.
    // Logic:
    // Checks if any checkbox is selected using .some().
    // If at least one checkbox is checked, it clears the warning message by setting the content of the <span> with the id="age-warning" to an empty string.
    function clearAgeWarning() {
        const isAgeSelected = ageCheckboxesArray.some(checkbox => checkbox.checked);
        if (isAgeSelected) {
            document.getElementById("age-warning").textContent = '';
        }
    }

    // Add event listener to checkboxes using event delegation
    // Purpose: Responds to any change events within the form, specifically for checkboxes.
    // Logic:
    // Checks if the event target (the element that triggered the event) is a checkbox.
    // If it is, the clearAgeWarning function is called to clear any warnings.
    form.addEventListener('change', function(event) {
        if (event.target.type === 'checkbox') {
            clearAgeWarning();
        }
    });

    form.addEventListener("submit", function(event) {
        // This prevents the default form submission behavior, which is to send the form data to the server and refresh the page.
        // It ensures the validation logic runs first, allowing you to control whether the form should actually be submitted.
        event.preventDefault();  
        let isValid = true; //This flag tracks whether all fields pass validation.
  
        // Clear previous warnings and remove invalid class
        // document.querySelectorAll('.warning-message') selects all elements with the class warning-message (where error messages are displayed).
        // .forEach() iterates through each element and clears the text content (e.textContent = ''), removing any old warnings from a previous submission attempt.
        document.querySelectorAll('.warning-message').forEach(e => e.textContent = '');
        // document.querySelectorAll('input') selects all input fields.
        // .forEach() removes the (CSS class invalid) (used for highlighting invalid fields).
        document.querySelectorAll('input').forEach(e => e.classList.remove('invalid'));
  
        // Validate fields
        // The validateField function checks whether the input fields are non-empty and updates the isValid flag based on the validation result.
        //      Parameters:
        //      document.getElementById("first-name"): The input field to validate.
        //      "first-name-warning": The id of the warning <span> where the error message will be displayed if validation fails.
        //      "First Name is required.": The error message to show if the field is empty.
        // logic: If the field is empty, validateField:
        // 1.Displays the error message in the specified <span>.
        // 2.Adds the invalid class to the input field for styling (e.g., red border).
        // 3.Returns false.
        // The && isValid ensures that isValid remains false if any field fails validation.
        isValid = validateField(document.getElementById("first-name"), "first-name-warning", "First Name is required.") && isValid;
        isValid = validateField(document.getElementById("last-name"), "last-name-warning", "Last Name is required.") && isValid;
        isValid = validateField(document.getElementById("email"), "email-warning", "Valid Email is required.") && isValid;
        isValid = validateField(document.getElementById("phone"), "phone-warning", "Phone number is required.") && isValid;
  
        // Age validation
        clearAgeWarning(); //Calls the clearAgeWarning() function to remove any previous age-related warnings if at least one checkbox is selected.
        // ageCheckboxesArray is an array of all the age checkboxes.
        // .some(checkbox => checkbox.checked) checks if any checkbox is selected.
        // If none are selected:
        // Displays a warning message in the #age-warning span.
        // Sets isValid to false.
        const isAgeSelected = ageCheckboxesArray.some(checkbox => checkbox.checked);
        if (!isAgeSelected) {
            document.getElementById("age-warning").textContent = "Please select an age range.";
            isValid = false;
        }
        
        // After validating all fields:
        // If isValid remains true (meaning all checks passed), it shows a success message (alert).
        // If isValid is false (meaning at least one check failed), it stops the process without showing the alert or submitting the form.
        if(isValid) {
            alert("Thank you for your submission!");
        }
    });
});