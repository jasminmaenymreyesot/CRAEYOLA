/* ======================================
   CROYOLA USER ASSETS JS
====================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* USER */

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
                savedUser.name
                    .charAt(0)
                    .toUpperCase();
        }

        if (savedUser.role) {
            userRole.textContent =
                savedUser.role;
        }
    }


    /* FILTER */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const assetCards =
        document.querySelectorAll(".asset-card");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const selectedType =
                button.dataset.type;

            assetCards.forEach(function (card) {

                if (
                    selectedType === "all" ||
                    selectedType === card.dataset.type
                ) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });


    /* MODAL */

    const modal =
        document.getElementById("assetModal");

    const modalName =
        document.getElementById("modalAssetName");

    const largePreview =
        document.getElementById("largePreview");

    const closeModal =
        document.getElementById("closeModal");

    const modalDownload =
        document.getElementById("modalDownload");


    const viewButtons =
        document.querySelectorAll(".view-asset");


    viewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const assetName =
                button.dataset.name;

            modalName.textContent =
                assetName;

            if (
                assetName.endsWith(".png") ||
                assetName.endsWith(".jpg")
            ) {

                largePreview.textContent = "🖼️";

            } else if (
                assetName.endsWith(".mp4")
            ) {

                largePreview.textContent = "🎬";

            } else {

                largePreview.textContent = "📄";

            }

            modal.classList.add("show");

        });

    });


    closeModal.addEventListener("click", function () {

        modal.classList.remove("show");

    });


    modal.addEventListener("click", function (event) {

        if (event.target === modal) {

            modal.classList.remove("show");

        }

    });


    /* DOWNLOAD */

    const downloadButtons =
        document.querySelectorAll(".download-asset");


    downloadButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            alert(
                "Download started for: " +
                button.dataset.name
            );

        });

    });


    modalDownload.addEventListener("click", function () {

        alert(
            "Download started for: " +
            modalName.textContent
        );

    });


    /* UPLOAD */

    document
        .getElementById("uploadBtn")
        .addEventListener("click", function () {

            alert(
                "Upload Asset form will be connected here."
            );

        });


    /* LOGOUT */

    document
        .getElementById("logoutBtn")
        .addEventListener("click", function () {

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

        });

});