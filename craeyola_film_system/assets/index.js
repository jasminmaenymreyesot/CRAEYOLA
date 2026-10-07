// =========================================
// CROYOLA INDEX PAGE
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const choices = document.querySelectorAll(".choice");

    choices.forEach(function (choice) {

        choice.addEventListener("click", function () {

            // Add a small visual effect
            choice.style.opacity = "0.7";

        });

    });

});