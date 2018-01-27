import network from 'network';

export const getPrivateIp = () => new Promise((resolve, reject) => {
  network.get_private_ip((err, ip) => {
    if (err) {
      reject(err);
    } else {
      resolve(ip);
    }
  });
});

const NetworkService = {
  getPrivateIp,
};

export default NetworkService;
