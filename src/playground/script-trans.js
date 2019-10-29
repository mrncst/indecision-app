'use strict';

var root = document.getElementById('root');

var renderPage = function renderPage() {
    var template = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Visibility Toggle'
        ),
        React.createElement(
            'button',
            { onClick: toggleVisibility },
            visibility ? 'Hide details' : 'Show details'
        ),
        visibility ? React.createElement(
            'p',
            null,
            'Details'
        ) : ''
    );
    ReactDOM.render(template, root);
};

var visibility = false;

var toggleVisibility = function toggleVisibility() {
    visibility = !visibility;
    renderPage();
};

renderPage();
