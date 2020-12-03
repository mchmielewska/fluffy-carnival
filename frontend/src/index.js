/*jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import 'fontsource-roboto';
import './index.css'



ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ,
    document.querySelector('#root'))

