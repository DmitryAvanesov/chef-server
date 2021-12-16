const whitelist = [
  "http://localhost",
  "http://192.168.0.100:8080",
  "http://192.168.0.101:8080",
  "http://192.168.0.102:8080",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = corsOptions;
