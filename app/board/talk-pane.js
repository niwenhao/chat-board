'use client';

export default function TalkPane({ channel, selected, setChannel }) {
    const bgcolor = selected ? 'p-4' : 'p-6';
    return (
        <div className={`${bgcolor} hover:bg-gray-200 cursor-pointer`} onClick={() => setChannel(channel)}>
            <p className="text-lg">{channel.name}</p>
        </div>
    );
}