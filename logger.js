const logger = (req, res, next) => {
  const { method, url } = req;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
};

module.exports = logger;
