import { cookies } from 'next/headers';
import BoardLayout from './base';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export default async function Top() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  let error = "";
  if (!token) {
    error = "Unauthorized";
  } else {
    // Verify the JWT token using the secret key
    const user = jwt.verify(token.value, secret);
    if (!user) {
      error = "Unauthorized";
    } else {
      const fetchChannels = async () => {
        const channels = { authorized: [], unauthorized: [], selectedChannel: {id: 0, name: "", description: ""} };
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
            const selectedChannels = unauthorized.filter(c => c.id === user.defaultChannelId);
            if (selectedChannels.length > 0) {
              channels.selectedChannel = selectedChannels[0];
            }
            const channelIds = channels.authorized.map(c => c.id);
            channels.unauthorized = unauthorized.filter(c => !channelIds.includes(c.id));
          }
        }

        return channels;
      };
      return (
        <>
          <BoardLayout channels={await fetchChannels()} />
        </>
      );

    }
  }
  return (
    <div className='m-[5cm] text-red-500 text-center text-8xl'>
      {error}
    </div>
  );

}
