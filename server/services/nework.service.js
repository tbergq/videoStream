/* eslint-disable */
import network from 'network';

export const getPrivateIp = () => new Promise((resolve, reject) => {
  network.get_private_ip((err, ip) => {
    err ? reject(err) : resolve(ip);
    }
  );
});
