import React from 'react';
import Header from './components/Header';
import ListOrgs from './components/ListOrgs';


const App: React.SFC = () => {
    
    return (
        <React.Fragment>
            <Header />
            <ListOrgs />
        </React.Fragment>
    );
}

export default App;