export default () => {
    const div = document.createElement('div');
    const signinview = `
    <div><img class="logo" src="../src/img/Drawing.png" alt="logo"></div>
    <div class="modals modal-signin">
    <header>NOTE IT</header>
    <main>
        <form id="signin-form">
            <input type="email" id="signin-email" placeholder="Email" required>
            <input type="password" id="signin-password" placeholder="Password" required>
            <p class="error"></p>
            <button type="submit">Log In</button>
        </form>
    </main>
    <div class="signin-option">
        <p>o bien ingresa con...</p>
        <button class="signin-google"><i class="fab fa-google-plus"></i></button>
        <p>¿No tienes cuenta? <a href="#/sign-up">Regístrate</a> </p>
    </div>
    </div>`;
    div.className = 'container-modal-signin';
    div.innerHTML = signinview;
    // SIGN IN
    const signinForm = div.querySelector('#signin-form');
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = signinForm['signin-email'].value;
        const password = signinForm['signin-password'].value;
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            // console.log(cred.user);
            signinForm.reset();
            signinForm.querySelector('.error').innerHTML = '';
        }).catch((err) => {
            signinForm.querySelector('.error').innerHTML = err.message;
        });;
    });
    // GOOGLE SIGN IN
    const signinGoogle= div.querySelector('.signin-google');
    signinGoogle.addEventListener('click', () => {
        firebase.auth().signInWithRedirect(provider).then((result) => {
            if (result.credential) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;
              console.log(token);
            }
            // The signed-in user info.
            // console.log(result.user);
            // console.log(result.user.uid);
          }).catch((error) => {
            console.log(error.message);
          });;
    });
    return div;
}