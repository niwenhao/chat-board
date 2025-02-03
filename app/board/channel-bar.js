'use client';

import { useEffect, useReducer } from "react";

export default function ChannelBar({ channel, setChannel }) {
    const [channels, dispatch] = useReducer(channelReducer, []);
    const channelReducer = (state, action) => {
        switch (action.type) {
            case 'add':
                return [...state, action.channel];
            case 'remove':
                return state.filter(c => c.id !== action.id);
            default:
                return state;
        }
    }

    useEffect(() => {}, []);

    return (
        <div className="bg-blue-500 text-white p-4"> {/* Title bar */}

        </div>
    );
}

