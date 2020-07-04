import React from 'react';
import CreateOrg from './CreateOrg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="pre-4 post-6" style={{ marginTop: '5%' }}>
            <h1>Gorg Mode</h1>
            <div className="modifier-class animate-in-up">
                <p>Gorgeous mode. View your .org files in the browser.</p>
            </div>
        </div>
    );
}

export default Header;