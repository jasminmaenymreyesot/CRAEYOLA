// =========================================
// CROYOLA ADMIN SIGN UP
// =========================================

document
    .getElementById("adminSignupForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        // GET FORM VALUES

        const name =
            document
                .getElementById("adminName")
                .value
                .trim();

        const email =
            document
                .getElementById("adminEmail")
                .value
                .trim();

        const password =
            document
                .getElementById("adminPassword")
                .value;

        const confirmPassword =
            document
                .getElementById("adminConfirmPassword")
                .value;

        const message =
            document.getElementById("signupMessage");


        // CHECK EMPTY FIELDS

        if (
            !name ||
            !email ||
            !password ||
            !confirmPassword
        ) {

            message.textContent =
                "Please complete all fields.";

            return;
        }


        // CHECK PASSWORD LENGTH

        if (password.length < 6) {

            message.textContent =
                "Password must be at least 6 characters.";

            return;
        }


        // CHECK PASSWORD MATCH

        if (password !== confirmPassword) {

            message.textContent =
                "Passwords do not match.";

            return;
        }


        // CREATE ADMIN ACCOUNT

        const admin = {

            name: name,

            email: email,

            role: "project-manager"

        };


        // SAVE ADMIN LOGIN INFORMATION

        localStorage.setItem(
            "croyolaAdmin",
            JSON.stringify(admin)
        );


        // OPTIONAL: SAVE REGISTERED ADMIN

        localStorage.setItem(
            "croyolaAdminAccount",
            JSON.stringify({
                name: name,
                email: email,
                password: password,
                role: "project-manager"
            })
        );


        // SUCCESS MESSAGE

        message.style.color = "#28a745";

        message.textContent =
            "Account created successfully!";


        // GO TO ADMIN DASHBOARD

        setTimeout(function () {

            window.location.href =
                "admin-dashboard.html";

        }, 700);

    });