'use client';

import '../globals.css';
import TitleBar from './title-bar';
import ChannelBar from './channel-bar';

export default function BoardLayout({ channels }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-500 text-white p-4"> {/* Title bar */}
        <TitleBar />
      </div>
      <div className="flex flex-1">
        <div className="w-[8cm] bg-gray-200 p-4"> {/* Sidebar */}
          <div className="box-l">
            <ChannelBar initChannels={channels}/>
          </div>
        </div>
        <div className="flex-1 p-4"> {/* Main content */}
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}