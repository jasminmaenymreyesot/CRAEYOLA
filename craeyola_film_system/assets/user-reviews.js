/* ======================================
   CROYOLA USER REVIEWS JS
====================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ======================================
           USER INFORMATION
        ====================================== */

        const savedUser = JSON.parse(
            localStorage.getItem(
                "croyola_current_user"
            )
        );


        const userName =
            document.getElementById(
                "userName"
            );


        const userRole =
            document.getElementById(
                "userRole"
            );


        const userAvatar =
            document.getElementById(
                "userAvatar"
            );


        if (savedUser) {

            const name =
                savedUser.name ||
                savedUser.fullName ||
                savedUser.username ||
                "User";


            const role =
                savedUser.role ||
                "Creative User";


            userName.textContent =
                name;


            userRole.textContent =
                role;


            userAvatar.textContent =
                name
                    .charAt(0)
                    .toUpperCase();

        }


        /* ======================================
           REVIEW DATA
        ====================================== */

        let reviews = JSON.parse(
            localStorage.getItem(
                "croyola_reviews"
            )
        ) || [

            {
                id: 1,

                project:
                    "CROYOLA Website",

                reviewer:
                    "Project Manager",

                date:
                    "October 6, 2026",

                status:
                    "Pending",

                feedback:
                    "Please improve the spacing of the project cards and check the mobile layout.",

                read:
                    false,

                reply:
                    ""

            },


            {
                id: 2,

                project:
                    "Brand Identity",

                reviewer:
                    "Project Manager",

                date:
                    "October 4, 2026",

                status:
                    "Approved",

                feedback:
                    "The updated branding assets look good. The design is consistent with the project direction.",

                read:
                    true,

                reply:
                    ""

            },


            {
                id: 3,

                project:
                    "Multimedia Campaign",

                reviewer:
                    "Project Manager",

                date:
                    "October 2, 2026",

                status:
                    "Needs Revision",

                feedback:
                    "Please revise the typography and provide another version for review.",

                read:
                    false,

                reply:
                    ""

            }

        ];


        /* ======================================
           SAVE REVIEWS
        ====================================== */

        function saveReviews() {

            localStorage.setItem(
                "croyola_reviews",
                JSON.stringify(
                    reviews
                )
            );

        }


        /* ======================================
           ELEMENTS
        ====================================== */

        const reviewList =
            document.getElementById(
                "reviewList"
            );


        const totalReviews =
            document.getElementById(
                "totalReviews"
            );


        const pendingReviews =
            document.getElementById(
                "pendingReviews"
            );


        const approvedReviews =
            document.getElementById(
                "approvedReviews"
            );


        const revisionReviews =
            document.getElementById(
                "revisionReviews"
            );


        const projectFilter =
            document.getElementById(
                "projectFilter"
            );


        const statusFilter =
            document.getElementById(
                "statusFilter"
            );


        const searchReview =
            document.getElementById(
                "searchReview"
            );


        /* ======================================
           MODAL ELEMENTS
        ====================================== */

        const reviewModal =
            document.getElementById(
                "reviewModal"
            );


        const modalTitle =
            document.getElementById(
                "modalTitle"
            );


        const modalSubtitle =
            document.getElementById(
                "modalSubtitle"
            );


        const modalProject =
            document.getElementById(
                "modalProject"
            );


        const modalReviewer =
            document.getElementById(
                "modalReviewer"
            );


        const modalDate =
            document.getElementById(
                "modalDate"
            );


        const modalStatus =
            document.getElementById(
                "modalStatus"
            );


        const modalFeedback =
            document.getElementById(
                "modalFeedback"
            );


        const replyText =
            document.getElementById(
                "replyText"
            );


        let selectedReviewId =
            null;


        /* ======================================
           PROJECT FILTER OPTIONS
        ====================================== */

        function loadProjects() {

            const projects = [
                ...new Set(
                    reviews.map(
                        review =>
                            review.project
                    )
                )
            ];


            projects.forEach(
                function (project) {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        project;


                    option.textContent =
                        project;


                    projectFilter.appendChild(
                        option
                    );

                }
            );

        }


        /* ======================================
           STATUS CLASS
        ====================================== */

        function getStatusClass(
            status
        ) {

            if (
                status ===
                "Approved"
            ) {

                return "status-approved";

            }


            if (
                status ===
                "Needs Revision"
            ) {

                return "status-revision";

            }


            return "status-pending";

        }


        /* ======================================
           RENDER REVIEWS
        ====================================== */

        function renderReviews() {

            const selectedProject =
                projectFilter.value;


            const selectedStatus =
                statusFilter.value;


            const search =
                searchReview.value
                    .toLowerCase()
                    .trim();


            const filteredReviews =
                reviews.filter(
                    function (review) {


                        const projectMatch =
                            selectedProject ===
                                "all" ||
                            review.project ===
                                selectedProject;


                        const statusMatch =
                            selectedStatus ===
                                "all" ||
                            review.status ===
                                selectedStatus;


                        const searchMatch =
                            review.project
                                .toLowerCase()
                                .includes(search) ||

                            review.reviewer
                                .toLowerCase()
                                .includes(search) ||

                            review.feedback
                                .toLowerCase()
                                .includes(search);


                        return (
                            projectMatch &&
                            statusMatch &&
                            searchMatch
                        );

                    }
                );


            /* ======================================
               STATISTICS
            ====================================== */

            totalReviews.textContent =
                reviews.length;


            pendingReviews.textContent =
                reviews.filter(
                    review =>
                        review.status ===
                        "Pending"
                ).length;


            approvedReviews.textContent =
                reviews.filter(
                    review =>
                        review.status ===
                        "Approved"
                ).length;


            revisionReviews.textContent =
                reviews.filter(
                    review =>
                        review.status ===
                        "Needs Revision"
                ).length;


            /* ======================================
               EMPTY
            ====================================== */

            if (
                filteredReviews.length ===
                0
            ) {

                reviewList.innerHTML = `

                    <div class="empty">

                        No reviews found.

                    </div>

                `;

                return;

            }


            /* ======================================
               REVIEW ITEMS
            ====================================== */

            reviewList.innerHTML =
                filteredReviews
                    .map(
                        function (review) {


                            const statusClass =
                                getStatusClass(
                                    review.status
                                );


                            const unread =
                                review.read
                                    ? ""
                                    : "unread";


                            const unreadIndicator =
                                review.read
                                    ? ""
                                    : `<span class="unread-indicator"></span>`;


                            return `

                                <div
                                    class="review-item ${unread}"
                                >


                                    <div class="review-icon">
                                        💬
                                    </div>


                                    <div class="review-info">

                                        <strong>

                                            ${review.project}

                                            ${unreadIndicator}

                                        </strong>


                                        <p>

                                            ${review.feedback}

                                        </p>


                                        <div
                                            class="review-meta"
                                        >

                                            <span
                                                class="review-tag"
                                            >

                                                ${review.reviewer}

                                            </span>


                                            <span
                                                class="review-tag"
                                            >

                                                ${review.date}

                                            </span>

                                        </div>

                                    </div>


                                    <div
                                        class="review-actions"
                                    >

                                        <span
                                            class="status ${statusClass}"
                                        >

                                            ${review.status}

                                        </span>


                                        <button
                                            onclick="viewReview(${review.id})"
                                        >

                                            View

                                        </button>


                                        ${
                                            !review.read
                                                ? `
                                                    <button
                                                        onclick="markAsRead(${review.id})"
                                                    >
                                                        Mark Read
                                                    </button>
                                                `
                                                : ""
                                        }

                                    </div>

                                </div>

                            `;

                        }
                    )
                    .join("");

        }


        /* ======================================
           VIEW REVIEW
        ====================================== */

        window.viewReview =
            function (id) {


                const review =
                    reviews.find(
                        item =>
                            item.id === id
                    );


                if (!review) return;


                selectedReviewId =
                    id;


                modalTitle.textContent =
                    review.project;


                modalSubtitle.textContent =
                    "Review from " +
                    review.reviewer;


                modalProject.textContent =
                    review.project;


                modalReviewer.textContent =
                    review.reviewer;


                modalDate.textContent =
                    review.date;


                modalStatus.textContent =
                    review.status;


                modalFeedback.textContent =
                    review.feedback;


                replyText.value =
                    review.reply || "";


                reviewModal.classList.add(
                    "show"
                );


                /* Automatically mark as read */

                if (!review.read) {

                    review.read = true;

                    saveReviews();

                    renderReviews();

                }

            };


        /* ======================================
           MARK AS READ
        ====================================== */

        window.markAsRead =
            function (id) {


                const review =
                    reviews.find(
                        item =>
                            item.id === id
                    );


                if (!review) return;


                review.read = true;


                saveReviews();

                renderReviews();

            };


        /* ======================================
           CLOSE MODAL
        ====================================== */

        function closeModal() {

            reviewModal.classList.remove(
                "show"
            );


            selectedReviewId =
                null;


            replyText.value = "";

        }


        document
            .getElementById(
                "closeModalBtn"
            )
            .addEventListener(
                "click",
                closeModal
            );


        document
            .getElementById(
                "cancelBtn"
            )
            .addEventListener(
                "click",
                closeModal
            );


        reviewModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    reviewModal
                ) {

                    closeModal();

                }

            }
        );


        /* ======================================
           SEND REPLY
        ====================================== */

        document
            .getElementById(
                "replyBtn"
            )
            .addEventListener(
                "click",
                function () {


                    if (
                        selectedReviewId ===
                        null
                    ) {

                        return;

                    }


                    const reply =
                        replyText.value.trim();


                    if (!reply) {

                        alert(
                            "Please write a reply first."
                        );

                        return;

                    }


                    const review =
                        reviews.find(
                            item =>
                                item.id ===
                                selectedReviewId
                        );


                    if (!review) return;


                    review.reply =
                        reply;


                    saveReviews();


                    alert(
                        "Reply saved successfully!"
                    );


                    closeModal();

                }
            );


        /* ======================================
           FILTER EVENTS
        ====================================== */

        projectFilter.addEventListener(
            "change",
            renderReviews
        );


        statusFilter.addEventListener(
            "change",
            renderReviews
        );


        searchReview.addEventListener(
            "input",
            renderReviews
        );


        /* ======================================
           REFRESH
        ====================================== */

        document
            .getElementById(
                "refreshBtn"
            )
            .addEventListener(
                "click",
                function () {

                    renderReviews();


                    alert(
                        "Reviews refreshed."
                    );

                }
            );


        /* ======================================
           LOGOUT
        ====================================== */

        document
            .getElementById(
                "logoutBtn"
            )
            .addEventListener(
                "click",
                function () {


                    const confirmed =
                        confirm(
                            "Are you sure you want to logout?"
                        );


                    if (!confirmed) {
                        return;
                    }


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

        loadProjects();

        renderReviews();

    }
);