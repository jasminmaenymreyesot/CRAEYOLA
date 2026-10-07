// ======================================
// CROYOLA PRODUCTION FORMS
// ======================================


// ELEMENTS

const formList =
    document.getElementById("formList");

const searchForm =
    document.getElementById("searchForm");

const formStatusFilter =
    document.getElementById("formStatusFilter");

const formTypeFilter =
    document.getElementById("formTypeFilter");

const formModal =
    document.getElementById("formModal");

const newFormBtn =
    document.getElementById("newFormBtn");

const closeModal =
    document.getElementById("closeModal");

const cancelBtn =
    document.getElementById("cancelBtn");

const productionForm =
    document.getElementById("productionForm");

const formTitle =
    document.getElementById("formTitle");

const formProject =
    document.getElementById("formProject");

const formType =
    document.getElementById("formType");

const submittedBy =
    document.getElementById("submittedBy");

const formPriority =
    document.getElementById("formPriority");

const formDescription =
    document.getElementById("formDescription");


// ======================================
// ADMIN CHECK
// ======================================

const admin =
    localStorage.getItem("croyolaAdmin");

if (!admin) {

    window.location.href =
        "login-admin.html";

}


// ======================================
// PROJECTS
// ======================================

let projects =
    JSON.parse(
        localStorage.getItem("croyolaProjects")
    ) || [

        {
            id: 1,
            name: "Hide and Seek"
        },

        {
            id: 2,
            name: "Beyond the File"
        },

        {
            id: 3,
            name: "CampusBite"
        }

    ];


// ======================================
// FORMS DATA
// ======================================

let forms =
    JSON.parse(
        localStorage.getItem("croyolaForms")
    );


if (!forms) {

    forms = [

        {
            id: 1,
            title: "Character Asset Request",
            project: "Hide and Seek",
            type: "Asset Request",
            submittedBy: "Artist",
            priority: "High",
            status: "Pending",
            description:
                "Request additional character reference assets.",
            date: "2026-10-03"
        },

        {
            id: 2,
            title: "Storyboard Revision",
            project: "Hide and Seek",
            type: "Revision Request",
            submittedBy: "Scriptwriter",
            priority: "Medium",
            status: "Approved",
            description:
                "Update storyboard based on approved script.",
            date: "2026-10-01"
        },

        {
            id: 3,
            title: "Background Asset Request",
            project: "Beyond the File",
            type: "Asset Request",
            submittedBy: "Artist",
            priority: "Low",
            status: "Completed",
            description:
                "Request background illustrations for scenes.",
            date: "2026-09-29"
        },

        {
            id: 4,
            title: "Project Brief",
            project: "CampusBite",
            type: "Project Brief",
            submittedBy: "Client",
            priority: "High",
            status: "Pending",
            description:
                "Initial project requirements and objectives.",
            date: "2026-10-04"
        }

    ];

    saveForms();

}


// ======================================
// SAVE
// ======================================

function saveForms() {

    localStorage.setItem(
        "croyolaForms",
        JSON.stringify(forms)
    );

}


// ======================================
// LOAD PROJECTS
// ======================================

function loadProjects() {

    formProject.innerHTML = `
        <option value="">
            Select Project
        </option>
    `;


    projects.forEach(project => {

        const option =
            document.createElement("option");

        option.value =
            project.name;

        option.textContent =
            project.name;

        formProject.appendChild(option);

    });

}


// ======================================
// DISPLAY
// ======================================

function displayForms() {

    const search =
        searchForm.value.toLowerCase();

    const selectedStatus =
        formStatusFilter.value;

    const selectedType =
        formTypeFilter.value;


    const filtered =
        forms.filter(item => {

            const matchesSearch =
                item.title
                    .toLowerCase()
                    .includes(search) ||

                item.project
                    .toLowerCase()
                    .includes(search) ||

                item.submittedBy
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                selectedStatus === "all" ||
                item.status === selectedStatus;


            const matchesType =
                selectedType === "all" ||
                item.type === selectedType;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesType
            );

        });


    formList.innerHTML = "";


    if (filtered.length === 0) {

        formList.innerHTML = `

            <div style="
                padding:40px;
                text-align:center;
                color:#888;
            ">

                No forms found.

            </div>

        `;

        updateStats();

        return;
    }


    filtered.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "form-item";


        element.innerHTML = `

            <div class="form-icon">
                ▤
            </div>


            <div>

                <div class="form-name">

                    ${escapeHTML(item.title)}

                </div>


                <div class="form-meta">

                    ${escapeHTML(item.project)}

                    •
                    ${escapeHTML(item.type)}

                    • Submitted by
                    ${escapeHTML(item.submittedBy)}

                    •
                    ${escapeHTML(item.date)}

                </div>


                <div class="form-description">

                    ${escapeHTML(
                        item.description || ""
                    )}

                </div>

            </div>


            <div class="form-right">

                <div class="
                    form-priority
                    ${getPriorityClass(item.priority)}
                ">

                    ${escapeHTML(item.priority)}
                    Priority

                </div>


                ${getStatusBadge(item.status)}


                <div class="form-actions-small">

                    <button
                        class="action-btn"
                        onclick="approveForm(${item.id})"
                    >
                        Approve
                    </button>


                    <button
                        class="action-btn"
                        onclick="completeForm(${item.id})"
                    >
                        Complete
                    </button>


                    <button
                        class="action-btn"
                        onclick="deleteForm(${item.id})"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;


        formList.appendChild(element);

    });


    updateStats();

}


// ======================================
// STATUS BADGE
// ======================================

function getStatusBadge(status) {

    let className =
        "badge-pending";


    if (status === "Approved") {

        className =
            "badge-approved";

    }


    if (status === "Completed") {

        className =
            "badge-completed";

    }


    if (status === "Rejected") {

        className =
            "badge-rejected";

    }


    return `

        <span class="badge ${className}">

            ${escapeHTML(status)}

        </span>

    `;

}


// ======================================
// PRIORITY
// ======================================

function getPriorityClass(priority) {

    if (priority === "High") {

        return "priority-high";

    }


    if (priority === "Medium") {

        return "priority-medium";

    }


    return "priority-low";

}


// ======================================
// STATISTICS
// ======================================

function updateStats() {

    document.getElementById(
        "totalForms"
    ).textContent =
        forms.length;


    document.getElementById(
        "pendingForms"
    ).textContent =
        forms.filter(
            item =>
                item.status === "Pending"
        ).length;


    document.getElementById(
        "approvedForms"
    ).textContent =
        forms.filter(
            item =>
                item.status === "Approved"
        ).length;


    document.getElementById(
        "completedForms"
    ).textContent =
        forms.filter(
            item =>
                item.status === "Completed"
        ).length;

}


// ======================================
// CREATE FORM
// ======================================

productionForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const newForm = {

            id: Date.now(),

            title:
                formTitle.value.trim(),

            project:
                formProject.value,

            type:
                formType.value,

            submittedBy:
                submittedBy.value,

            priority:
                formPriority.value,

            status:
                "Pending",

            description:
                formDescription.value.trim(),

            date:
                new Date()
                    .toISOString()
                    .split("T")[0]

        };


        forms.unshift(
            newForm
        );


        saveForms();

        displayForms();


        productionForm.reset();


        closeFormModal();

    }
);


// ======================================
// APPROVE
// ======================================

function approveForm(id) {

    const form =
        forms.find(
            item =>
                item.id === id
        );


    if (!form) {
        return;
    }


    form.status =
        "Approved";


    saveForms();

    displayForms();

}


// ======================================
// COMPLETE
// ======================================

function completeForm(id) {

    const form =
        forms.find(
            item =>
                item.id === id
        );


    if (!form) {
        return;
    }


    form.status =
        "Completed";


    saveForms();

    displayForms();

}


// ======================================
// DELETE
// ======================================

function deleteForm(id) {

    const confirmed =
        confirm(
            "Delete this production form?"
        );


    if (!confirmed) {
        return;
    }


    forms =
        forms.filter(
            item =>
                item.id !== id
        );


    saveForms();

    displayForms();

}


// ======================================
// MODAL
// ======================================

newFormBtn.addEventListener(
    "click",
    function() {

        loadProjects();

        formModal.classList.add(
            "show"
        );

    }
);


closeModal.addEventListener(
    "click",
    closeFormModal
);


cancelBtn.addEventListener(
    "click",
    closeFormModal
);


function closeFormModal() {

    formModal.classList.remove(
        "show"
    );

}


// ======================================
// FILTERS
// ======================================

searchForm.addEventListener(
    "input",
    displayForms
);


formStatusFilter.addEventListener(
    "change",
    displayForms
);


formTypeFilter.addEventListener(
    "change",
    displayForms
);


// ======================================
// LOGOUT
// ======================================

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "croyolaAdmin"
            );

            window.location.href =
                "login-admin.html";

        }
    );


// ======================================
// SECURITY
// ======================================

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// ======================================
// START
// ======================================

loadProjects();

displayForms();