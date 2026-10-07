// ======================================
// CROYOLA REVIEW MANAGEMENT
// ======================================


// ELEMENTS

const reviewList =
    document.getElementById("reviewList");

const searchReview =
    document.getElementById("searchReview");

const reviewStatusFilter =
    document.getElementById("reviewStatusFilter");

const reviewTypeFilter =
    document.getElementById("reviewTypeFilter");

const reviewModal =
    document.getElementById("reviewModal");

const newReviewBtn =
    document.getElementById("newReviewBtn");

const closeModal =
    document.getElementById("closeModal");

const cancelBtn =
    document.getElementById("cancelBtn");

const reviewForm =
    document.getElementById("reviewForm");

const reviewAsset =
    document.getElementById("reviewAsset");

const reviewProject =
    document.getElementById("reviewProject");

const reviewer =
    document.getElementById("reviewer");

const reviewType =
    document.getElementById("reviewType");

const reviewPriority =
    document.getElementById("reviewPriority");

const reviewFeedback =
    document.getElementById("reviewFeedback");


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
// REVIEWS
// ======================================

let reviews =
    JSON.parse(
        localStorage.getItem("croyolaReviews")
    );


if (!reviews) {

    reviews = [

        {
            id: 1,
            asset: "Character Design v2.0",
            project: "Hide and Seek",
            reviewer: "Client",
            type: "Client",
            priority: "High",
            status: "Pending",
            feedback:
                "Please review the character proportions.",
            date: "2026-10-03"
        },

        {
            id: 2,
            asset: "Scene 04 Animation v1.2",
            project: "Hide and Seek",
            reviewer: "Project Manager",
            type: "Internal",
            priority: "High",
            status: "Approved",
            feedback:
                "Animation timing looks good.",
            date: "2026-10-02"
        },

        {
            id: 3,
            asset: "Background Music v1.0",
            project: "Beyond the File",
            reviewer: "Art Lead",
            type: "Internal",
            priority: "Medium",
            status: "Revision Needed",
            feedback:
                "Music needs a stronger ending.",
            date: "2026-10-04"
        },

        {
            id: 4,
            asset: "Final Script v3.0",
            project: "Hide and Seek",
            reviewer: "Client",
            type: "Client",
            priority: "Medium",
            status: "Approved",
            feedback:
                "Story structure approved.",
            date: "2026-09-30"
        }

    ];

    saveReviews();

}


// ======================================
// SAVE
// ======================================

function saveReviews() {

    localStorage.setItem(
        "croyolaReviews",
        JSON.stringify(reviews)
    );

}


// ======================================
// LOAD PROJECTS
// ======================================

function loadProjects() {

    reviewProject.innerHTML = `
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

        reviewProject.appendChild(option);

    });

}


// ======================================
// DISPLAY
// ======================================

function displayReviews() {

    const search =
        searchReview.value.toLowerCase();

    const selectedStatus =
        reviewStatusFilter.value;

    const selectedType =
        reviewTypeFilter.value;


    const filtered =
        reviews.filter(item => {

            const matchesSearch =
                item.asset
                    .toLowerCase()
                    .includes(search) ||

                item.project
                    .toLowerCase()
                    .includes(search) ||

                item.reviewer
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


    reviewList.innerHTML = "";


    if (filtered.length === 0) {

        reviewList.innerHTML = `

            <div style="
                padding:40px;
                text-align:center;
                color:#888;
            ">

                No reviews found.

            </div>

        `;

        updateStats();

        return;
    }


    filtered.forEach(item => {

        const element =
            document.createElement("div");

        element.className =
            "review-item";


        element.innerHTML = `

            <div class="review-icon">
                ★
            </div>


            <div>

                <div class="review-name">

                    ${escapeHTML(item.asset)}

                </div>


                <div class="review-meta">

                    ${escapeHTML(item.project)}

                    • Reviewer:
                    ${escapeHTML(item.reviewer)}

                    •
                    ${escapeHTML(item.date)}

                </div>


                <div class="review-feedback">

                    ${escapeHTML(
                        item.feedback || ""
                    )}

                </div>

            </div>


            <div class="review-right">

                <div class="
                    priority
                    ${getPriorityClass(item.priority)}
                ">

                    ${escapeHTML(item.priority)}
                    Priority

                </div>


                ${getStatusBadge(item.status)}


                <div class="review-actions">

                    <button
                        class="action-btn"
                        onclick="approveReview(${item.id})"
                    >
                        Approve
                    </button>


                    <button
                        class="action-btn"
                        onclick="revisionReview(${item.id})"
                    >
                        Revision
                    </button>


                    <button
                        class="action-btn"
                        onclick="deleteReview(${item.id})"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;


        reviewList.appendChild(element);

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


    if (status === "Revision Needed") {

        className =
            "badge-revision";

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
// PRIORITY CLASS
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
// STATS
// ======================================

function updateStats() {

    document.getElementById(
        "totalReviews"
    ).textContent =
        reviews.length;


    document.getElementById(
        "pendingReviews"
    ).textContent =
        reviews.filter(
            item =>
                item.status === "Pending"
        ).length;


    document.getElementById(
        "approvedReviews"
    ).textContent =
        reviews.filter(
            item =>
                item.status === "Approved"
        ).length;


    document.getElementById(
        "revisionReviews"
    ).textContent =
        reviews.filter(
            item =>
                item.status === "Revision Needed"
        ).length;

}


// ======================================
// CREATE REVIEW
// ======================================

reviewForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const newReview = {

            id: Date.now(),

            asset:
                reviewAsset.value.trim(),

            project:
                reviewProject.value,

            reviewer:
                reviewer.value,

            type:
                reviewType.value,

            priority:
                reviewPriority.value,

            status:
                "Pending",

            feedback:
                reviewFeedback.value.trim(),

            date:
                new Date()
                    .toISOString()
                    .split("T")[0]

        };


        reviews.unshift(
            newReview
        );


        saveReviews();

        displayReviews();


        reviewForm.reset();


        closeReviewModal();

    }
);


// ======================================
// APPROVE
// ======================================

function approveReview(id) {

    const review =
        reviews.find(
            item =>
                item.id === id
        );


    if (!review) {
        return;
    }


    review.status =
        "Approved";


    saveReviews();

    displayReviews();

}


// ======================================
// REVISION
// ======================================

function revisionReview(id) {

    const review =
        reviews.find(
            item =>
                item.id === id
        );


    if (!review) {
        return;
    }


    review.status =
        "Revision Needed";


    saveReviews();

    displayReviews();

}


// ======================================
// DELETE
// ======================================

function deleteReview(id) {

    const confirmed =
        confirm(
            "Delete this review?"
        );


    if (!confirmed) {
        return;
    }


    reviews =
        reviews.filter(
            item =>
                item.id !== id
        );


    saveReviews();

    displayReviews();

}


// ======================================
// MODAL
// ======================================

newReviewBtn.addEventListener(
    "click",
    function() {

        loadProjects();

        reviewModal.classList.add(
            "show"
        );

    }
);


closeModal.addEventListener(
    "click",
    closeReviewModal
);


cancelBtn.addEventListener(
    "click",
    closeReviewModal
);


function closeReviewModal() {

    reviewModal.classList.remove(
        "show"
    );

}


// ======================================
// FILTERS
// ======================================

searchReview.addEventListener(
    "input",
    displayReviews
);


reviewStatusFilter.addEventListener(
    "change",
    displayReviews
);


reviewTypeFilter.addEventListener(
    "change",
    displayReviews
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

displayReviews();