'use client';

import { Button, Dialog, DialogPanel, DialogTitle, Input } from "@headlessui/react";
import { useEffect, useState, useReducer } from "react";
import ChannelEditPane from "./channel-edit-pane";

export default function ChannelBar({ initChannels}) {
    const [editOpen, setEditOpen] = useState(false);

    const [searchKey, setSearchKey] = useState("");

    // A reducer for authorized channels and unauthorized channels
    const [channels, dispatch] = useReducer((current, action) => {
        switch (action.type) {
            case "addAuthorized":
                return { authorized: [...current.authorized, action.channel], unauthorized: current.unauthorized };
            case "addUnauthorized":
                return { authorized: current.authorized, unauthorized: [...current.unauthorized, action.channel] };
            default:
                return { authorized: current.authorized, unauthorized: current.unauthorized };
        }
    }, initChannels);

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
        <div className="bg-blue-500 h-auto text-white p-4"> {/* Title bar */}
            <div>
                <Button onClick={handlePlusClick} className="border-solid hover:bg-blue-100 bg-red-200 pl-2 pr-2 border-black border-2 m-2">ADD</Button>
                <div className={"w-full relative"}>
                    <Input type="text" placeholder="Search"
                        value={searchKey} onChange={e => setSearchKey(e.target.value)}
                        className={"w-full border-b border-solid text-black"}
                        />
                    <button onClick={() => setSearchKey("")}
                        className="absolute inset-y-0 z-10 right-0 rounded-r-lg text-black border-none">🗙</button>
                </div>
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
                    {channels.authorized.filter(c => c.name.indexOf(searchKey.trim())>=0).map(c => (
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
                    {channels.unauthorized.filter(c => c.name.indexOf(searchKey.trim())>=0).map(c => (
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

