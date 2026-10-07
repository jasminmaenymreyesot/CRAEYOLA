// =========================================
// CROYOLA PROJECT MANAGEMENT
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // ADMIN CHECK
    // =====================================

    const savedAdmin =
        localStorage.getItem("croyolaAdmin");

    if (!savedAdmin) {

        window.location.href =
            "login-admin.html";

        return;
    }

    const admin = JSON.parse(savedAdmin);


    // =====================================
    // ADMIN NAME
    // =====================================

    const adminName =
        document.getElementById("adminName");

    if (adminName) {
        adminName.textContent =
            admin.name || "Project Manager";
    }


    // =====================================
    // DEFAULT PROJECTS
    // =====================================

    let projects =
        JSON.parse(
            localStorage.getItem("croyolaProjects")
        );


    if (!projects) {

        projects = [

            {
                id: 1,
                name: "Hide and Seek",
                client: "CROYOLA Client",
                status: "In Production",
                progress: 72,
                description:
                    "Horror mystery multimedia production project.",
                created: "2026-10-01"
            },

            {
                id: 2,
                name: "Beyond the File",
                client: "NU Manila",
                status: "Pre-Production",
                progress: 35,
                description:
                    "Digital waste awareness animation project.",
                created: "2026-09-25"
            },

            {
                id: 3,
                name: "CampusBite",
                client: "Student Project",
                status: "Review",
                progress: 88,
                description:
                    "Campus food ordering multimedia project.",
                created: "2026-09-20"
            }

        ];

        saveProjects();
    }


    // =====================================
    // ELEMENTS
    // =====================================

    const table =
        document.getElementById("projectTable");

    const total =
        document.getElementById("projectTotal");

    const search =
        document.getElementById("searchProject");

    const filter =
        document.getElementById("statusFilter");

    const modal =
        document.getElementById("projectModal");

    const detailsModal =
        document.getElementById("detailsModal");

    const form =
        document.getElementById("projectForm");


    // =====================================
    // SAVE PROJECTS
    // =====================================

    function saveProjects() {

        localStorage.setItem(
            "croyolaProjects",
            JSON.stringify(projects)
        );

    }


    // =====================================
    // RENDER PROJECTS
    // =====================================

    function renderProjects() {

        const searchValue =
            search.value
                .toLowerCase()
                .trim();

        const statusValue =
            filter.value;


        const filtered =
            projects.filter(function (project) {

                const matchesSearch =
                    project.name
                        .toLowerCase()
                        .includes(searchValue) ||

                    project.client
                        .toLowerCase()
                        .includes(searchValue);


                const matchesStatus =
                    statusValue === "all" ||
                    project.status === statusValue;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            });


        table.innerHTML = "";


        if (filtered.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6" class="empty">
                        No projects found.
                    </td>
                </tr>
            `;

        }


        filtered.forEach(function (project) {

            const row =
                document.createElement("tr");


            const statusClass =
                project.status
                    .toLowerCase()
                    .replaceAll(" ", "-");


            row.innerHTML = `

                <td>
                    <strong>
                        ${escapeHTML(project.name)}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(project.client)}
                </td>

                <td>
                    <span class="badge ${statusClass}">
                        ${escapeHTML(project.status)}
                    </span>
                </td>

                <td>

                    <div class="progress-wrapper">

                        <div class="progress-bar">

                            <div
                                class="progress-fill"
                                style="width:${project.progress}%"
                            ></div>

                        </div>

                        <span>
                            ${project.progress}%
                        </span>

                    </div>

                </td>

                <td>
                    ${project.created}
                </td>

                <td>

                    <button
                        class="view-button"
                        data-id="${project.id}"
                    >
                        View
                    </button>

                    <button
                        class="delete-button"
                        data-id="${project.id}"
                    >
                        Delete
                    </button>

                </td>

            `;


            table.appendChild(row);

        });


        total.textContent =
            filtered.length +
            (
                filtered.length === 1
                    ? " Project"
                    : " Projects"
            );


        attachButtons();

    }


    // =====================================
    // ESCAPE HTML
    // =====================================

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    // =====================================
    // VIEW / DELETE BUTTONS
    // =====================================

    function attachButtons() {

        document
            .querySelectorAll(".view-button")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            Number(button.dataset.id);

                        showDetails(id);

                    }
                );

            });


        document
            .querySelectorAll(".delete-button")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            Number(button.dataset.id);

                        deleteProject(id);

                    }
                );

            });

    }


    // =====================================
    // SHOW DETAILS
    // =====================================

    function showDetails(id) {

        const project =
            projects.find(function (item) {

                return item.id === id;

            });


        if (!project) {
            return;
        }


        document.getElementById(
            "detailsTitle"
        ).textContent = project.name;


        document.getElementById(
            "detailsClient"
        ).textContent =
            "Client: " + project.client;


        document.getElementById(
            "detailsStatus"
        ).textContent =
            project.status;


        document.getElementById(
            "detailsProgress"
        ).textContent =
            project.progress + "%";


        document.getElementById(
            "detailsCreated"
        ).textContent =
            project.created;


        document.getElementById(
            "detailsDescription"
        ).textContent =
            project.description ||
            "No description provided.";


        detailsModal.classList.add("show");

    }


    // =====================================
    // DELETE PROJECT
    // =====================================

    function deleteProject(id) {

        const project =
            projects.find(function (item) {

                return item.id === id;

            });


        if (!project) {
            return;
        }


        const confirmed =
            confirm(
                "Delete project '" +
                project.name +
                "'?"
            );


        if (!confirmed) {
            return;
        }


        projects =
            projects.filter(function (item) {

                return item.id !== id;

            });


        saveProjects();

        renderProjects();

    }


    // =====================================
    // OPEN PROJECT MODAL
    // =====================================

    document
        .getElementById("openProjectModal")
        .addEventListener(
            "click",
            function () {

                modal.classList.add("show");

            }
        );


    // =====================================
    // CLOSE PROJECT MODAL
    // =====================================

    function closeProjectModal() {

        modal.classList.remove("show");

        form.reset();

        document.getElementById(
            "projectProgress"
        ).value = 0;

    }


    document
        .getElementById("closeProjectModal")
        .addEventListener(
            "click",
            closeProjectModal
        );


    document
        .getElementById("cancelProject")
        .addEventListener(
            "click",
            closeProjectModal
        );


    // =====================================
    // CLOSE DETAILS
    // =====================================

    document
        .getElementById("closeDetailsModal")
        .addEventListener(
            "click",
            function () {

                detailsModal.classList.remove("show");

            }
        );


    // =====================================
    // CREATE PROJECT
    // =====================================

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const newProject = {

                id: Date.now(),

                name:
                    document
                        .getElementById("projectName")
                        .value
                        .trim(),

                client:
                    document
                        .getElementById("clientName")
                        .value
                        .trim(),

                status:
                    document
                        .getElementById("projectStatus")
                        .value,

                progress:
                    Number(
                        document
                            .getElementById("projectProgress")
                            .value
                    ),

                description:
                    document
                        .getElementById("projectDescription")
                        .value
                        .trim(),

                created:
                    new Date()
                        .toISOString()
                        .split("T")[0]

            };


            projects.unshift(newProject);


            saveProjects();

            renderProjects();

            closeProjectModal();

        }
    );


    // =====================================
    // SEARCH
    // =====================================

    search.addEventListener(
        "input",
        renderProjects
    );


    // =====================================
    // FILTER
    // =====================================

    filter.addEventListener(
        "change",
        renderProjects
    );


    // =====================================
    // LOGOUT
    // =====================================

    document
        .getElementById("logoutButton")
        .addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "croyolaAdmin"
                );

                window.location.href =
                    "login-admin.html";

            }
        );


    // =====================================
    // CLOSE MODALS WHEN CLICKING OUTSIDE
    // =====================================

    window.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                closeProjectModal();

            }


            if (event.target === detailsModal) {

                detailsModal.classList.remove(
                    "show"
                );

            }

        }
    );


    // =====================================
    // INITIAL LOAD
    // =====================================

    renderProjects();

});