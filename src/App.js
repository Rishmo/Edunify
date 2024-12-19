import React from 'react';
import AddSchool from './AddSchool';
import ShowSchools from './ShowSchools';
import './style.css';

const App = () => {
    return (
        <div>
            <h1>Edunify - Add Your School</h1>
            <AddSchool />
            <hr />
            <ShowSchools />
        </div>
    );
};

export default App;
