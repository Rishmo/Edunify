import React, { useEffect, useState } from 'react';
// Import React to build the component
// Import `useEffect` to handle side effects like data fetching
// Import `useState` to manage component state

import axios from 'axios';
// Import Axios for making HTTP requests

const ShowSchools = () => { // Define a functional React component named `ShowSchools`
    const [schools, setSchools] = useState([]);
    // Declare a state variable `schools` to store the list of schools
    // Initialize it with an empty array
    // `setSchools` is a function to update the `schools` state

    useEffect(() => {
    // Use `useEffect` to perform the side effect of fetching data
    // The empty dependency array `[]` ensures this runs only once, when the component mounts

        const fetchSchools = async () => {
            // Define an asynchronous function to fetch school data
           
            try {
                
                const response = await axios.get('http://localhost:5000/api/schools');
                // Make a GET request to the backend API to retrieve the list of schools

                setSchools(response.data);
                // Update the `schools` state with the response data

            } catch (error) {
                console.error('Error fetching schools:', error);
                // Log any error that occurs during the GET request
            }
        };
        fetchSchools();
        // Call the `fetchSchools` function to initiate data fetching
    }, []);

    return (
        <div>
            {/* Render a container div to hold the list of schools */}

            {schools.map((school) => (
                // Use the `map` function to iterate over the `schools` array
                // For each school, return a `div` containing its details

                <div key={school.id}>
                    {/* Use `key` to uniquely identify each rendered school */}

                    <h3>{school.name}</h3> 
                    {/* Display the school's name in an `h3` tag */}

                    <p>{school.address}, {school.city}, {school.state}</p> 
                    {/* Display the address, city, and state in a paragraph tag */}

                    <p>Contact: {school.contact_number}</p> 
                    {/* Display the school's contact number */}

                    <p>Email: {school.email_id}</p> 
                    {/* Display the school's email */}
                    
                    {school.image && <img src={school.image} alt={school.name} style={{ width: '100px' }} />} 
                    {/* If an image URL exists, display the image */}
                    {/* Set a fixed width of 100px for the image */}
                    
                </div>
            ))}
        </div>
    );
};

export default ShowSchools;
