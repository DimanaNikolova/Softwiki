import models from "./models.js"
import extend from "./utils.js"

export default {

    get: {
        home(ctx) {

            models.getAll().then((res) => {
                let articles = res.docs.map((d) => { return { ...d.data(), id: d.id } })
                let js = []
                let java = []
                let python = []
                let csharp = []

                ctx.articles = articles
                articles.forEach((current) => {

                    if (current.category && (current.category.toLowerCase() === "javascript" ||current.category.toLowerCase() === "js" )) {
                        js.push(current)

                    } else if (current.category && (current.category.toLowerCase() === "java")) {
                        java.push(current)
                    }
                    else if (current.category && (current.category.toLowerCase() === "python" || current.category.toLowerCase() === "pyton" )) {
                        python.push(current)
                    } else if (current.category && (current.category.toLowerCase() === "csharp" || current.category.toLowerCase() === "c#")) {
                        csharp.push(current)
                    }
                    ctx.js = js
                    ctx.java = java
                    ctx.python = python
                    ctx.csharp = csharp
                })
         
                extend(ctx).then(function () {

                    this.partial("../templates/home.hbs")
                })
            })


        }, back(ctx) {
            ctx.redirect("#/home")
        },

        login(ctx) {
            extend(ctx).then(function () {
                this.partial("../templates/login.hbs")
            })
        },
        register(ctx) {

            extend(ctx).then(function () {
                this.partial("../templates/register.hbs")
            })
        },
        logout(ctx) {

            models.logout().then((res) => {
                ctx.redirect("#/login")
            })
        },


        create(ctx) {
            extend(ctx).then(function () {
                this.partial("../templates/create.hbs")
            })
        },
        details(ctx) {

            const { id } = ctx.params
            models.get(id).then((res) => {
                this.id = id
                let article = docModifier(res)

                this.title = article.title
                this.content = article.content
                this.category = article.category
                this.creator = article.creator
                this.isAuthor = this.creator === localStorage.getItem("userEmail")

            }).then(() => {

                extend(ctx).then(function () {
                    this.partial("../templates/details.hbs")
                })
            })


        },
        edit(ctx) {
            let { id, title, category, content } = ctx.params
            models.get(id).then((res)=>{
                let article=docModifier(res)
                ctx.title=article.title
                ctx.category=article.category
                ctx.content=article.content
                ctx.id=id
                
            }).then((res)=>  extend(ctx).then(function () {
                this.partial("../templates/edit.hbs")
            }))

        }
    },

    post: {
        login(ctx) {

            const { email, password } = ctx.params;

            models.login(email, password)
                .then(function (response) {
                    ctx.user = response;
                    ctx.email = response.email
                    ctx.isLoggedIn = true
                    ctx.redirect("#/home")

                }).catch((e)=>{
                    alert("Wrong input fields!")
                })

        },
        register(ctx) {
            const { email, password, reppass } = ctx.params;

            if (password === reppass) {
                models.register(email, password)
                    .then(function (response) {
                        ctx.redirect("#/home")
                    }).catch((e)=>{
                        alert("Wrong input fields!")
                    })
            }
        },
        create(ctx) {
            const data = {
                ...ctx.params,
                creator: localStorage.getItem("userEmail"),
            }
            let { category } = ctx.params
            if (category.toLowerCase()=== "java" ||category.toLowerCase()==="js" ||category.toLowerCase()===  "javascript"||category.toLowerCase()===  "pyton" ||category.toLowerCase()===  "python" ||category.toLowerCase()===  "csharp" ||category.toLowerCase()===  "c#"){
                models.create(data).then((res) => {
                    ctx.redirect("#/home")
                })
            } else{
                alert("Valid categories: JavaScript, C#, Java, Python")
            }


        }
    },

    del: {
        close(ctx) {
            let { id } = ctx.params
            models.close(id).then((res) => {
                ctx.redirect("#/home")
            })
        }
    },

    put: {
        
        edit(ctx) {
            let { id, title, category, content } = ctx.params
            this.id = id
            models.get(id).then((res) => {
                const article = docModifier(res)
                article.title = title
                article.category = category
                article.content = content


                return models.edit(id, article)
            })
                .then((res) => {
                    ctx.redirect(`#/home`)
                })



        }
    }

}

function docModifier(d) {
    return { ...d.data(), id: d.id }
}


