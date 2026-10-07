document
    .getElementById("adminLoginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("adminEmail")
            .value
            .trim();

        const password =
            document.getElementById("adminPassword")
            .value;

        const message =
            document.getElementById("adminMessage");


        if (
            email === "" ||
            password === ""
        ) {

            message.textContent =
                "Please complete all fields.";

            return;
        }


        const admin = {

            name: email.split("@")[0],

            email: email,

            role: "project_manager"

        };


        localStorage.setItem(
            "croyolaAdmin",
            JSON.stringify(admin)
        );


        window.location.href =
            "admin-dashboard.html";

    });