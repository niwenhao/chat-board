import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Logout from '../logout.webp'
import Image from 'next/image';

export default function TitleBar() {
    const { userInfo } = useContext(AuthContext);
    const handleLogout = () => {
        // Clear the token from cookies
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // Redirect to home page
        window.location.href = '/';
    };

    return (
        <div className="bg-blue-500 text-white p-4"> {/* Title bar */}
            <h1 className="text-xl">Chat Board</h1>
            <div className="text-right">
                <p className="text-l">Welcome, {userInfo.email}!
                <button onClick={handleLogout} className="ml-4">
                    <Image src={Logout} alt="Logout" width={30} height={30} />
                </button></p>
            </div>
        </div>
    );
}