import { changeView } from './view-controller/router.js';
const init = () => {
    changeView(window.location.hash);
    window.addEventListener('hashchange', () => {
        changeView(window.location.hash)
    });
};

window.addEventListener('load', init);
auth.onAuthStateChanged((user) => {
    if (user) {
        // console.log(user.displayName);
        // console.log(user.metadata.creationTime);
        // console.log(user.metadata.lastSignInTime);
        // console.log(db.collection(user.uid));
        window.location.hash = '#/appNote';
        changeView(window.location.hash);
        const mainNav = document.querySelector('.main-nav');
        const currentColor = localStorage.getItem('bgcolor');
        mainNav.style.backgroundColor = currentColor;
        if (user.metadata.creationTime == user.metadata.lastSignInTime) {
            return db.collection(user.uid).doc('nota 1').set({
                tittle: 'Bienvenida',
                content: 'empieza a crear tu primera nota!'
            });
        }
    } else {
        window.location.hash = '#/';
        changeView(window.location.hash);
    }
});
// auth.onAuthStateChanged((user) => {
//     if (user) {
//         console.log(user);
//         window.location.hash = '#/appNote';
//         changeView(window.location.hash);
//         const notesList = document.getElementById('notes-list');
//         const userEmail = document.getElementById('user-email');
//         console.log(user.email);
//         userEmail.innerHTML = user.email;
//         // FIRESTORE GET DATA 
//         db.collection(user.uid).onSnapshot((snapshot) => {
//             notesList.innerHTML = '';
//             // passing an array of documents
//             renderNote([snapshot.docs, user.uid]).forEach((li) => {
//                 notesList.appendChild(li);
//             })
//         });
//         // CREATE NOTES
//         const createForm = document.getElementById('notes-form');
//         createForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             db.collection(user.uid).add({
//                 // it can be also called with dot notation createForm.tittle
//                 tittle: createForm['tittle'].value,
//                 content: createForm['content'].value
//             }).then(() => {
//                 createForm.reset();
//             }).catch((err) => {
//                 console.log(err.message);
//             })
//         });
//     } else {
//         window.location.hash = '#/';
//         changeView(window.location.hash);
//     }
// });
