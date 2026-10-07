/* ======================================
   CROYOLA USER FORMS JS
====================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ======================================
       USER INFORMATION
    ====================================== */

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

        const name =
            savedUser.name ||
            savedUser.fullName ||
            savedUser.username ||
            "User";

        const role =
            savedUser.role ||
            "Creative User";

        userName.textContent = name;

        userRole.textContent = role;

        userAvatar.textContent =
            name.charAt(0).toUpperCase();

    }


    /* ======================================
       FORM DATA
    ====================================== */

    let submittedForms =
        JSON.parse(
            localStorage.getItem(
                "croyola_submitted_forms"
            )
        ) || [];


    /* ======================================
       ELEMENTS
    ====================================== */

    const formModal =
        document.getElementById("formModal");

    const dynamicForm =
        document.getElementById("dynamicForm");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );

    const formProject =
        document.getElementById("formProject");

    const formSubject =
        document.getElementById("formSubject");

    const formDetails =
        document.getElementById("formDetails");

    const submittedFormsContainer =
        document.getElementById(
            "submittedForms"
        );


    let currentFormType = "";


    /* ======================================
       FORM CONFIGURATION
    ====================================== */

    const formTypes = {

        project: {

            title: "Project Request",

            description:
                "Request a new multimedia project.",

            subject:
                "Project Name"

        },

        task: {

            title: "Task Request",

            description:
                "Request a new task for a project.",

            subject:
                "Task Name"

        },

        revision: {

            title: "Revision Request",

            description:
                "Submit a request for project revisions.",

            subject:
                "Revision Subject"

        },

        feedback: {

            title: "Feedback Form",

            description:
                "Send feedback or suggestions.",

            subject:
                "Feedback Subject"

        }

    };


    /* ======================================
       OPEN FORM BUTTONS
    ====================================== */

    const formButtons =
        document.querySelectorAll(
            ".form-btn"
        );


    formButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const type =
                    button.dataset.form;

                openForm(type);

            }
        );

    });


    /* ======================================
       OPEN FORM
    ====================================== */

    function openForm(type) {

        currentFormType = type;

        const config =
            formTypes[type];

        if (!config) return;


        modalTitle.textContent =
            config.title;

        modalDescription.textContent =
            config.description;

        document.getElementById(
            "subjectLabel"
        ).textContent =
            config.subject;


        dynamicForm.reset();

        formModal.classList.add("show");

    }


    /* ======================================
       CLOSE FORM
    ====================================== */

    function closeForm() {

        formModal.classList.remove(
            "show"
        );

        dynamicForm.reset();

        currentFormType = "";

    }


    document
        .getElementById("closeModalBtn")
        .addEventListener(
            "click",
            closeForm
        );


    document
        .getElementById("cancelBtn")
        .addEventListener(
            "click",
            closeForm
        );


    formModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                formModal
            ) {

                closeForm();

            }

        }
    );


    /* ======================================
       SUBMIT FORM
    ====================================== */

    dynamicForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const project =
                formProject.value;

            const subject =
                formSubject.value.trim();

            const details =
                formDetails.value.trim();


            if (
                !project ||
                !subject ||
                !details
            ) {

                alert(
                    "Please complete all required fields."
                );

                return;

            }


            const newForm = {

                id:
                    Date.now(),

                type:
                    currentFormType,

                title:
                    formTypes[
                        currentFormType
                    ].title,

                project:
                    project,

                subject:
                    subject,

                details:
                    details,

                date:
                    new Date().toLocaleDateString(
                        "en-US",
                        {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        }
                    ),

                status:
                    "Submitted"

            };


            submittedForms.unshift(
                newForm
            );


            localStorage.setItem(
                "croyola_submitted_forms",
                JSON.stringify(
                    submittedForms
                )
            );


            renderSubmittedForms();

            closeForm();


            alert(
                "Form submitted successfully!"
            );

        }
    );


    /* ======================================
       RENDER SUBMITTED FORMS
    ====================================== */

    function renderSubmittedForms() {

        if (
            submittedForms.length === 0
        ) {

            submittedFormsContainer.innerHTML = `
                <div class="empty">
                    You have not submitted any forms yet.
                </div>
            `;

            return;

        }


        submittedFormsContainer.innerHTML =
            submittedForms.map(
                function (form) {

                    return `

                        <div class="submitted-item">

                            <div class="submitted-info">

                                <strong>
                                    ${form.title}
                                </strong>

                                <small>
                                    ${form.project}
                                    •
                                    ${form.subject}
                                    •
                                    ${form.date}
                                </small>

                            </div>

                            <span class="form-status">
                                ${form.status}
                            </span>

                        </div>

                    `;

                }
            ).join("");

    }


    /* ======================================
       CLEAR HISTORY
    ====================================== */

    document
        .getElementById("clearFormsBtn")
        .addEventListener(
            "click",
            function () {

                if (
                    submittedForms.length === 0
                ) {

                    alert(
                        "There is no form history to clear."
                    );

                    return;

                }


                const confirmed =
                    confirm(
                        "Clear all submitted form history?"
                    );


                if (!confirmed) return;


                submittedForms = [];


                localStorage.removeItem(
                    "croyola_submitted_forms"
                );


                renderSubmittedForms();

            }
        );


    /* ======================================
       LOGOUT
    ====================================== */

    document
        .getElementById("logoutBtn")
        .addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmed) return;


                localStorage.removeItem(
                    "croyola_current_user"
                );


                window.location.href =
                    "index.html";

            }
        );


    /* ======================================
       INITIALIZE
    ====================================== */

    renderSubmittedForms();

});