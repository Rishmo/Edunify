import React from 'react'; // Import React to create and use React components

// Import the "useForm" hook from the react-hook-form library to manage form state and validation.
import { useForm } from 'react-hook-form';

// Import Axios to make HTTP requests to the backend API
import axios from 'axios';

// Define a functional React component named "AddSchool"
const AddSchool = () => {
    const { register, handleSubmit } = useForm();
    // Destructure the `register` function and `handleSubmit` method from `useForm`
    //  `register`: Registers input fields and binds them to the form state
    //  `handleSubmit`: Handles form submission logic and calls a provided callback

    // Define the function to handle form submission; `data` contains form input values
    const onSubmit = async (data) => {
        try {

            // Sending a POST request to the backend API to add the school data
            const response = await axios.post('http://localhost:5000/api/schools', data);
            
            // If the response status is 200 (i.e. success), display a success message
            if (response.status === 200) {
                alert('School added successfully!');
            }

        } catch (error) {

            // Log any error that occurs during the POST request
            console.error('Error adding school:', error);
            alert('Failed to add school.'); // Display an error message to the user
        }
    };

    return (
        
        // Render the form with the `onSubmit` handler.
        // - `handleSubmit(onSubmit)`: Automatically prevents the default form behavior, validates inputs, and invokes `onSubmit`
        <form onSubmit={handleSubmit(onSubmit)}>

            <input {...register('name')} placeholder="School Name" required />
            <input {...register('address')} placeholder="Address" required />
            <input {...register('city')} placeholder="City" required />
            <input {...register('state')} placeholder="State" required />
            <input {...register('contact_number')} placeholder="Contact Number" />
            <input {...register('image')} placeholder="Image URL" />
            <input {...register('email_id')} type="email" placeholder="Email" required />
            
            {/* Submit button to trigger form submission  */}
            <button type="submit">Add School</button>

        </form>
    );
};

export default AddSchool;
