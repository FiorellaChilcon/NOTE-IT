export default (dataAndId) => {
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
        const liNote = li.querySelector('.li-note');
        if (note.photo !== '') {
            const img = document.createElement('img');
            img.className = 'photo-post';
            img.alt = 'image';
            storage.ref().child(note.photo).getDownloadURL().then((url) => {
                img.src = url;
            }).catch((err) => {
                console.log(err.message)
            });
            liNote.appendChild(img);
        }
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
            if (note.photo !== '') {
                storage.ref().child(note.photo).delete();
            }
        });
        return li;
    });
    return newData
};
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