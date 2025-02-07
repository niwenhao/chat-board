import '../globals.css';
import TitleBar from './title-bar';
import ChannelBar from './channel-bar';

export default function BoardLayout({ children }) {

  const fetchChannels = async () => {
    const channels = { authorized: [], unauthorized: [] };
    {
      const response = await fetch('http://localhost:3000/api/channels/authorized');
      if (response.ok) {
        channels.unauthorized = await response.json();
      }
    }
    {
      const response = await fetch('http://localhost:3000/api/channels');
      if (response.ok) {
        const unauthorized = await response.json()
        channels.unauthorized = unauthorized.filter(c => !channels.authorized.includes(c));
      }
    }

    return channels;
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-500 text-white p-4"> {/* Title bar */}
        <TitleBar />
      </div>
      <div className="flex flex-1">
        <div className="w-[8cm] bg-gray-200 p-4"> {/* Sidebar */}
          <div className="box-l">
            <ChannelBar initChannels={fetchChannels()}/>
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