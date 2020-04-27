import models from "./models.js"

export default function (ctx) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            ctx.isLoggedIn = true;
            ctx.username = user.email
            ctx.userId = user.uid
            localStorage.setItem("userId", user.uid)
            localStorage.setItem("userEmail", user.email)
            ctx.notLoggedIn = false

        } else {
            // User is signed out.
            // ...
            ctx.isLoggedIn = false;
            ctx.username = null
            ctx.userId = null
            localStorage.removeItem("userId")
            localStorage.removeItem("userEmail")
            ctx.notLoggedIn = true
        }
    });
    return ctx.loadPartials({

        header: "../templates/header.hbs",
        footer: "../templates/footer.hbs",
       
    })
}
