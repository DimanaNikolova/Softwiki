
export default{
    register(username, password){
        return firebase.auth().createUserWithEmailAndPassword(username, password)
    },
    login(username, password){
        return firebase.auth().signInWithEmailAndPassword(username, password)
    },
    logout(){
        return firebase.auth().signOut()
    },
    create(data){
        return firebase.firestore().collection(`articles`).add({...data})
    },
    getAll(){
        return firebase.firestore().collection("articles").orderBy("title", "desc").get()
    },
    get(id){
        return firebase.firestore().collection("articles").doc(id).get()
    },
    close(id){
        return firebase.firestore().collection("articles").doc(id).delete()
    },
    edit(id,data){
        return firebase.firestore().collection("articles").doc(id).update(data)
    },
}