/* =========================================================
   CROYOLA | VERSIONS
   ADMIN / PROJECT MANAGER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const newVersionBtn =
        document.getElementById("newVersionBtn");

    const versionModal =
        document.getElementById("versionModal");

    const closeModal =
        document.getElementById("closeModal");

    const cancelModal =
        document.getElementById("cancelModal");

    const versionForm =
        document.getElementById("versionForm");

    const versionSearch =
        document.getElementById("versionSearch");

    const versionsTable =
        document.getElementById("versionsTable");

    const detailsEmpty =
        document.getElementById("detailsEmpty");

    const versionDetails =
        document.getElementById("versionDetails");


    const detailVersion =
        document.getElementById("detailVersion");

    const detailProject =
        document.getElementById("detailProject");

    const detailMember =
        document.getElementById("detailMember");

    const detailDate =
        document.getElementById("detailDate");

    const detailDescription =
        document.getElementById("detailDescription");


    const approveBtn =
        document.getElementById("approveBtn");

    const revisionBtn =
        document.getElementById("revisionBtn");


    /* =====================================================
       OPEN MODAL
    ====================================================== */

    newVersionBtn.addEventListener("click", function () {

        versionModal.classList.add("show");

    });


    /* =====================================================
       CLOSE MODAL
    ====================================================== */

    function closeVersionModal() {

        versionModal.classList.remove("show");

    }


    closeModal.addEventListener(
        "click",
        closeVersionModal
    );


    cancelModal.addEventListener(
        "click",
        closeVersionModal
    );


    /* =====================================================
       CLOSE WHEN CLICKING OUTSIDE
    ====================================================== */

    versionModal.addEventListener(
        "click",
        function (event) {

            if (event.target === versionModal) {

                closeVersionModal();

            }

        }
    );


    /* =====================================================
       CREATE NEW VERSION
    ====================================================== */

    versionForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const projectName =
                document.getElementById("projectName").value.trim();

            const versionNumber =
                document.getElementById("versionNumber").value.trim();

            const submittedBy =
                document.getElementById("submittedBy").value.trim();

            const description =
                document
                    .getElementById("versionDescription")
                    .value
                    .trim();


            if (
                projectName === "" ||
                versionNumber === "" ||
                submittedBy === ""
            ) {

                alert(
                    "Please complete the required fields."
                );

                return;

            }


            const today =
                new Date().toLocaleDateString(
                    "en-US",
                    {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    }
                );


            const row =
                document.createElement("tr");


            row.setAttribute(
                "data-version",
                versionNumber
            );

            row.setAttribute(
                "data-project",
                projectName
            );

            row.setAttribute(
                "data-member",
                submittedBy
            );

            row.setAttribute(
                "data-date",
                today
            );

            row.setAttribute(
                "data-status",
                "Pending Review"
            );

            row.setAttribute(
                "data-description",
                description || "New version submission."
            );


            const versionShort =
                versionNumber
                    .replace("v", "")
                    .split(".")[0];


            row.innerHTML = `

                <td>

                    <div class="version-cell">

                        <div class="version-badge">
                            V${versionShort}
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(versionNumber)}
                            </strong>

                            <small>
                                New Submission
                            </small>

                        </div>

                    </div>

                </td>


                <td>
                    ${escapeHTML(projectName)}
                </td>


                <td>
                    ${escapeHTML(submittedBy)}
                </td>


                <td>
                    ${today}
                </td>


                <td>

                    <span class="status pending">
                        Pending Review
                    </span>

                </td>


                <td>

                    <button
                        type="button"
                        class="table-btn view-btn"
                    >
                        View
                    </button>

                </td>

            `;


            versionsTable.prepend(row);


            versionForm.reset();

            closeVersionModal();

            updateStatistics();

        }
    );


    /* =====================================================
       VIEW VERSION
    ====================================================== */

    versionsTable.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(".view-btn");


            if (!button) {
                return;
            }


            const row =
                button.closest("tr");


            if (!row) {
                return;
            }


            showVersionDetails(row);

        }
    );


    function showVersionDetails(row) {

        const version =
            row.dataset.version;

        const project =
            row.dataset.project;

        const member =
            row.dataset.member;

        const date =
            row.dataset.date;

        const description =
            row.dataset.description;


        detailVersion.textContent =
            version;

        detailProject.textContent =
            project;

        detailMember.textContent =
            member;

        detailDate.textContent =
            date;

        detailDescription.textContent =
            description;


        detailsEmpty.hidden = true;

        versionDetails.hidden = false;


        versionDetails.dataset.row =
            version;

    }


    /* =====================================================
       APPROVE
    ====================================================== */

    approveBtn.addEventListener(
        "click",
        function () {

            const selectedVersion =
                versionDetails.dataset.row;


            if (!selectedVersion) {

                alert(
                    "Please select a version first."
                );

                return;

            }


            const rows =
                versionsTable.querySelectorAll("tr");


            rows.forEach(function (row) {

                if (
                    row.dataset.version ===
                    selectedVersion
                ) {

                    row.dataset.status =
                        "Approved";


                    const status =
                        row.querySelector(".status");


                    status.textContent =
                        "Approved";


                    status.className =
                        "status approved";

                }

            });


            updateStatistics();

            alert(
                selectedVersion +
                " has been approved."
            );

        }
    );


    /* =====================================================
       REQUEST REVISION
    ====================================================== */

    revisionBtn.addEventListener(
        "click",
        function () {

            const selectedVersion =
                versionDetails.dataset.row;


            if (!selectedVersion) {

                alert(
                    "Please select a version first."
                );

                return;

            }


            const rows =
                versionsTable.querySelectorAll("tr");


            rows.forEach(function (row) {

                if (
                    row.dataset.version ===
                    selectedVersion
                ) {

                    row.dataset.status =
                        "Revision Required";


                    const status =
                        row.querySelector(".status");


                    status.textContent =
                        "Revision Required";


                    status.className =
                        "status revision";

                }

            });


            updateStatistics();

            alert(
                selectedVersion +
                " has been marked for revision."
            );

        }
    );


    /* =====================================================
       SEARCH
    ====================================================== */

    versionSearch.addEventListener(
        "input",
        function () {

            const search =
                versionSearch.value
                    .toLowerCase()
                    .trim();


            const rows =
                versionsTable.querySelectorAll("tr");


            rows.forEach(function (row) {

                const text =
                    row.textContent.toLowerCase();


                if (
                    text.includes(search)
                ) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        }
    );


    /* =====================================================
       UPDATE STATISTICS
    ====================================================== */

    function updateStatistics() {

        const rows =
            versionsTable.querySelectorAll("tr");


        let total = 0;

        let pending = 0;

        let approved = 0;

        let revision = 0;


        rows.forEach(function (row) {

            if (
                row.style.display === "none"
            ) {
                return;
            }


            total++;


            const status =
                row.dataset.status;


            if (
                status ===
                "Pending Review"
            ) {

                pending++;

            }


            if (
                status ===
                "Approved"
            ) {

                approved++;

            }


            if (
                status ===
                "Revision Required"
            ) {

                revision++;

            }

        });


        document.getElementById(
            "totalVersions"
        ).textContent = total;


        document.getElementById(
            "pendingVersions"
        ).textContent = pending;


        document.getElementById(
            "approvedVersions"
        ).textContent = approved;


        document.getElementById(
            "revisionVersions"
        ).textContent = revision;

    }


    /* =====================================================
       ESCAPE HTML
    ====================================================== */

    function escapeHTML(value) {

        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       ESC KEY CLOSE MODAL
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                versionModal.classList.contains("show")
            ) {

                closeVersionModal();

            }

        }
    );


});