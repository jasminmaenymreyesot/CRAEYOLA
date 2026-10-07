/* ======================================
   CROYOLA USER PROJECTS JS
====================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       USER INFORMATION
    =============================== */

    const savedUser = JSON.parse(
        localStorage.getItem("croyola_current_user")
    );

    const userName = document.getElementById("userName");
    const userRole = document.getElementById("userRole");
    const userAvatar = document.getElementById("userAvatar");

    if (savedUser) {

        if (savedUser.name) {
            userName.textContent = savedUser.name;

            userAvatar.textContent =
                savedUser.name.charAt(0).toUpperCase();
        }

        if (savedUser.role) {
            userRole.textContent = savedUser.role;
        }

    }


    /* ===============================
       MODAL
    =============================== */

    const modal =
        document.getElementById("projectModal");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalStatus =
        document.getElementById("modalStatus");

    const modalProgress =
        document.getElementById("modalProgress");

    const closeModal =
        document.getElementById("closeModal");

    const closeModal2 =
        document.getElementById("closeModal2");


    function openProject(projectName) {

        const projectData = {

            "Beyond the File": {
                description:
                    "Multimedia animation project involving story, visual assets and production materials.",
                status: "In Progress",
                progress: "65%"
            },

            "CROYOLA Promotional Video": {
                description:
                    "Promotional multimedia content for the CROYOLA creative production system.",
                status: "In Progress",
                progress: "40%"
            },

            "Brand Visual Assets": {
                description:
                    "Collection of visual materials prepared for multimedia branding requirements.",
                status: "Completed",
                progress: "100%"
            }

        };


        const project = projectData[projectName];

        if (!project) {
            return;
        }

        modalTitle.textContent = projectName;

        modalDescription.textContent =
            project.description;

        modalStatus.textContent =
            project.status;

        modalProgress.textContent =
            project.progress;

        modal.classList.add("show");
    }


    function hideModal() {
        modal.classList.remove("show");
    }


    /* ===============================
       VIEW PROJECT BUTTONS
    =============================== */

    const viewButtons =
        document.querySelectorAll(".view-btn");

    viewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const projectName =
                button.dataset.project;

            openProject(projectName);

        });

    });


    /* ===============================
       DETAILS BUTTONS
    =============================== */

    const detailButtons =
        document.querySelectorAll(".more-btn");

    detailButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const projectName =
                button.dataset.project;

            openProject(projectName);

        });

    });


    /* ===============================
       CLOSE MODAL
    =============================== */

    closeModal.addEventListener(
        "click",
        hideModal
    );

    closeModal2.addEventListener(
        "click",
        hideModal
    );


    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {
                hideModal();
            }

        }
    );


    /* ===============================
       NEW PROJECT
    =============================== */

    const newProjectBtn =
        document.getElementById("newProjectBtn");

    newProjectBtn.addEventListener(
        "click",
        function () {

            alert(
                "New Project form will be available here."
            );

        }
    );


    /* ===============================
       RELATED TASKS
    =============================== */

    const openTaskBtn =
        document.getElementById("openTaskBtn");

    openTaskBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "user-tasks.html";

        }
    );


    /* ===============================
       REFRESH ACTIVITY
    =============================== */

    const refreshBtn =
        document.getElementById("refreshBtn");

    refreshBtn.addEventListener(
        "click",
        function () {

            refreshBtn.textContent =
                "Updated ✓";

            setTimeout(function () {

                refreshBtn.textContent =
                    "Refresh";

            }, 1500);

        }
    );


    /* ===============================
       LOGOUT
    =============================== */

    const logoutBtn =
        document.getElementById("logoutBtn");

    logoutBtn.addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );

            if (confirmLogout) {

                localStorage.removeItem(
                    "croyola_current_user"
                );

                window.location.href =
                    "login-user.html";
            }

        }
    );

});