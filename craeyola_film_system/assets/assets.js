// ================================
// CROYOLA ASSET MANAGEMENT
// ================================

const assetTable = document.getElementById("assetTable");

const searchAsset = document.getElementById("searchAsset");
const typeFilter = document.getElementById("typeFilter");
const statusFilter = document.getElementById("statusFilter");

const assetModal = document.getElementById("assetModal");
const newAssetBtn = document.getElementById("newAssetBtn");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");

const assetForm = document.getElementById("assetForm");

const assetName = document.getElementById("assetName");
const assetProject = document.getElementById("assetProject");
const assetType = document.getElementById("assetType");
const assetOwner = document.getElementById("assetOwner");
const assetVersion = document.getElementById("assetVersion");
const assetStatus = document.getElementById("assetStatus");
const assetDescription = document.getElementById("assetDescription");


// ================================
// ADMIN CHECK
// ================================

const admin = localStorage.getItem("croyolaAdmin");

if (!admin) {
    window.location.href = "login-admin.html";
}


// ================================
// PROJECTS
// ================================

let projects = JSON.parse(
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


// ================================
// ASSETS
// ================================

let assets = JSON.parse(
    localStorage.getItem("croyolaAssets")
);


if (!assets) {

    assets = [

        {
            id: 1,
            name: "Character Design",
            project: "Hide and Seek",
            type: "Image",
            owner: "Artist",
            version: "v2.0",
            status: "Approved",
            description: "Main character design."
        },

        {
            id: 2,
            name: "Scene 04 Animation",
            project: "Hide and Seek",
            type: "Video",
            owner: "Animator",
            version: "v1.2",
            status: "In Review",
            description: "Animation for Scene 04."
        },

        {
            id: 3,
            name: "Final Script",
            project: "Hide and Seek",
            type: "Document",
            owner: "Scriptwriter",
            version: "v3.0",
            status: "Approved",
            description: "Approved screenplay."
        },

        {
            id: 4,
            name: "Background Music",
            project: "Beyond the File",
            type: "Audio",
            owner: "Artist",
            version: "v1.0",
            status: "Needs Revision",
            description: "Background music draft."
        },

        {
            id: 5,
            name: "3D Environment",
            project: "CampusBite",
            type: "3D",
            owner: "Artist",
            version: "v1.1",
            status: "Draft",
            description: "Campus environment model."
        }

    ];

    saveAssets();
}


// ================================
// SAVE
// ================================

function saveAssets() {

    localStorage.setItem(
        "croyolaAssets",
        JSON.stringify(assets)
    );

}


// ================================
// PROJECT DROPDOWN
// ================================

function loadProjects() {

    assetProject.innerHTML = `
        <option value="">
            Select Project
        </option>
    `;

    projects.forEach(project => {

        const option = document.createElement("option");

        option.value = project.name;
        option.textContent = project.name;

        assetProject.appendChild(option);

    });

}


// ================================
// DISPLAY ASSETS
// ================================

function displayAssets() {

    const search = searchAsset.value.toLowerCase();
    const type = typeFilter.value;
    const status = statusFilter.value;

    const filtered = assets.filter(asset => {

        const matchesSearch =
            asset.name.toLowerCase().includes(search) ||
            asset.project.toLowerCase().includes(search) ||
            asset.owner.toLowerCase().includes(search);

        const matchesType =
            type === "all" ||
            asset.type === type;

        const matchesStatus =
            status === "all" ||
            asset.status === status;

        return matchesSearch &&
               matchesType &&
               matchesStatus;

    });


    assetTable.innerHTML = "";


    if (filtered.length === 0) {

        assetTable.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;padding:30px;">
                    No assets found.
                </td>
            </tr>
        `;

        updateStats();
        return;
    }


    filtered.forEach(asset => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>

                <div class="asset-name">
                    ${escapeHTML(asset.name)}
                </div>

                <div class="asset-description">
                    ${escapeHTML(asset.description || "")}
                </div>

            </td>

            <td>
                ${escapeHTML(asset.project)}
            </td>

            <td>
                ${escapeHTML(asset.type)}
            </td>

            <td>
                ${escapeHTML(asset.owner)}
            </td>

            <td>
                ${escapeHTML(asset.version)}
            </td>

            <td>
                ${getStatusBadge(asset.status)}
            </td>

            <td>

                <button
                    class="action-btn"
                    onclick="changeAssetStatus(${asset.id})"
                >
                    Status
                </button>

                <button
                    class="action-btn delete-btn"
                    onclick="deleteAsset(${asset.id})"
                >
                    Delete
                </button>

            </td>

        `;

        assetTable.appendChild(row);

    });


    updateStats();

}


// ================================
// STATUS BADGE
// ================================

function getStatusBadge(status) {

    let className = "badge-draft";

    if (status === "In Review") {
        className = "badge-review";
    }

    if (status === "Approved") {
        className = "badge-approved";
    }

    if (status === "Needs Revision") {
        className = "badge-revision";
    }

    return `
        <span class="badge ${className}">
            ${escapeHTML(status)}
        </span>
    `;

}


// ================================
// STATISTICS
// ================================

function updateStats() {

    document.getElementById("totalAssets").textContent =
        assets.length;

    document.getElementById("reviewAssets").textContent =
        assets.filter(a => a.status === "In Review").length;

    document.getElementById("approvedAssets").textContent =
        assets.filter(a => a.status === "Approved").length;

    document.getElementById("revisionAssets").textContent =
        assets.filter(a => a.status === "Needs Revision").length;

}


// ================================
// ADD ASSET
// ================================

assetForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const newAsset = {

        id: Date.now(),

        name: assetName.value.trim(),

        project: assetProject.value,

        type: assetType.value,

        owner: assetOwner.value,

        version: assetVersion.value.trim(),

        status: assetStatus.value,

        description: assetDescription.value.trim()

    };


    assets.push(newAsset);

    saveAssets();

    displayAssets();

    assetForm.reset();

    assetVersion.value = "v1.0";

    closeAssetModal();

});


// ================================
// DELETE
// ================================

function deleteAsset(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this asset?"
    );

    if (!confirmed) {
        return;
    }


    assets = assets.filter(
        asset => asset.id !== id
    );


    saveAssets();

    displayAssets();

}


// ================================
// CHANGE STATUS
// ================================

function changeAssetStatus(id) {

    const asset = assets.find(
        item => item.id === id
    );

    if (!asset) {
        return;
    }


    const statuses = [
        "Draft",
        "In Review",
        "Approved",
        "Needs Revision"
    ];


    const currentIndex =
        statuses.indexOf(asset.status);

    const nextIndex =
        (currentIndex + 1) % statuses.length;


    asset.status =
        statuses[nextIndex];


    saveAssets();

    displayAssets();

}


// ================================
// MODAL
// ================================

newAssetBtn.addEventListener(
    "click",
    openAssetModal
);

closeModal.addEventListener(
    "click",
    closeAssetModal
);

cancelBtn.addEventListener(
    "click",
    closeAssetModal
);


function openAssetModal() {

    loadProjects();

    assetModal.classList.add("show");

}


function closeAssetModal() {

    assetModal.classList.remove("show");

}


// ================================
// SEARCH / FILTER
// ================================

searchAsset.addEventListener(
    "input",
    displayAssets
);

typeFilter.addEventListener(
    "change",
    displayAssets
);

statusFilter.addEventListener(
    "change",
    displayAssets
);


// ================================
// LOGOUT
// ================================

document.getElementById("logoutBtn")
    .addEventListener("click", function() {

        localStorage.removeItem("croyolaAdmin");

        window.location.href =
            "login-admin.html";

    });


// ================================
// SECURITY
// ================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ================================
// START
// ================================

loadProjects();
displayAssets();