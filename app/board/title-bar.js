'use client';

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function TitleBar() {
    const { userInfo } = useContext(AuthContext);
    return (
        <div className="bg-blue-500 text-white p-4"> {/* Title bar */}
            <h1 className="text-xl">Chat Board</h1>
            <div className="text-right">
                <p className="text-l">Welcome, {userInfo.email}!</p>
            </div>
        </div>
    );
}