import {io} from 'socket.io-client';
import {Socket} from 'socket.io-client/build/socket';
import {websocketUrl} from '@/config/url';

// const
let socket: Socket;
export const useSocket = () => {
  socket = socket || io(websocketUrl);
  return [socket];
};
