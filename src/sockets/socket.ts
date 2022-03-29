import { Socket } from 'socket.io';
import Marker from '../models/marker.model';

export const googleMapSockets = (client: Socket) => {
  client.on('move-marker', (marker: Marker) => {
    client.broadcast.emit('move-marker', marker);
  });
}
