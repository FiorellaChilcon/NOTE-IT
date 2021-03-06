export default () => {
    const div = document.createElement('div');
    const signupview = `
    <div><img class="logo-signup" src="../src/img/logo-signup.png" alt="logo-signup"></div>
    <div class="modals modal-signup">
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
    <div class="signin-option">
        <p>Inicia sesión con...</p>
        <button class="signin-google"><i class="fab fa-google-plus"></i></button>
        <p>¿Tienes cuenta? <a href="#/sign-in">Inicia sesión</a> </p>
    </div>
    </div>`;
    // <div><img class="logo-like" src="../src/img/logo-like.png" alt="logo-signup"></div>
    div.className = 'container-modal-signup';
    div.innerHTML = signupview;
    // SIGN UP
    const signupForm = div.querySelector('#signup-form');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;
        // create user/ async function wich generates a credential token
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                signupForm.reset();
                signupForm.querySelector('.error').innerHTML = '';
            }).catch((err) => {
                signupForm.querySelector('.error').innerHTML = err.message;
            });
    });
    // GOOGLE SIGN IN
    const signinGoogle = div.querySelector('.signin-google');
    signinGoogle.addEventListener('click', () => {
        firebase.auth().signInWithPopup(provider).then((result) => {
           console.log(result.user);
        }).catch((error) => {
            console.log(error.message);
        });;
    });
    return div;
};