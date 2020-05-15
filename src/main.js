import { changeView } from './view-controller/router.js';
const init = () => {
    changeView(window.location.hash);
    window.addEventListener('hashchange', () => {
        changeView(window.location.hash)
    });
    const notesList = document.getElementById('notes-list');
    console.log(notesList);
};

window.addEventListener('load', init);
auth.onAuthStateChanged((user) => {
    if (user) {
        window.location.hash = '#/appNote';
        changeView(window.location.hash);
        //FIRESTORE GET DATA 
        // db.collection(user.uid).onSnapshot((snapshot) => {
        //     // passing an array of documents
        //     setUpNotes(snapshot.docs);
        // }, (err) => {
        //     console.log(err.message);
        // });
    } else {
        window.location.hash = '#/';
        changeView(window.location.hash);
    }
});