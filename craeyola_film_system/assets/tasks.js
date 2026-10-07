// =========================================
// CROYOLA TASK MANAGEMENT
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

    const admin =
        JSON.parse(savedAdmin);


    document.getElementById(
        "adminName"
    ).textContent =
        admin.name || "Project Manager";


    // =====================================
    // PROJECTS
    // =====================================

    let projects =
        JSON.parse(
            localStorage.getItem("croyolaProjects")
        ) || [

            {
                id: 1,
                name: "Hide and Seek",
                client: "CROYOLA Client",
                status: "In Production",
                progress: 72,
                description: "",
                created: "2026-10-01"
            },

            {
                id: 2,
                name: "Beyond the File",
                client: "NU Manila",
                status: "Pre-Production",
                progress: 35,
                description: "",
                created: "2026-09-25"
            },

            {
                id: 3,
                name: "CampusBite",
                client: "Student Project",
                status: "Review",
                progress: 88,
                description: "",
                created: "2026-09-20"
            }

        ];


    // =====================================
    // TASKS
    // =====================================

    let tasks =
        JSON.parse(
            localStorage.getItem("croyolaTasks")
        );


    if (!tasks) {

        tasks = [

            {
                id: 1,
                name: "Finalize storyboard",
                project: "Hide and Seek",
                assignee: "Scriptwriter",
                priority: "High",
                dueDate: "2026-10-08",
                status: "In Progress",
                description: "Finalize storyboard scenes."
            },

            {
                id: 2,
                name: "Animate Scene 04",
                project: "Hide and Seek",
                assignee: "Animator",
                priority: "High",
                dueDate: "2026-10-12",
                status: "To Do",
                description: "Create animation for Scene 04."
            },

            {
                id: 3,
                name: "Review character design",
                project: "Hide and Seek",
                assignee: "Client",
                priority: "Medium",
                dueDate: "2026-10-06",
                status: "Review",
                description: "Review character design submission."
            },

            {
                id: 4,
                name: "Upload background assets",
                project: "Beyond the File",
                assignee: "Artist",
                priority: "Low",
                dueDate: "2026-10-05",
                status: "Done",
                description: "Upload approved background assets."
            }

        ];

        saveTasks();
    }


    // =====================================
    // ELEMENTS
    // =====================================

    const table =
        document.getElementById("taskTable");

    const total =
        document.getElementById("taskTotal");

    const search =
        document.getElementById("searchTask");

    const statusFilter =
        document.getElementById(
            "taskStatusFilter"
        );

    const assigneeFilter =
        document.getElementById(
            "assigneeFilter"
        );

    const modal =
        document.getElementById("taskModal");

    const form =
        document.getElementById("taskForm");

    const projectSelect =
        document.getElementById("taskProject");


    // =====================================
    // SAVE
    // =====================================

    function saveTasks() {

        localStorage.setItem(
            "croyolaTasks",
            JSON.stringify(tasks)
        );

    }


    // =====================================
    // PROJECT OPTIONS
    // =====================================

    function loadProjects() {

        projectSelect.innerHTML = "";

        projects.forEach(function (project) {

            const option =
                document.createElement("option");

            option.value = project.name;

            option.textContent =
                project.name;

            projectSelect.appendChild(option);

        });

    }


    // =====================================
    // RENDER
    // =====================================

    function renderTasks() {

        const searchValue =
            search.value
                .toLowerCase()
                .trim();

        const selectedStatus =
            statusFilter.value;

        const selectedAssignee =
            assigneeFilter.value;


        const filtered =
            tasks.filter(function (task) {

                const matchesSearch =

                    task.name
                        .toLowerCase()
                        .includes(searchValue) ||

                    task.project
                        .toLowerCase()
                        .includes(searchValue);


                const matchesStatus =
                    selectedStatus === "all" ||
                    task.status === selectedStatus;


                const matchesAssignee =
                    selectedAssignee === "all" ||
                    task.assignee === selectedAssignee;


                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesAssignee
                );

            });


        table.innerHTML = "";


        if (filtered.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="7" class="empty">
                        No tasks found.
                    </td>
                </tr>
            `;

        }


        filtered.forEach(function (task) {

            const row =
                document.createElement("tr");


            const statusClass =
                getStatusClass(task.status);


            const priorityClass =
                task.priority.toLowerCase();


            row.innerHTML = `

                <td>
                    <strong>
                        ${escapeHTML(task.name)}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(task.project)}
                </td>

                <td>
                    <span class="assignee">
                        ${escapeHTML(task.assignee)}
                    </span>
                </td>

                <td>
                    <span class="priority ${priorityClass}">
                        ${escapeHTML(task.priority)}
                    </span>
                </td>

                <td>
                    ${task.dueDate}
                </td>

                <td>
                    <span class="status ${statusClass}">
                        ${escapeHTML(task.status)}
                    </span>
                </td>

                <td>

                    <button
                        class="complete-button"
                        data-id="${task.id}"
                    >
                        ${
                            task.status === "Done"
                                ? "Reopen"
                                : "Complete"
                        }
                    </button>

                    <button
                        class="delete-button"
                        data-id="${task.id}"
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
                    ? " Task"
                    : " Tasks"
            );


        attachButtons();

    }


    // =====================================
    // STATUS CLASS
    // =====================================

    function getStatusClass(status) {

        if (status === "To Do") {
            return "todo";
        }

        if (status === "In Progress") {
            return "progress";
        }

        if (status === "Review") {
            return "review";
        }

        return "done";

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
    // BUTTONS
    // =====================================

    function attachButtons() {

        document
            .querySelectorAll(".complete-button")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            Number(
                                button.dataset.id
                            );

                        toggleTask(id);

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
                            Number(
                                button.dataset.id
                            );

                        deleteTask(id);

                    }
                );

            });

    }


    // =====================================
    // COMPLETE / REOPEN
    // =====================================

    function toggleTask(id) {

        tasks =
            tasks.map(function (task) {

                if (task.id === id) {

                    task.status =
                        task.status === "Done"
                            ? "To Do"
                            : "Done";

                }

                return task;

            });


        saveTasks();

        renderTasks();

    }


    // =====================================
    // DELETE
    // =====================================

    function deleteTask(id) {

        const confirmed =
            confirm(
                "Are you sure you want to delete this task?"
            );


        if (!confirmed) {
            return;
        }


        tasks =
            tasks.filter(function (task) {

                return task.id !== id;

            });


        saveTasks();

        renderTasks();

    }


    // =====================================
    // OPEN MODAL
    // =====================================

    document
        .getElementById("openTaskModal")
        .addEventListener(
            "click",
            function () {

                loadProjects();

                modal.classList.add("show");

            }
        );


    // =====================================
    // CLOSE MODAL
    // =====================================

    function closeModal() {

        modal.classList.remove("show");

        form.reset();

    }


    document
        .getElementById("closeTaskModal")
        .addEventListener(
            "click",
            closeModal
        );


    document
        .getElementById("cancelTask")
        .addEventListener(
            "click",
            closeModal
        );


    // =====================================
    // CREATE TASK
    // =====================================

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const newTask = {

                id: Date.now(),

                name:
                    document
                        .getElementById("taskName")
                        .value
                        .trim(),

                project:
                    document
                        .getElementById("taskProject")
                        .value,

                assignee:
                    document
                        .getElementById("taskAssignee")
                        .value,

                priority:
                    document
                        .getElementById("taskPriority")
                        .value,

                dueDate:
                    document
                        .getElementById("taskDueDate")
                        .value,

                status:
                    document
                        .getElementById("taskStatus")
                        .value,

                description:
                    document
                        .getElementById("taskDescription")
                        .value
                        .trim()

            };


            tasks.unshift(newTask);


            saveTasks();

            renderTasks();

            closeModal();

        }
    );


    // =====================================
    // SEARCH / FILTER
    // =====================================

    search.addEventListener(
        "input",
        renderTasks
    );


    statusFilter.addEventListener(
        "change",
        renderTasks
    );


    assigneeFilter.addEventListener(
        "change",
        renderTasks
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
    // CLOSE WHEN CLICKING OUTSIDE
    // =====================================

    window.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                closeModal();

            }

        }
    );


    // =====================================
    // INITIAL LOAD
    // =====================================

    loadProjects();

    renderTasks();

});