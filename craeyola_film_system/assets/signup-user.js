document
    .getElementById("signupForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name")
            .value
            .trim();

        const email =
            document.getElementById("email")
            .value
            .trim();

        const password =
            document.getElementById("password")
            .value;

        const role =
            document.getElementById("role")
            .value;


        if (
            name === "" ||
            email === "" ||
            password === "" ||
            role === ""
        ) {

            document.getElementById(
                "signupMessage"
            ).textContent =
                "Please complete all fields.";

            return;
        }


        const user = {

            name: name,

            email: email,

            role: role

        };


        localStorage.setItem(

            "croyolaUser",

            JSON.stringify(user)

        );


        /*
         * IMPORTANT:
         * After registration,
         * go directly to dashboard.
         */

        window.location.href =
            "user-dashboard.html";

    });