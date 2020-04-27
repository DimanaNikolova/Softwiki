import controllers from "./controllers.js"

const app = Sammy("#root", function () {
    this.use("Handlebars", "hbs")

    this.get("#/home", controllers.get.home)

    this.get("#/login", controllers.get.login)
    this.post("#/login", controllers.post.login)
    this.get("#/register", controllers.get.register)
    this.post("#/register", controllers.post.register)

    this.get("#/edit/:id", controllers.get.edit)
    this.post("#/edit/:id", controllers.put.edit)

    this.get("#/logout", controllers.get.logout)

    this.get("#/create", controllers.get.create)
    this.post("#/create", controllers.post.create)

    this.get("#/details/:id", controllers.get.details)
    this.get("#/back", controllers.get.back)
    this.get("#/delete/:id", controllers.del.close)




})
if (localStorage.getItem("userId")) {
    app.run("#/home")
}
else {
    app.run("#/login")
}