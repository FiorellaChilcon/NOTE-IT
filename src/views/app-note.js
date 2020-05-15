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