document.addEventListener("DOMContentLoaded", function(){

    const form = document.querySelector ("form");
    const ageCheckboxes = document.querySelector ("input[type='checkbox']");
    const ageCheckboxesArray = Array.from (ageCheckboxes);

    function validateField (field, warningId, message){
        if (!field.value.trim()){
            document.getElementById(warningId).textContent = message;
            field.classList.add('invalid');
            return false;
        }
        return true;
    }

    function clearAgeWarning (){
      const isAgeSelected = ageCheckboxesArray.some(checkbox => checkbox.checked);
      if (isAgeSelected){
        document.getElementById("age-warning").textContent = '';
      }
    }

    form.addEventListener('change', function(event) {
        if (event.target.type === 'checkbox') {
            clearAgeWarning();
        }
    });

    form.addEventListener("submit", function(event){
        event.preventDefault();
        let isValid = true;

        document.querySelectorAll('.warning-message').forEach (e => e.textContent = '');
        document.querySelectorAll('input').forEach (e => e.classList.remove ('invalid'));

        isValid = validateField(document.getElementById('first-name'),'first-name-warning', 'First name is required.') && isValid;
        ///...

        clearAgeWarning ();

        const isAgeSelected = ageCheckboxes.some(checkbox = checkbox.checked);
        if(!isAgeSelected){
            document.getElementById ('age-warning').textContent = "please select an age range";
            isValid = false;
        }

        if(isValid){
            alert('Thanks for your submission');
        }

    })

})