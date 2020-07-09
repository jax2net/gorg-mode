import React, { useState, useEffect, Fragment } from 'react';
import Org from './Org';
//import Edit from './Edit';
import Delete from './Delete';
import axios from 'axios';

const ListOrgs: React.FC = () => {

    const [orgs, setOrgs] = useState<any[]>([]);
    const [text, setText] = useState<string>('');


    const getOrgs = async () => {
        await axios.get('http://localhost:5000/orgs')
            .then(res => {
                setOrgs(() => res.data);
            })
            .catch(err => {
                console.log(err.message);
            })
    };

    const postOrg = async (e: any) => {
        e.preventDefault();
        await fetch('http://localhost:5000/orgs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: text
        });
        window.location.href = '/';
    }

    useEffect(() => {
        getOrgs();
    }, [])

    return (
        <Fragment>
            <div className="grid-container">
                <div className="column-17 center-column" style={{ marginTop: "1%" }}>
                    <form onSubmit={postOrg}>
                        <label>
                            <h5>Create org</h5>
                        </label>
                        <textarea onChange={(e) => setText(e.target.value)}></textarea>
                            <button className="btn btn-large" style={{ marginTop: "1%" }} type="submit">Post Org</button>
                    </form>
                </div>
                <div className="column-17 center-column" style={{ marginTop: "1%" }}>
                    {orgs.slice(0).reverse().map(o => (
                        <div className="panel panel-no-border" style={{ marginTop: 10 }} key={o.id}>
                            <h4 className="trailer-half">{`Org #${o.id}`}</h4>
                            <Org org={o} />
                            {/* <Edit org={o} /> */}
                            <Delete org={o} />
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );


}


export default ListOrgs;