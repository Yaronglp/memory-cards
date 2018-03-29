import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

window.React = React;

ReactDOM.render(
    <App/>,
    document.getElementById('main_container')
);