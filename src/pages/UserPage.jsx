import React  from 'react';
import { useLocation } from 'react-router-dom';
import Main from '../components/Main';

export default function UserPage() {
    const { state : {user} } = useLocation();
    console.log(user);

    return(
        <>
            
            <Main user={user}/>
        </>
    )
}