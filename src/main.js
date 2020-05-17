import { changeView } from './view-controller/router.js';
const init = () => {
    changeView(window.location.hash);
    window.addEventListener('hashchange', () => {
        changeView(window.location.hash)
    });
};

window.addEventListener('load', init);
const renderNote2 = (dataAndId) => {
    const newData = dataAndId[0].map((doc) => {
        const li = document.createElement('li');
        const note = doc.data();
        const html = `
    <div class="li-note">
        <div>${note.tittle}</div>
        <div class="note-content">${note.content}</div>
        <button class="save-button"><i class="fas fa-save"></i></button>
    </div>
    <div class="li-options">
        <button><i class="fas fa-times remove"></i></button>
        <button><i class="fas fa-pen edit"></i></button>
    </div>`;
        li.innerHTML = html;
        const editButton = li.querySelector('.edit');
        const divNoteContent = li.querySelector('.note-content');
        const saveButton = li.querySelector('.save-button');
        const removeButton = li.querySelector('.remove');
        editButton.addEventListener('click', () => {
            divNoteContent.contentEditable = 'true';
            divNoteContent.focus();
            saveButton.classList.add('appear');
        });
        saveButton.addEventListener('click', () => {
            divNoteContent.contentEditable = 'false';
            saveButton.classList.remove('appear');
            db.collection(dataAndId[1]).doc(doc.id).update({
                content: divNoteContent.textContent
            })
        });
        removeButton.addEventListener('click', () => {
            db.collection(dataAndId[1]).doc(doc.id).delete();
        });
        return li;
    });
    return newData
};
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        window.location.hash = '#/appNote';
        changeView(window.location.hash);
        const notesList = document.getElementById('notes-list');
        const userEmail = document.getElementById('user-email');
        userEmail.innerHTML = user.email;
        // FIRESTORE GET DATA 
        db.collection(user.uid).onSnapshot((snapshot) => {
            notesList.innerHTML = '';
            // passing an array of documents
            renderNote2([snapshot.docs, user.uid]).forEach((li) => {
                notesList.appendChild(li);
            })
        });
        // CREATE NOTES
        const createForm = document.getElementById('notes-form');
        createForm.addEventListener('submit', (e) => {
            e.preventDefault();
            db.collection(user.uid).add({
                // it can be also called with dot notation createForm.tittle
                tittle: createForm['tittle'].value,
                content: createForm['content'].value
            }).then(() => {
                createForm.reset();
            }).catch((err) => {
                console.log(err.message);
            })
        });
    } else {
        window.location.hash = '#/';
        changeView(window.location.hash);
    }
});

// const renderNote = (dataAndId) => {
//     const newData = dataAndId[0].map(doc => {
//         const note = doc.data();
//         const li = document.createElement('li');
//         const divNote = document.createElement('div');
//         const divOptions = document.createElement('div');
//         const divNoteTittle = document.createElement('div');
//         const divNoteContent = document.createElement('div');
//         const removeButton = document.createElement('button');
//         const editButton = document.createElement('button');
//         const saveButton = document.createElement('i');
//         saveButton.className = 'fas fa-save';
//         divNote.className = 'li-note';
//         divNoteTittle.textContent = note.tittle;
//         divNoteContent.textContent = note.content;
//         divOptions.className = 'li-options';
//         divOptions.setAttribute('data-id', doc.id);
//         removeButton.className = 'remove';
//         editButton.className = 'edit';
//         removeButton.innerHTML = '<i class="fas fa-times"></i>';
//         editButton.innerHTML = '<i class="fas fa-pen"></i>';
//         divNote.appendChild(divNoteTittle);
//         divNote.appendChild(divNoteContent);
//         divOptions.appendChild(removeButton);
//         divOptions.appendChild(editButton);
//         li.appendChild(divNote);
//         li.appendChild(divOptions);
//         // EDIT A DOC
//         editButton.addEventListener('click', () => {
//             divNoteContent.contentEditable = 'true';
//             divNoteContent.focus();
//             divNote.appendChild(saveButton);
//         });
//         saveButton.addEventListener('click', () => {
//             divNoteContent.contentEditable = 'false';
//             divNote.removeChild(saveButton);
//             db.collection(dataAndId[1]).doc(doc.id).update({
//                 content: divNoteContent.textContent
//             })
//         });
//         // DELETE A DOC
//         removeButton.addEventListener('click', () => {
//             db.collection(dataAndId[1]).doc(doc.id).delete();
//         });
//         return li;
//     });
//     return newData;
// };