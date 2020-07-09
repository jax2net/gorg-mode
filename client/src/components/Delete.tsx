import React from 'react';
import axios from 'axios';

const Delete = (org: any) => {

    const delOrg = () => {
        //console.log(org);
         axios.delete(`http://localhost:5000/orgs/${org.org.id}`);
         window.location.href = '/';
    }

    return(
        <React.Fragment>
            <button className="btn btn-red" onClick={delOrg}>Delete</button>
        </React.Fragment>
    );
}

export default Delete;