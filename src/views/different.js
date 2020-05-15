export default () => {
    const signinview = `<p>404</p> <p>NOT FOUND</p>`;
    const div = document.createElement('div');
    div.className = 'not-found';
    div.innerHTML = signinview;
    return div;
}