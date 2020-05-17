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
                navSection.innerHTML= '';
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
                userName.innerHTML = `user name: ${user.displayName}`
                userEmail.innerHTML = user.displayName;
            } else {
                userEmail.innerHTML = user.email;
            }
            // CREATE FORM
            const createForm = div.querySelector('#notes-form');
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
        }
    });
     // DISPLAY THEME
     const divtheme = document.createElement('div');
            divtheme.className = "div-theme";
            const themeHtml = `
            <div class="theme-option one">
    <div></div>
    <div></div>
</div>
<div class="theme-option two">
    <div></div>
    <div></div>
</div>
<div class="theme-option three">
    <div></div>
    <div></div>
</div>
<div class="theme-option four">
    <div></div>
    <div></div>
</div>
            `;
            divtheme.innerHTML = themeHtml;
     const theme = div.querySelector('#theme');
     theme.addEventListener('click', () => {
        navSection.innerHTML= '';
        navSection.appendChild(divtheme);
     });
    const mainNav = div.querySelector('.main-nav');
     const oneTheme = divtheme.querySelector('.one');
     oneTheme.addEventListener('click', () => {
         mainNav.classList.add('nav-one');
         mainNav.classList.remove('nav-two', 'nav-three', 'nav-four');
     });
     const twoTheme = divtheme.querySelector('.two');
     twoTheme.addEventListener('click', () => {
         mainNav.classList.add('nav-two');
         mainNav.classList.remove('nav-one', 'nav-three', 'nav-four');
     });
     const threeTheme = divtheme.querySelector('.three');
     threeTheme.addEventListener('click', () => {
         mainNav.classList.add('nav-three');
         mainNav.classList.remove('nav-one', 'nav-two', 'nav-four');
     });
     const fourTheme = divtheme.querySelector('.four');
     fourTheme.addEventListener('click', () => {
         mainNav.classList.add('nav-four');
         mainNav.classList.remove('nav-one', 'nav-two', 'nav-three');
     });
    // LOG OUT
    const logout = div.querySelector('#logout');
    logout.addEventListener('click', () => {
        auth.signOut()
            .then(() => {
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