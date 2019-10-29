const root = document.getElementById('root');

const renderPage = () => {
    const template = (

        <div>
            <h1>Visibility Toggle</h1>
            <button onClick={toggleVisibility}>
            {visibility ? 'Hide details' : 'Show details'}
            </button>
            {visibility ? <p>Details</p> : ''}
        </div>

    )
    ReactDOM.render(template, root);
};

let visibility = false;

const toggleVisibility = () => {
    visibility = !visibility;
    renderPage();
}

renderPage();