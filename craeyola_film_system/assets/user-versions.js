
/* =========================================
   CROYOLA USER VERSIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("CROYOLA User Versions loaded.");


    /* =========================================
       USER INFORMATION
       ========================================= */

    const userName = document.getElementById("userName");
    const userRole = document.getElementById("userRole");
    const userAvatar = document.getElementById("userAvatar");

    let currentUser = null;

    try {

        const savedUser =
            localStorage.getItem("croyola_current_user");

        if (savedUser) {
            currentUser = JSON.parse(savedUser);
        }

    } catch (error) {

        console.warn(
            "Unable to read current user."
        );

    }


    if (currentUser) {

        const name =
            currentUser.name ||
            currentUser.fullName ||
            currentUser.username ||
            "User";

        const role =
            currentUser.role ||
            "Creative Member";

        if (userName) {
            userName.textContent = name;
        }

        if (userRole) {
            userRole.textContent = role;
        }

        if (userAvatar) {
            userAvatar.textContent =
                name.charAt(0).toUpperCase();
        }

    }


    /* =========================================
       ELEMENTS
       ========================================= */

    const versionList =
        document.getElementById("versionList");

    const projectFilter =
        document.getElementById("projectFilter");

    const statusFilter =
        document.getElementById("statusFilter");

    const searchVersion =
        document.getElementById("searchVersion");

    const totalVersions =
        document.getElementById("totalVersions");

    const pendingVersions =
        document.getElementById("pendingVersions");

    const approvedVersions =
        document.getElementById("approvedVersions");

    const revisionVersions =
        document.getElementById("revisionVersions");

    const refreshBtn =
        document.getElementById("refreshBtn");

    const newVersionBtn =
        document.getElementById("newVersionBtn");


    /* =========================================
       MODAL ELEMENTS
       ========================================= */

    const modal =
        document.getElementById("versionModal");

    const closeModal =
        document.getElementById("closeModal");

    const cancelVersionBtn =
        document.getElementById("cancelVersionBtn");

    const versionForm =
        document.getElementById("versionForm");


    const versionProject =
        document.getElementById("versionProject");

    const versionName =
        document.getElementById("versionName");

    const versionNumber =
        document.getElementById("versionNumber");

    const versionDate =
        document.getElementById("versionDate");

    const versionDescription =
        document.getElementById("versionDescription");

    const versionFile =
        document.getElementById("versionFile");


    /* =========================================
       GET VERSION ROWS
       ========================================= */

    function getVersionRows() {

        if (!versionList) {
            return [];
        }

        return Array.from(
            versionList.querySelectorAll(
                ".version-row"
            )
        );

    }


    /* =========================================
       UPDATE STATISTICS
       ========================================= */

    function updateStatistics() {

        const rows =
            getVersionRows();

        let pending = 0;
        let approved = 0;
        let revision = 0;


        rows.forEach(function (row) {

            const status =
                row.dataset.status || "";


            if (status === "Pending Review") {
                pending++;
            }

            if (status === "Approved") {
                approved++;
            }

            if (status === "Revision Needed") {
                revision++;
            }

        });


        if (totalVersions) {
            totalVersions.textContent =
                rows.length;
        }

        if (pendingVersions) {
            pendingVersions.textContent =
                pending;
        }

        if (approvedVersions) {
            approvedVersions.textContent =
                approved;
        }

        if (revisionVersions) {
            revisionVersions.textContent =
                revision;
        }

    }


    /* =========================================
       LOAD PROJECT FILTER
       ========================================= */

    function loadProjects() {

        if (!projectFilter) {
            return;
        }


        const rows =
            getVersionRows();

        const projects = [];


        rows.forEach(function (row) {

            const project =
                row.dataset.project;

            if (
                project &&
                !projects.includes(project)
            ) {
                projects.push(project);
            }

        });


        projects.forEach(function (project) {

            const exists =
                Array.from(
                    projectFilter.options
                ).some(function (option) {

                    return option.value === project;

                });


            if (!exists) {

                const option =
                    document.createElement("option");

                option.value = project;
                option.textContent = project;

                projectFilter.appendChild(option);

            }

        });

    }


    /* =========================================
       FILTER VERSIONS
       ========================================= */

    function filterVersions() {

        const rows =
            getVersionRows();

        const selectedProject =
            projectFilter
                ? projectFilter.value
                : "all";

        const selectedStatus =
            statusFilter
                ? statusFilter.value
                : "all";

        const searchText =
            searchVersion
                ? searchVersion.value
                    .toLowerCase()
                    .trim()
                : "";


        rows.forEach(function (row) {

            const project =
                row.dataset.project || "";

            const status =
                row.dataset.status || "";

            const text =
                row.textContent
                    .toLowerCase();


            const projectMatch =
                selectedProject === "all" ||
                project === selectedProject;

            const statusMatch =
                selectedStatus === "all" ||
                status === selectedStatus;

            const searchMatch =
                searchText === "" ||
                text.includes(searchText);


            if (
                projectMatch &&
                statusMatch &&
                searchMatch
            ) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    }


    /* =========================================
       OPEN MODAL
       ========================================= */

    function openNewVersionForm() {

        if (!modal) {
            return;
        }


        modal.classList.add("show");


        if (versionDate) {

            const today =
                new Date()
                    .toISOString()
                    .split("T")[0];

            versionDate.value = today;

        }


        setTimeout(function () {

            if (versionProject) {
                versionProject.focus();
            }

        }, 100);

    }


    /* =========================================
       CLOSE MODAL
       ========================================= */

    function closeNewVersionForm() {

        if (modal) {
            modal.classList.remove("show");
        }

    }


    /* =========================================
       NEW VERSION BUTTON
       ========================================= */

    if (newVersionBtn) {

        newVersionBtn.addEventListener(
            "click",
            openNewVersionForm
        );

    }


    /* =========================================
       CLOSE BUTTON
       ========================================= */

    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeNewVersionForm
        );

    }


    /* =========================================
       CANCEL BUTTON
       ========================================= */

    if (cancelVersionBtn) {

        cancelVersionBtn.addEventListener(
            "click",
            closeNewVersionForm
        );

    }


    /* =========================================
       CLICK OUTSIDE MODAL
       ========================================= */

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {
                    closeNewVersionForm();
                }

            }
        );

    }


    /* =========================================
       ESC KEY
       ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("show")
            ) {

                closeNewVersionForm();

            }

        }
    );


    /* =========================================
       CREATE VERSION ROW
       ========================================= */

    function createVersionRow(data) {

        const row =
            document.createElement("div");

        row.className = "version-row";

        row.dataset.project =
            data.project;

        row.dataset.status =
            "Pending Review";


        row.innerHTML = `

            <div class="version-main">

                <div class="version-icon">
                    ${escapeHTML(data.version)}
                </div>

                <div class="version-info">

                    <strong>
                        ${escapeHTML(data.name)}
                    </strong>

                    <span>
                        ${escapeHTML(data.project)}
                    </span>

                </div>

            </div>


            <div class="version-date">
                ${escapeHTML(data.date)}
            </div>


            <span class="version-status pending">
                Pending Review
            </span>


            <button
                type="button"
                class="version-btn"
            >
                View
            </button>

        `;


        const viewButton =
            row.querySelector(
                ".version-btn"
            );


        if (viewButton) {

            viewButton.addEventListener(
                "click",
                function () {

                    showVersionDetails(data);

                }
            );

        }


        return row;

    }


    /* =========================================
       ESCAPE HTML
       ========================================= */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =========================================
       VERSION DETAILS
       ========================================= */

    function showVersionDetails(data) {

        let message =
            "VERSION DETAILS\n\n";

        message +=
            "Version: " +
            data.version +
            "\n";

        message +=
            "Name: " +
            data.name +
            "\n";

        message +=
            "Project: " +
            data.project +
            "\n";

        message +=
            "Date: " +
            data.date +
            "\n";

        message +=
            "Status: Pending Review\n\n";

        message +=
            "Description:\n" +
            data.description;


        if (data.file) {

            message +=
                "\n\nFile: " +
                data.file;

        }


        alert(message);

    }


    /* =========================================
       SUBMIT VERSION
       ========================================= */

    if (versionForm) {

        versionForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* VALIDATION */

                if (
                    !versionProject.value ||
                    !versionName.value.trim() ||
                    !versionNumber.value.trim() ||
                    !versionDate.value ||
                    !versionDescription.value.trim()
                ) {

                    alert(
                        "Please complete all required fields."
                    );

                    return;

                }


                /* DATE */

                const dateObject =
                    new Date(
                        versionDate.value +
                        "T00:00:00"
                    );


                const formattedDate =
                    dateObject.toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric"
                        }
                    );


                /* FILE */

                let fileName = "";


                if (
                    versionFile &&
                    versionFile.files &&
                    versionFile.files.length > 0
                ) {

                    fileName =
                        versionFile.files[0].name;

                }


                /* DATA */

                const newVersion = {

                    project:
                        versionProject.value,

                    name:
                        versionName.value.trim(),

                    version:
                        versionNumber.value
                            .trim()
                            .toUpperCase(),

                    date:
                        formattedDate,

                    description:
                        versionDescription.value
                            .trim(),

                    file:
                        fileName

                };


                /* CREATE ROW */

                const newRow =
                    createVersionRow(
                        newVersion
                    );


                if (versionList) {

                    versionList.prepend(
                        newRow
                    );

                }


                /* RESET */

                versionForm.reset();


                /* CLOSE */

                closeNewVersionForm();


                /* UPDATE */

                loadProjects();

                updateStatistics();

                filterVersions();


                /* SUCCESS */

                alert(
                    "Version submitted successfully!\n\n" +
                    "Status: Pending Review"
                );

            }
        );

    }


    /* =========================================
       FILTER EVENTS
       ========================================= */

    if (projectFilter) {

        projectFilter.addEventListener(
            "change",
            filterVersions
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterVersions
        );

    }


    if (searchVersion) {

        searchVersion.addEventListener(
            "input",
            filterVersions
        );

    }


    /* =========================================
       REFRESH
       ========================================= */

    if (refreshBtn) {

        refreshBtn.addEventListener(
            "click",
            function () {

                updateStatistics();

                loadProjects();

                filterVersions();

            }
        );

    }


    /* =========================================
       EXISTING VIEW BUTTONS
       ========================================= */

    const existingViewButtons =
        document.querySelectorAll(
            ".version-row .version-btn"
        );


    existingViewButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const row =
                        button.closest(
                            ".version-row"
                        );

                    if (!row) {
                        return;
                    }


                    const title =
                        row.querySelector(
                            ".version-info strong"
                        );

                    const project =
                        row.dataset.project ||
                        "Unknown Project";

                    const status =
                        row.dataset.status ||
                        "Unknown Status";

                    const date =
                        row.querySelector(
                            ".version-date"
                        );


                    let message =
                        "VERSION DETAILS\n\n";

                    message +=
                        "Version: " +
                        (
                            title
                                ? title.textContent.trim()
                                : "Unknown"
                        ) +
                        "\n";

                    message +=
                        "Project: " +
                        project +
                        "\n";

                    message +=
                        "Status: " +
                        status +
                        "\n";

                    message +=
                        "Date: " +
                        (
                            date
                                ? date.textContent.trim()
                                : "Unknown"
                        );


                    alert(message);

                }
            );

        }
    );


    /* =========================================
       LOGOUT
       ========================================= */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {
                    return;
                }


                localStorage.removeItem(
                    "croyola_current_user"
                );


                window.location.href =
                    "index.html";

            }
        );

    }


    /* =========================================
       INITIALIZE
       ========================================= */

    loadProjects();

    updateStatistics();

    filterVersions();

});
