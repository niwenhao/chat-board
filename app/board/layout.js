import '../globals.css';
import TitleBar from './title-bar';
import ChannelBar from './channel-bar';
import { cookies } from 'next/headers';

export default async function BoardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  const fetchChannels = async () => {
    const channels = { authorized: [], unauthorized: [] };
    {
      const response = await fetch('http://localhost:3000/api/channels/authorized', {
        cache: 'no-store',
        headers: {
          'Cookie': `token=${token.value}` // Include the cookie in the request headers
        }
      });
      if (response.ok) {
        channels.authorized = await response.json();
      }
    }
    {
      const response = await fetch('http://localhost:3000/api/channels', {
        cache: 'no-store',
        headers: {
          'Cookie': `token=${token.value}` // Include the cookie in the request headers
        }
      });
      if (response.ok) {
        const unauthorized = await response.json();
        const channelIds = channels.authorized.map(c => c.id);
        channels.unauthorized = unauthorized.filter(c => !channelIds.includes(c.id));
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
            <ChannelBar initChannels={await fetchChannels()}/>
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