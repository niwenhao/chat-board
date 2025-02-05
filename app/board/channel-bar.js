'use client';

import { Input, Label } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ChannelBar({ channel, setChannel }) {
    const [authorizedChannels, setAuthorizedChannels] = useState([]);
    const [otherChannels, setOtherChannels] = useState([]);

    useEffect(() => {
        const get_channels = async () => {
            const resp = await fetch("/api/channels/authorized")
            const channels = await resp.json();

            const resp2 = await fetch("/api/channels")
            const channels2 = await resp2.json();
            const unauthenticated = channels2.filter(c => !channels.find(ac => ac.id === c.id));
            
            return {authorized: channels, unauthorized: unauthenticated};
        }
        get_channels().then(c => {
            setAuthorizedChannels(c.authorized);
            setOtherChannels(c.unauthorized);
        }
        );
    }, []);


    return (
        <div className="bg-blue-500 text-white p-4"> {/* Title bar */}
            <div>
                <span className="text-2xl">🔍</span>
                <Input type="text" placeholder="Search" className="w-2/3" />
                <span className="text-3xl">✙</span>
            </div>
            <div className="mt-4">
                <div className="flex items-center space-x-2 cursor-pointer">Authorized Channels</div>
                <ul>
                    {authorizedChannels.map(c => (
                        <li key={c.id} className={`block p-2 ${channel.id === c.id ? 'bg-blue-400' : ''}`} onClick={() => setChannel(c)}>{c.name}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <span className="flex items-center space-x-2 cursor-pointer">Other Channels</span>
                <ul>
                    {otherChannels.map(c => (
                        <li key={c.id} className={`block p-2 ${channel.id === c.id ? 'bg-blue-400' : ''}`} onClick={() => setChannel(c)}>{c.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

