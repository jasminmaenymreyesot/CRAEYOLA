document
    .getElementById("userLoginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("userEmail").value.trim();

        const password =
            document.getElementById("userPassword").value;

        const role =
            document.getElementById("userRole").value;

        const message =
            document.getElementById("loginMessage");


        // Check fields

        if (
            email === "" ||
            password === "" ||
            role === ""
        ) {

            message.textContent =
                "Please complete all fields.";

            return;
        }


        // Create user information

        const user = {

            name: email.split("@")[0],

            email: email,

            role: role

        };


        // Save user information

        localStorage.setItem(
            "croyolaUser",
            JSON.stringify(user)
        );


        // Go to dashboard

        window.location.href =
            "user-dashboard.html";

    });