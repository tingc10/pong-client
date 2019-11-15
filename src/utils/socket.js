import io from 'socket.io-client';

const isProd = process.env.NODE_ENV === 'production';
const host = isProd ? 'https://young-gorge-52676.herokuapp.com' : 'http://localhost:52300';
export const socket = io(host, {
  query: {
    type: 'loader'
  }
});

export function pingServerSocket() {
  socket.emit('pingServer');
  return new Promise((resolve) => {
    socket.on('ack', () => {
      socket.close();
      resolve();
    });
  });
}
