const firstName = document.getElementById("fname");
const number = document.getElementById("num");
const subject = document.getElementById("subject");
const error = document.getElementById("erroe");
const btn = document.getElementById("btn-contact");

btn.addEventListener("click", event => {
    if (firstName.value === "" && subject.value === "") {
        error.textContent = "Input a name and a subject";
        error.classList.color = "red";
        event.preventDefault(); // Prevent form submission
    } else if (firstName.value === "") {
        error.textContent = "Input a name";
        error.classList.add("error");
        event.preventDefault(); // Prevent form submission
    } else if(subject.value === ""){
        error.textContent = "Input a subject";
        error.classList.add("error");
        event.preventDefault(); // Prevent form submission

    }else{
        error.textContent = "Succesful";
        error.style.color = "green";
    }
});
