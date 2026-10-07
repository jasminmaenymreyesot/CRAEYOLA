// =========================================
// CROYOLA ADMIN DASHBOARD
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    // Get saved admin
    const savedAdmin =
        localStorage.getItem("croyolaAdmin");

    // If there is no admin account,
    // return to admin login
    if (!savedAdmin) {

        window.location.href =
            "login-admin.html";

        return;
    }


    // Convert saved data into an object
    const admin =
        JSON.parse(savedAdmin);


    // Display admin name
    const adminName =
        document.getElementById("adminName");

    const welcomeName =
        document.getElementById("welcomeName");


    if (adminName) {

        adminName.textContent =
            admin.name || "Project Manager";

    }


    if (welcomeName) {

        welcomeName.textContent =
            admin.name || "Project Manager";

    }


    // =====================================
    // DASHBOARD DATA
    // =====================================

    const projects = [
        {
            name: "Hide and Seek",
            client: "CROYOLA Client",
            status: "In Production",
            progress: 72
        },

        {
            name: "Beyond the File",
            client: "NU Manila",
            status: "Pre-Production",
            progress: 35
        },

        {
            name: "CampusBite",
            client: "Student Project",
            status: "Review",
            progress: 88
        }
    ];


    const tasks = [
        {
            name: "Finalize storyboard",
            project: "Hide and Seek",
            status: "In Progress"
        },

        {
            name: "Animate Scene 04",
            project: "Hide and Seek",
            status: "To Do"
        },

        {
            name: "Review character design",
            project: "Hide and Seek",
            status: "Review"
        }
    ];


    const assets = [
        "Scene04-Storyboard.pdf",
        "Character-Alice.png",
        "Scene04-Animation.mp4",
        "HideAndSeek-Script.docx"
    ];


    const reviews = [
        {
            asset: "Character-Alice.png",
            status: "Revision Required"
        },

        {
            asset: "Scene04-Storyboard.pdf",
            status: "Approved"
        }
    ];


    // =====================================
    // UPDATE STATISTICS
    // =====================================

    document.getElementById("projectCount")
        .textContent = projects.length;


    document.getElementById("taskCount")
        .textContent = tasks.length;


    document.getElementById("assetCount")
        .textContent = assets.length;


    document.getElementById("reviewCount")
        .textContent =
        reviews.filter(function (review) {

            return review.status !== "Approved";

        }).length;


    // =====================================
    // LOGOUT
    // =====================================

    const logoutButton =
        document.getElementById("logoutButton");


    logoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "croyolaAdmin"
            );

            window.location.href =
                "login-admin.html";

        }
    );

});