'use client';

import { Button, Dialog, DialogPanel, DialogTitle, Input } from "@headlessui/react";
import { useEffect, useState, useReducer } from "react";
import ChannelEditPane from "./channel-edit-pane";

export default function ChannelBar({ channel, setChannel }) {
    const [editOpen, setEditOpen] = useState(false);

    // A reducer for authorized channels and unauthorized channels
    const [channels, dispatch] = useReducer((current, action) => {
        switch (action.type) {
            case "initChannels":
                return action.channels;
            case "addAuthorized":
                return { authorized: [...current.authorized, action.channel], unauthorized: current.unauthorized };
            case "addUnauthorized":
                return { authorized: current.authorized, unauthorized: [...current.unauthorized, action.channel] };
            default:
                return { authorized: current.authorized, unauthorized: current.unauthorized };
        }
    }, {authorized: [], unauthorized: []});

    useEffect(() => {
        const fetchChannels = async () => {
            const resp = await fetch("/api/channels/authorized");
            const channels = await resp.json();
            

            const resp2 = await fetch("/api/channels");
            const channels2 = await resp2.json();
            const unauthenticated = channels2.filter(c => !channels.find(ac => ac.id === c.id));

            return { authorized: channels, unauthorized: unauthenticated };
        };

        fetchChannels().then((channels) => {
            dispatch({ type: "initChannels", channels });
        });
    }, []);

    const handlePlusClick = e => {
        console.log("plus clicked");
        setEditOpen(true);
    }

    const handleSaveChannel = async ({name, description}) => {
        setEditOpen(false);
        // Create a new channel use /api/channels/authroized POST
        const resp = await fetch("/api/channels/authorized", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, description})
        });
        const newChannel = await resp.json();
        dispatch({ type: "addAuthorized", channel: newChannel });
    }

    return (
        <div className="bg-blue-500 text-white p-4"> {/* Title bar */}
            <div>
                <span className="text-2xl">🔍</span>
                <Input type="text" placeholder="Search" className="w-2/3" />
                <span onClick={handlePlusClick}>&nbsp;✙&nbsp;</span>
                <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                    <div className="w-full h-full flex">
                        <DialogPanel className="w-[20cm] h-[10cm] bg-blue-200 z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <ChannelEditPane 
                                channel={{ name: "", description: "" }} 
                                onSaveChannel={handleSaveChannel} 
                            />
                        </DialogPanel>
                    </div>
                </Dialog>
            </div>
            <div className="mt-4">
                <div className="flex items-center space-x-2 cursor-pointer">Authorized Channels</div>
                <ul>
                    {channels.authorized.map(c => (
                        <li 
                            key={c.id} 
                            className={`block p-2 ${channel.id === c.id ? 'bg-blue-400' : ''}`} 
                            onClick={() => setChannel(c)}
                        >
                            {c.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <span className="flex items-center space-x-2 cursor-pointer">Other Channels</span>
                <ul>
                    {channels.unauthorized.map(c => (
                        <li 
                            key={c.id} 
                            className={`block p-2 ${channel.id === c.id ? 'bg-blue-400' : ''}`} 
                            onClick={() => setChannel(c)}
                        >
                            {c.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

