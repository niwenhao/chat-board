'use client';
import React, { useState } from 'react';
import '../globals.css';
import TitleBar from './title-bar';
import ChannelBar from './channel-bar';

export default function BoardLayout({ children }) {
  const [channel, setChannel] = useState({});

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-500 text-white p-4"> {/* Title bar */}
        <TitleBar />
      </div>
      <div className="flex flex-1">
        <div className="w-[6cm] bg-gray-200 p-4"> {/* Sidebar */}
          <div className="box-l">
            <ChannelBar channel={channel} setChannel={setChannel} />
          </div>
        </div>
        <div className="flex-1 p-4"> {/* Main content */}

          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}