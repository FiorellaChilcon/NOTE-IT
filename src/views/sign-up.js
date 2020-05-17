export default () => {
    const div = document.createElement('div');
    const signupview = `
    <header>
        <h1>NOTE IT</h1>
        <h3>regístrate para empezar a crear tus notas!</h3>
    </header>
    <main>
        <form id="signup-form">
            <input type="email" id="signup-email" placeholder="Email" required>
            <input type="password" id="signup-password" placeholder="Password" required>
            <p class="error"></p>
            <button type="submit">Sign up</button>
        </form>
    </main>
    <div class="signup-option">
        <p>Inicia sesión con...</p>
        <p>¿Tienes cuenta? <a href="#/sign-in">Inicia sesión</a> </p>
    </div>`;
    div.className = 'modals modal-signup';
    div.innerHTML = signupview;
    // SIGN UP
    const signupForm = div.querySelector('#signup-form');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;
        // create user/ async function wich generates a credential token
        auth.createUserWithEmailAndPassword(email, password)
            .then((cred) => {
                return db.collection(cred.user.uid).doc('nota 1').set({
                    tittle: 'Bienvenida',
                    content: 'empieza a crear tu primera nota!'
                });
            }).then(() => {
                signupForm.reset();
                signupForm.querySelector('.error').innerHTML = '';
            }).catch((err) => {
                signupForm.querySelector('.error').innerHTML = err.message;
            });
    });
    return div;
}