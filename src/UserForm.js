import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

//api
import * as api from './userApi';

const UserForm = ({ user, setIsEditing }) => {
    const [fields, setFields] = useState({ ...user });

    const queryClient = useQueryClient();

    const { isLoading, mutate } = useMutation(api.updateUser, {
        onMutate: (updatedUser) => {
            queryClient.setQueryData(['user'], user.id), updatedUser);

            setIsEditing(false);
        },
        onSuccess: () => {
            // trigger the old data to be updated
            queryClient.invalidateQueries(['user', user.id]);
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFields({ ...fields, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        mutate(fields);
    }

    if(isLoading){
        return ' Saving your changes...';
    }

    return (
        <div style={{ paddingTop: 20 }}>
            <form onSubmit={handleSubmit}>
            <label>
                Name: {' '}
                <input
                    name="name"
                    type="text"
                    value={fields.name}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: 20 }}
                />
            </label>

            <label>
                Details: {' '}
                <input
                    name="details"
                    type="text"
                    value={fields.details}
                    onChange={handleChange}
                    style={{ width: '100%', height: 100 }}
                />
            </label>
            <input type="submit" value="Submit" />
            </form>
        </div>
     );
}

export default UserForm;
