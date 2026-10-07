// ======================================
// CROYOLA USER DASHBOARD
// ======================================


// ======================================
// ADMIN / USER AUTHENTICATION
// ======================================

const savedUser = localStorage.getItem("croyolaUser");


// If no logged-in user
if (!savedUser) {

    window.location.href = "login-user.html";

}


// ======================================
// CONVERT SAVED USER JSON
// ======================================

let user;

try {

    user = JSON.parse(savedUser);

} catch (error) {

    localStorage.removeItem("croyolaUser");

    window.location.href = "login-user.html";

}


// Make sure user object exists
if (!user || typeof user !== "object") {

    localStorage.removeItem("croyolaUser");

    window.location.href = "login-user.html";

}


// ======================================
// USER INFORMATION
// ======================================

const userName =
    user.name ||
    user.fullName ||
    user.username ||
    user.email ||
    "User";


const userEmail =
    user.email ||
    "";


const userRole =
    (
        user.role ||
        "client"
    ).toLowerCase().trim();


// ======================================
// ELEMENTS
// ======================================

const topTitle =
    document.getElementById("topTitle");


const topDescription =
    document.getElementById("topDescription");


const welcomeTitle =
    document.getElementById("welcomeTitle");


const welcomeDescription =
    document.getElementById("welcomeDescription");


const workspaceRole =
    document.getElementById("workspaceRole");


const workspaceTitle =
    document.getElementById("workspaceTitle");


const workspaceDescription =
    document.getElementById("workspaceDescription");


const userNameElement =
    document.getElementById("userName");


const userRoleElement =
    document.getElementById("userRole");


const userAvatar =
    document.getElementById("userAvatar");


const workspaceGrid =
    document.getElementById("workspaceGrid");


const taskList =
    document.getElementById("taskList");


const activityList =
    document.getElementById("activityList");


const quickActions =
    document.getElementById("quickActions");


const logoutBtn =
    document.getElementById("logoutBtn");


// ======================================
// ROLE CONFIGURATION
// ======================================

const roleData = {

    // ==================================
    // CLIENT
    // ==================================

    client: {

        name: "Client",

        description:
            "Review projects, provide feedback and monitor production progress.",

        workspaceTitle:
            "Client Workspace",

        workspaceDescription:
            "Monitor your project and communicate with the creative team.",

        cards: [

            {
                icon: "◫",
                title: "My Projects",
                description:
                    "View your assigned projects and production progress.",
                link: "user-projects.html"
            },

            {
                icon: "★",
                title: "My Reviews",
                description:
                    "Review submitted creative work and provide feedback.",
                link: "user-reviews.html"
            },

            {
                icon: "◈",
                title: "My Assets",
                description:
                    "View creative assets submitted for your projects.",
                link: "user-assets.html"
            },

            {
                icon: "▤",
                title: "Requests",
                description:
                    "Submit production requests and project forms.",
                link: "user-forms.html"
            }

        ],

        quick: [

            {
                icon: "★",
                title: "Review Work",
                link: "user-reviews.html"
            },

            {
                icon: "◫",
                title: "View Projects",
                link: "user-projects.html"
            },

            {
                icon: "▤",
                title: "Submit Request",
                link: "user-forms.html"
            },

            {
                icon: "◈",
                title: "View Assets",
                link: "user-assets.html"
            }

        ]

    },


    // ==================================
    // ARTIST
    // ==================================

    artist: {

        name: "Artist",

        description:
            "Create, organize and submit visual assets for production.",

        workspaceTitle:
            "Artist Workspace",

        workspaceDescription:
            "Manage your artwork, asset submissions and assigned production tasks.",

        cards: [

            {
                icon: "◈",
                title: "My Assets",
                description:
                    "Upload and manage illustrations, designs and visual assets.",
                link: "user-assets.html"
            },

            {
                icon: "✓",
                title: "My Tasks",
                description:
                    "View artwork and production tasks assigned by the project manager.",
                link: "user-tasks.html"
            },

            {
                icon: "↻",
                title: "Versions",
                description:
                    "Upload and track different versions of your creative work.",
                link: "user-versions.html"
            },

            {
                icon: "★",
                title: "Reviews",
                description:
                    "Check feedback and revision requests from the project manager.",
                link: "user-reviews.html"
            }

        ],

        quick: [

            {
                icon: "◈",
                title: "Submit Asset",
                link: "user-assets.html"
            },

            {
                icon: "✓",
                title: "View Tasks",
                link: "user-tasks.html"
            },

            {
                icon: "↻",
                title: "Upload Version",
                link: "user-versions.html"
            },

            {
                icon: "★",
                title: "View Reviews",
                link: "user-reviews.html"
            }

        ]

    },


    // ==================================
    // SCRIPTWRITER
    // ==================================

    scriptwriter: {

        name: "Scriptwriter",

        description:
            "Manage scripts, writing tasks, revisions and creative feedback.",

        workspaceTitle:
            "Scriptwriter Workspace",

        workspaceDescription:
            "Manage scripts, assigned writing tasks and revision requests.",

        cards: [

            {
                icon: "✓",
                title: "Writing Tasks",
                description:
                    "View scripts and writing assignments from the project manager.",
                link: "user-tasks.html"
            },

            {
                icon: "◈",
                title: "Script Assets",
                description:
                    "Manage submitted scripts and supporting documents.",
                link: "user-assets.html"
            },

            {
                icon: "↻",
                title: "Script Versions",
                description:
                    "Track script revisions and previous versions.",
                link: "user-versions.html"
            },

            {
                icon: "★",
                title: "Reviews",
                description:
                    "Read feedback and respond to revision requests.",
                link: "user-reviews.html"
            }

        ],

        quick: [

            {
                icon: "✓",
                title: "View Writing Tasks",
                link: "user-tasks.html"
            },

            {
                icon: "◈",
                title: "Submit Script",
                link: "user-assets.html"
            },

            {
                icon: "↻",
                title: "Script Versions",
                link: "user-versions.html"
            },

            {
                icon: "★",
                title: "Check Feedback",
                link: "user-reviews.html"
            }

        ]

    },


    // ==================================
    // ANIMATOR
    // ==================================

    animator: {

        name: "Animator",

        description:
            "Manage animation tasks, versions, assets and production feedback.",

        workspaceTitle:
            "Animator Workspace",

        workspaceDescription:
            "Manage animation assignments, scene assets and production revisions.",

        cards: [

            {
                icon: "✓",
                title: "Animation Tasks",
                description:
                    "View animation assignments and production tasks.",
                link: "user-tasks.html"
            },

            {
                icon: "◈",
                title: "Animation Assets",
                description:
                    "Manage animation files and scene assets.",
                link: "user-assets.html"
            },

            {
                icon: "↻",
                title: "Animation Versions",
                description:
                    "Submit and track different animation versions.",
                link: "user-versions.html"
            },

            {
                icon: "★",
                title: "Reviews",
                description:
                    "Check animation feedback and revision requests.",
                link: "user-reviews.html"
            }

        ],

        quick: [

            {
                icon: "✓",
                title: "View Animation Tasks",
                link: "user-tasks.html"
            },

            {
                icon: "◈",
                title: "Submit Animation",
                link: "user-assets.html"
            },

            {
                icon: "↻",
                title: "Upload Version",
                link: "user-versions.html"
            },

            {
                icon: "★",
                title: "Check Reviews",
                link: "user-reviews.html"
            }

        ]

    }

};


// ======================================
// GET CURRENT ROLE
// ======================================

const currentRole =
    roleData[userRole] ||
    roleData.client;


// ======================================
// SET USER INFORMATION
// ======================================

if (userNameElement) {

    userNameElement.textContent =
        userName;

}


if (userRoleElement) {

    userRoleElement.textContent =
        currentRole.name;

}


if (workspaceRole) {

    workspaceRole.textContent =
        currentRole.name.toUpperCase();

}


if (topTitle) {

    topTitle.textContent =
        currentRole.workspaceTitle;

}


if (topDescription) {

    topDescription.textContent =
        currentRole.description;

}


if (welcomeTitle) {

    welcomeTitle.textContent =
        `Welcome back, ${userName}!`;

}


if (welcomeDescription) {

    welcomeDescription.textContent =
        currentRole.description;

}


if (workspaceTitle) {

    workspaceTitle.textContent =
        currentRole.workspaceTitle;

}


if (workspaceDescription) {

    workspaceDescription.textContent =
        currentRole.workspaceDescription;

}


// ======================================
// AVATAR
// ======================================

if (userAvatar) {

    const firstLetter =
        userName
            .charAt(0)
            .toUpperCase();

    userAvatar.textContent =
        firstLetter;

}


// ======================================
// WORKSPACE CARDS
// ======================================

function displayWorkspaceCards() {

    if (!workspaceGrid) {
        return;
    }


    workspaceGrid.innerHTML = "";


    currentRole.cards.forEach(card => {

        const element =
            document.createElement("div");


        element.className =
            "workspace-card";


        element.innerHTML = `

            <div class="workspace-card-icon">

                ${card.icon}

            </div>


            <h3>

                ${escapeHTML(card.title)}

            </h3>


            <p>

                ${escapeHTML(card.description)}

            </p>


            <a
                href="${card.link}"
                class="workspace-card-link"
            >

                Open Workspace →

            </a>

        `;


        workspaceGrid.appendChild(element);

    });

}


// ======================================
// LOAD USER TASKS
// ======================================

function loadTasks() {

    if (!taskList) {
        return;
    }


    const tasks =
        getStorageArray("croyolaTasks");


    // ==================================
    // MATCH CURRENT USER
    // ==================================

    let myTasks =
        tasks.filter(task => {

            return isAssignedToCurrentUser(task);

        });


    // ==================================
    // SHOW SAMPLE TASKS IF EMPTY
    // ==================================

    if (myTasks.length === 0) {

        myTasks = [

            {
                title:
                    getSampleTaskTitle(),

                project:
                    "Hide and Seek",

                status:
                    "In Progress"
            },

            {
                title:
                    getSecondTaskTitle(),

                project:
                    "Beyond the File",

                status:
                    "To Do"
            }

        ];

    }


    taskList.innerHTML = "";


    myTasks
        .slice(0, 4)
        .forEach(task => {

            const element =
                document.createElement("div");


            element.className =
                "task-item";


            element.innerHTML = `

                <div class="task-info">

                    <strong>

                        ${escapeHTML(
                            task.title ||
                            "Untitled Task"
                        )}

                    </strong>

                    <small>

                        ${escapeHTML(
                            task.project ||
                            "CROYOLA Project"
                        )}

                    </small>

                </div>


                <span class="
                    task-status
                    ${getTaskStatusClass(
                        task.status
                    )}
                ">

                    ${escapeHTML(
                        task.status ||
                        "To Do"
                    )}

                </span>

            `;


            taskList.appendChild(element);

        });

}


// ======================================
// CHECK IF TASK BELONGS TO USER
// ======================================

function isAssignedToCurrentUser(task) {

    if (!task) {
        return false;
    }


    const currentEmail =
        userEmail.toLowerCase().trim();


    const currentName =
        userName.toLowerCase().trim();


    const currentRoleName =
        currentRole.name.toLowerCase().trim();


    // ----------------------------------
    // assignedTo
    // ----------------------------------

    if (task.assignedTo) {

        const assignedTo =
            String(task.assignedTo)
                .toLowerCase()
                .trim();


        if (
            assignedTo === currentEmail ||
            assignedTo === currentName
        ) {

            return true;

        }

    }


    // ----------------------------------
    // assignee
    // ----------------------------------

    if (task.assignee) {

        const assignee =
            String(task.assignee)
                .toLowerCase()
                .trim();


        if (
            assignee === currentEmail ||
            assignee === currentName ||
            assignee === currentRoleName
        ) {

            return true;

        }

    }


    // ----------------------------------
    // assignedEmail
    // ----------------------------------

    if (task.assignedEmail) {

        if (
            String(task.assignedEmail)
                .toLowerCase()
                .trim() === currentEmail
        ) {

            return true;

        }

    }


    // ----------------------------------
    // assignedRole
    // ----------------------------------

    if (task.assignedRole) {

        if (
            String(task.assignedRole)
                .toLowerCase()
                .trim() === currentRoleName
        ) {

            return true;

        }

    }


    return false;

}


// ======================================
// SAMPLE TASKS
// ======================================

function getSampleTaskTitle() {

    if (userRole === "artist") {

        return "Complete character design";

    }


    if (userRole === "scriptwriter") {

        return "Finalize storyboard script";

    }


    if (userRole === "animator") {

        return "Animate Scene 04";

    }


    return "Review project requirements";

}


function getSecondTaskTitle() {

    if (userRole === "artist") {

        return "Upload background assets";

    }


    if (userRole === "scriptwriter") {

        return "Revise dialogue";

    }


    if (userRole === "animator") {

        return "Render Scene 05";

    }


    return "Review submitted assets";

}


// ======================================
// TASK STATUS
// ======================================

function getTaskStatusClass(status) {

    const normalizedStatus =
        String(status || "")
            .toLowerCase()
            .trim();


    if (
        normalizedStatus === "done" ||
        normalizedStatus === "completed" ||
        normalizedStatus === "approved"
    ) {

        return "status-done";

    }


    if (
        normalizedStatus === "in progress" ||
        normalizedStatus === "ongoing" ||
        normalizedStatus === "working"
    ) {

        return "status-progress";

    }


    return "status-todo";

}


// ======================================
// LOAD COUNTS
// ======================================

function loadCounts() {

    const tasks =
        getStorageArray("croyolaTasks");


    const assets =
        getStorageArray("croyolaAssets");


    const reviews =
        getStorageArray("croyolaReviews");


    const forms =
        getStorageArray("croyolaForms");


    const versions =
        getStorageArray("croyolaVersions");


    // ==================================
    // CURRENT USER
    // ==================================

    const currentEmail =
        userEmail.toLowerCase().trim();


    const currentName =
        userName.toLowerCase().trim();


    const currentRoleName =
        currentRole.name.toLowerCase().trim();


    // ==================================
    // USER TASKS
    // ==================================

    const myTasks =
        tasks.filter(task => {

            return isAssignedToCurrentUser(task);

        });


    // ==================================
    // USER ASSETS
    // ==================================

    const myAssets =
        assets.filter(asset => {

            if (
                asset.ownerEmail &&
                String(asset.ownerEmail)
                    .toLowerCase()
                    .trim() === currentEmail
            ) {

                return true;

            }


            if (
                asset.owner &&
                (
                    String(asset.owner)
                        .toLowerCase()
                        .trim() === currentName ||

                    String(asset.owner)
                        .toLowerCase()
                        .trim() === currentRoleName
                )
            ) {

                return true;

            }


            if (
                asset.uploadedBy &&
                String(asset.uploadedBy)
                    .toLowerCase()
                    .trim() === currentEmail
            ) {

                return true;

            }


            return false;

        });


    // ==================================
    // USER REVIEWS
    // ==================================

    const myReviews =
        reviews.filter(review => {

            if (
                review.userEmail &&
                String(review.userEmail)
                    .toLowerCase()
                    .trim() === currentEmail
            ) {

                return true;

            }


            if (
                review.reviewerEmail &&
                String(review.reviewerEmail)
                    .toLowerCase()
                    .trim() === currentEmail
            ) {

                return true;

            }


            if (
                review.assignedTo &&
                String(review.assignedTo)
                    .toLowerCase()
                    .trim() === currentEmail
            ) {

                return true;

            }


            if (
                review.reviewer &&
                String(review.reviewer)
                    .toLowerCase()
                    .trim() === currentName
            ) {

                return true;

            }


            if (
                review.role &&
                String(review.role)
                    .toLowerCase()
                    .trim() === currentRoleName
            ) {

                return true;

            }


            return false;

        });


    // ==================================
    // USER VERSIONS
    // ==================================

    const myVersions =
        versions.filter(version => {

            if (
                version.userEmail &&
                String(version.userEmail)
                    .toLowerCase()
                    .trim() === currentEmail
            ) {

                return true;

            }


            if (
                version.uploadedBy &&
                String(version.uploadedBy)
                    .toLowerCase()
                    .trim() === currentEmail
            ) {

                return true;

            }


            if (
                version.ownerEmail &&
                String(version.ownerEmail)
                    .toLowerCase()
                    .trim() === currentEmail
            ) {

                return true;

            }


            return false;

        });


    // ==================================
    // PENDING COUNT
    // ==================================

    const pendingTasks =
        myTasks.filter(task => {

            return String(task.status || "")
                .toLowerCase() !== "done";

        }).length;


    const pendingReviews =
        myReviews.filter(review => {

            return String(review.status || "")
                .toLowerCase() === "pending";

        }).length;


    const pendingForms =
        forms.filter(form => {

            if (!form.submittedBy) {
                return false;
            }


            const submittedBy =
                String(form.submittedBy)
                    .toLowerCase()
                    .trim();


            return (
                (
                    submittedBy === currentEmail ||
                    submittedBy === currentName ||
                    submittedBy === currentRoleName
                ) &&
                String(form.status || "")
                    .toLowerCase() === "pending"
            );

        }).length;


    const pendingVersions =
        myVersions.filter(version => {

            const status =
                String(version.status || "")
                    .toLowerCase();


            return (
                status === "pending" ||
                status === "revision" ||
                status === "revision requested"
            );

        }).length;


    const pending =
        pendingTasks +
        pendingReviews +
        pendingForms +
        pendingVersions;


    // ==================================
    // UPDATE DASHBOARD COUNTS
    // ==================================

    setElementText(
        "taskCount",
        myTasks.length
    );


    setElementText(
        "assetCount",
        myAssets.length
    );


    setElementText(
        "reviewCount",
        myReviews.length
    );


    setElementText(
        "pendingCount",
        pending
    );

}


// ======================================
// ACTIVITY
// ======================================

function displayActivity() {

    if (!activityList) {
        return;
    }


    const activities = [

        {
            text:
                "Workspace loaded successfully.",
            time:
                "Just now"
        },

        {
            text:
                `${currentRole.name} workspace is ready.`,
            time:
                "Today"
        },

        {
            text:
                "Production pipeline synchronized.",
            time:
                "Today"
        }

    ];


    activityList.innerHTML = "";


    activities.forEach(activity => {

        const element =
            document.createElement("div");


        element.className =
            "activity-item";


        element.innerHTML = `

            <div class="activity-dot"></div>


            <div class="activity-text">

                ${escapeHTML(
                    activity.text
                )}

                <span class="activity-time">

                    ${escapeHTML(
                        activity.time
                    )}

                </span>

            </div>

        `;


        activityList.appendChild(element);

    });

}


// ======================================
// QUICK ACTIONS
// ======================================

function displayQuickActions() {

    if (!quickActions) {
        return;
    }


    quickActions.innerHTML = "";


    currentRole.quick.forEach(action => {

        const element =
            document.createElement("a");


        element.className =
            "quick-action";


        element.href =
            action.link;


        element.innerHTML = `

            <span class="quick-action-icon">

                ${action.icon}

            </span>


            <span>

                ${escapeHTML(
                    action.title
                )}

            </span>

        `;


        quickActions.appendChild(element);

    });

}


// ======================================
// LOGOUT
// ======================================

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "croyolaUser"
            );


            window.location.href =
                "login-user.html";

        }
    );

}


// ======================================
// STORAGE HELPER
// ======================================

function getStorageArray(key) {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(key)
            );


        if (Array.isArray(data)) {

            return data;

        }


        return [];

    } catch (error) {

        console.error(
            `Error loading ${key}:`,
            error
        );


        return [];

    }

}


// ======================================
// ELEMENT TEXT HELPER
// ======================================

function setElementText(
    elementId,
    value
) {

    const element =
        document.getElementById(elementId);


    if (element) {

        element.textContent =
            value;

    }

}


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
// START DASHBOARD
// ======================================

displayWorkspaceCards();

loadTasks();

loadCounts();

displayActivity();

displayQuickActions();