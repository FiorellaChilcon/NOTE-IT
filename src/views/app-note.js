export default () => {
    const div = document.createElement('div');
    const appNoteView = `
        <nav>
            <ul class="nav-ul">
                <li><i class="fas fa-user"></i> <span>User</span></li>
                <li>
                <button type="button" id="logout"><i class="fas fa-sign-out-alt"></i></button>
                </li>
            </ul>
        </nav>
        <main class="notes-main-container">
            <form id="notes-form">
                <div>
                    <input type="text" id="tittle" placeholder="tittle" required>
                    <input type="text" id="content" placeholder="start writting your note..." required>
                </div>
                <button type="submit"><i class="fas fa-plus-circle"></i></button>
            </form>
            <div id="notes-container">
                <ul id="notes-list"></ul>
            </div>
        </main>`;
    div.innerHTML = appNoteView;
    div.id = 'divNotes';
    // SET UP NOTES
    const noteList = div.querySelector('#notes-list');
    const setUpNotes = (data) => {
        if (data.length) {
            let html = '';
            data.forEach(doc => {
                const note = doc.data();
                const li = `
              <li>
                  <div class="collapsible-header">${note.tittle}</div>
                  <div class="collapsible-body">${note.content}</div>
              </li>`;
                html += li;
            });
            noteList.innerHTML = html;
        }
    };
    auth.onAuthStateChanged((user) => {
        if (user) {
            //FIRESTORE GET DATA 
            db.collection(user.uid).onSnapshot((snapshot) => {
                // passing an array of documents
                setUpNotes(snapshot.docs);
            }, (err) => {
                console.log(err.message);
            });
        }
    });
    // CREATE GUIDE
const createForm = div.querySelector('#notes-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('yEhcndg2MYXvJzeCZqoaTTVEm5Z2').add({
        // it can be also clled with dot notation createForm.tittle
        tittle: createForm['tittle'].value,
        content: createForm['content'].value
    }).then(() => {
        createForm.reset();
    })
    //.catch((err) => {
    //     console.log(err.message);
    // })
});
    // LOG OUT
    const logout = div.querySelector('#logout');
    logout.addEventListener('click', () => {
        auth.signOut()
            .then(() => {
                console.log('user signed out');
            });
    });
    return div;
}