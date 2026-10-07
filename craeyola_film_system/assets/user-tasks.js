/* ======================================
   CROYOLA USER TASKS JS
====================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       USER
    =============================== */

    const savedUser = JSON.parse(
        localStorage.getItem("croyola_current_user")
    );

    const userName =
        document.getElementById("userName");

    const userRole =
        document.getElementById("userRole");

    const userAvatar =
        document.getElementById("userAvatar");

    if (savedUser) {

        if (savedUser.name) {

            userName.textContent =
                savedUser.name;

            userAvatar.textContent =
                savedUser.name
                .charAt(0)
                .toUpperCase();
        }

        if (savedUser.role) {
            userRole.textContent =
                savedUser.role;
        }
    }


    /* ===============================
       FILTER
    =============================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const taskRows =
        document.querySelectorAll(".task-row");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.dataset.filter;


            taskRows.forEach(function (task) {

                const status =
                    task.dataset.status;


                if (
                    filter === "all" ||
                    filter === status
                ) {

                    task.style.display =
                        "grid";

                } else {

                    task.style.display =
                        "none";

                }

            });

        });

    });


    /* ===============================
       TASK MODAL
    =============================== */

    const modal =
        document.getElementById("taskModal");

    const modalTaskName =
        document.getElementById("modalTaskName");

    const modalTaskTitle =
        document.getElementById("modalTaskTitle");

    const closeModal =
        document.getElementById("closeModal");

    const closeModal2 =
        document.getElementById("closeModal2");


    const taskButtons =
        document.querySelectorAll(".task-btn");


    taskButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const taskName =
                button.dataset.task;

            modalTaskName.textContent =
                taskName;

            modalTaskTitle.textContent =
                taskName;

            modal.classList.add("show");

        });

    });


    function hideModal() {

        modal.classList.remove("show");

    }


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
       UPDATE TASK
    =============================== */

    const updateTaskBtn =
        document.getElementById("updateTaskBtn");

    updateTaskBtn.addEventListener(
        "click",
        function () {

            alert(
                "Task status updated successfully."
            );

            hideModal();

        }
    );


    /* ===============================
       ADD TASK
    =============================== */

    const addTaskBtn =
        document.getElementById("addTaskBtn");

    addTaskBtn.addEventListener(
        "click",
        function () {

            alert(
                "Add Task form will be available here."
            );

        }
    );


    /* ===============================
       REFRESH
    =============================== */

    const refreshTasks =
        document.getElementById("refreshTasks");

    refreshTasks.addEventListener(
        "click",
        function () {

            refreshTasks.textContent =
                "Updated ✓";

            setTimeout(function () {

                refreshTasks.textContent =
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

            if (
                confirm(
                    "Are you sure you want to logout?"
                )
            ) {

                localStorage.removeItem(
                    "croyola_current_user"
                );

                window.location.href =
                    "login-user.html";
            }

        }
    );

});