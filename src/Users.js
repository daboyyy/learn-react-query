import React from 'react'
import { useQuery }from 'react-query'

//api
import * as api from './userApi';

const Users = ({ setUserId }) => {
    const { data, isLoading, isError } = useQuery('users', api.getUsers)

    if(isLoading){
        return 'Loading users...'
    }

    if(isError){
        return 'Something went wrong!!'
    }

    return (
        <div>
            <ul>
                {data?.map(user =>
                <li key={user.id}>
                    {user.name} <button onClick={() => setUserId(user.id)}>View</button>
                </li>
                )}
            </ul>
        </div>
     );
}

export default Users;
