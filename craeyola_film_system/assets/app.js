function getUser() {

    return JSON.parse(
        localStorage.getItem("croyolaUser")
    );
}


function getAdmin() {

    return JSON.parse(
        localStorage.getItem("croyolaAdmin")
    );
}


function logout() {

    localStorage.removeItem(
        "croyolaUser"
    );

    localStorage.removeItem(
        "croyolaAdmin"
    );

    window.location.href =
        "index.html";
}


function roleLabel(role) {

    return role
        .replace("_", " ")
        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );
}


function requireUser() {

    if (!getUser()) {

        window.location.href =
            "login-user.html";

        return false;
    }

    return true;
}


function requireAdmin() {

    if (!getAdmin()) {

        window.location.href =
            "login-admin.html";

        return false;
    }

    return true;
}