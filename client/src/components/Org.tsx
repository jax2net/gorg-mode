import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Contains the text area for users to input and view
// their .org files
const Org = ({ org }: any) => {

    const [orgHTML, setOrgHTML] = useState('');

    // const view = () => {
    //     let x = document.getElementById('org');
    //     if (x?.style.display === 'none') {
    //         x.style.display = 'block';
    //     } else {
    //         x.style.display = 'none';
    //     }
    // }

    useEffect(() => {
        async function getHtml() {
            const html: any = await axios.get(`http://localhost:5000/orgs/${org.id}`)
            setOrgHTML(() => html.data);
        }
        getHtml();
    }, [])



    return (
        <React.Fragment>
            <button className="btn btn-small btn-transparent">View</button>
            <div id="org" dangerouslySetInnerHTML={{ __html: orgHTML }}></div>
        </React.Fragment>
    );
}

export default Org;