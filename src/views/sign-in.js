export default () => {
    const div = document.createElement('div');
    const signinview = `
    <header>NOTE IT</header>
    <main>
        <form id="signin-form">
            <input type="email" id="signin-email" placeholder="Email" required>
            <input type="password" id="signin-password" placeholder="Password" required>
            <button type="submit">Log In</button>
        </form>
    </main>
    <div class="signup-option">
        <p>o bien ingresa con...</p>
        <p>¿No tienes cuenta? <a href="#/sign-up">Regístrate</a> </p>
    </div>`;
    div.className = 'modals modal-signin';
    div.innerHTML = signinview;
    // SIGN IN
    const signinForm = div.querySelector('#signin-form');
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = signinForm['signin-email'].value;
        const password = signinForm['signin-password'].value;
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            console.log(cred.user);
            signinForm.reset();
            // loginForm.querySelector('.error').innerHTML = '';
        })
        // .catch((err) => {
        //     loginForm.querySelector('.error').innerHTML = err.message;
        // });;
    });
    return div;
}