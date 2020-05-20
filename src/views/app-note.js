import renderNote from '../functions.js'
export default () => {
    const div = document.createElement('div');
    const appNoteView = `
        <nav class="main-nav">
            <div><img class="logo-app" src="../src/img/Drawing.png" alt="logo"></div>
            <ul class="nav-ul">
                <li>
                  <button id="display-settings"><i class="fas fa-user"></i></button> 
                  <span id="user-email">User</span>
                  <div class="settings-layout">
                    <div class="close-settings">x</div>
                    <div id="settings">
                      <div id="nav-settings">
                        <ul class="setting-options">
                          <li id="account-btn"><i class="fas fa-users-cog"></i>Account</li>
                          <li id="theme"><i class="fas fa-brush"></i>Themes</li>
                          <li id="delete-account"><i class="fas fa-exclamation-triangle"></i>Danger</li>
                        </ul>
                      </div>
                     <section id="nav-section"></section>
                    </div>
                  </div>
                </li>
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
                    <input type="file" value="upload" id="photo">
                    <label for="photo"><i class="fas fa-camera-retro"></i></label>
                    <p id="preview"></p>
                </div>
                <button type="submit"><i class="fas fa-plus-circle"></i></button>
            </form>
            <div id="notes-container">
                <ul id="notes-list"></ul>
            </div>
        </main>`;
    div.innerHTML = appNoteView;
    const ul = div.querySelector('#notes-list');
    const userEmail = div.querySelector('#user-email');
    const navSection = div.querySelector('#nav-section');
    auth.onAuthStateChanged((user) => {
        if (user) {
            // FIRESTORE GET DATA 
            db.collection(user.uid).onSnapshot((snapshot) => {
                ul.innerHTML = '';
                // passing an array of documents
                renderNote([snapshot.docs, user.uid]).forEach((li) => {
                    ul.appendChild(li);
                })
            });
            // USER SETTINGS nav-section
            const divAccount = document.createElement('div');
            divAccount.className = "div-account";
            const accountHtml = `
    <p id="email-section">e-mail: ${user.email}</p>
    <p id="user-name"></p>
    <form class="form-display-name">
    <label for="display-name">Add a user name</label>
        <input type="text" id="display-name" required>
        <button  type="submit" class="name-btn">OK</button>
    </form>`;
            divAccount.innerHTML = accountHtml;
            const formDisplayName = divAccount.querySelector('.form-display-name');
            const accountBtn = div.querySelector('#account-btn');
            accountBtn.addEventListener('click', () => {
                navSection.innerHTML = '';
                navSection.appendChild(divAccount);
            });
            const userName = divAccount.querySelector('#user-name');
            formDisplayName.addEventListener('submit', (e) => {
                e.preventDefault();
                user.updateProfile({
                    displayName: formDisplayName['display-name'].value,
                }).then(() => {
                    formDisplayName.classList.add('hide');
                    userName.innerHTML = `user name: ${user.displayName}`
                    userEmail.innerHTML = user.displayName;
                });
                formDisplayName.reset();
            });
            if (user.displayName !== null) {
                formDisplayName.classList.add('hide');
                userName.innerHTML = `user name: ${user.displayName}`;
                userEmail.innerHTML = user.displayName;
            } else {
                userEmail.innerHTML = user.email;
            }
            // DEELETE ACCOUNT
            const deleteAccount = div.querySelector('#delete-account');
            const btntag = document.createElement('button');
            btntag.id = 'deletebtn';
            btntag.textContent = 'DELETE ACCOUNT';
            deleteAccount.addEventListener('click', () => {
                navSection.innerHTML = '';
                navSection.appendChild(btntag);
            });
            btntag.addEventListener('click', () => {
                user.delete().then(() => {
                    alert('user deleted');
                }).catch((error) => {
                    alert(error.message);
                });
            });
            // UPLOAD FILES
            const preview = div.querySelector('#preview');
            const uploadPhoto = div.querySelector('#photo');
            uploadPhoto.addEventListener('change', (e) => {
                const file = e.target.files[0];
                const refPath = `${user.uid}/${file.name}`;
                uploadPhoto.name = refPath;
                storage.ref(refPath).put(file);
                preview.innerHTML = `<img src=${URL.createObjectURL(file)} id="preview-img" alt="preview">`
            });
            // CREATE FORM
            const createForm = div.querySelector('#notes-form');
            createForm.addEventListener('submit', (e) => {
                e.preventDefault();
                db.collection(user.uid).add({
                    tittle: createForm['tittle'].value,
                    content: createForm['content'].value,
                    photo: createForm['photo'].name
                }).then(() => {
                    createForm.reset();
                    preview.innerHTML = '';
                }).catch((err) => {
                    console.log(err.message);
                });
            });
        }
    });
    // DISPLAY THEME
    const divtheme = document.createElement('div');
    divtheme.className = "div-theme";
    const themeHtml = `
    <label>
        <input type="radio" name="theme" value="rgb(44, 159, 253)">
        <div class="theme-option one">
            <div></div>
            <div></div>
        </div>
    </label>
    <label>
        <input type="radio" name="theme" value="rgb(241, 73, 96)">
        <div class="theme-option two">
            <div></div>
            <div></div>
        </div>
    </label>
    <label>
        <input type="radio" name="theme" value="rgb(248, 179, 19)">
        <div class="theme-option three">
            <div></div>
            <div></div>
        </div>
    </label>
    <label>
        <input type="radio" name="theme" value="rgb(141, 43, 233)">
        <div class="theme-option four">
            <div></div>
            <div></div>
        </div>
    </label>
            `;
    divtheme.innerHTML = themeHtml;
    const theme = div.querySelector('#theme');
    theme.addEventListener('click', () => {
        navSection.innerHTML = '';
        navSection.appendChild(divtheme);
    });
    // THEMES
    const mainNav = div.querySelector('.main-nav');
    const radio = divtheme.querySelectorAll('input[type=radio]');
    radio.forEach(x => {
        x.addEventListener('click', () => {
            if (x.checked) {
                const color = x.value;
                localStorage.setItem('bgcolor', color);
                mainNav.style.backgroundColor = color;
            }
        })
    });
    // LOG OUT
    const logout = div.querySelector('#logout');
    logout.addEventListener('click', () => {
        auth.signOut()
            .then(() => {
                window.history.back();
                console.log('user signed out');
            });
    });
    // DISPLAY SETTINGS
    const displaySettings = div.querySelector('#display-settings');
    const settingsLayout = div.querySelector('.settings-layout');
    displaySettings.addEventListener('click', () => {
        settingsLayout.classList.add('appear-flex');
    });

    const closeSettings = div.querySelector('.close-settings');
    closeSettings.addEventListener('click', () => {
        settingsLayout.classList.remove('appear-flex');
    });
    return div;
}
