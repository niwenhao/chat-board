'use client';

import { Button, Dialog, DialogPanel, DialogTitle, Input } from "@headlessui/react";
import { useEffect, useState } from "react";
import ChannelEditPane from "./channel-edit-pane";

export default function ChannelBar({ channel, setChannel }) {
    const [authorizedChannels, setAuthorizedChannels] = useState([]);
    const [otherChannels, setOtherChannels] = useState([]);

    const [editOpen, setEditOpen] = useState(false);

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

    const handlePlusClick = e => {
        console.log("plus clicked");
        setEditOpen(true);
    }




    return (
        <div className="bg-blue-500 text-white p-4"> {/* Title bar */}
            <div>
                <span className="text-2xl">🔍</span>
                <Input type="text" placeholder="Search" className="w-2/3" />
                <span onClick={handlePlusClick}>&nbsp;✙&nbsp;</span>
                <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                    <DialogTitle>Edit Channel</DialogTitle>
                    <div className="w-full h-full flex items-center justify-center">
                        <DialogPanel className="w-[20cm] h-[10cm] bg-blue-200 z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <ChannelEditPane 
                                channel={{ name: "", description: "" }} 
                                onSaveChannel={(c) => { setEditOpen(false); }} 
                            />
                        </DialogPanel>
                    </div>
                </Dialog>
            </div>
            <div className="mt-4">
                <div className="flex items-center space-x-2 cursor-pointer">Authorized Channels</div>
                <ul>
                    {authorizedChannels.map(c => (
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
                    {otherChannels.map(c => (
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

