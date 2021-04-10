const { ROOT_PATH } = require("../settings");
const fs = require("fs");
exports.getUser = (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
};

exports.getPhotos = (req, res, next) => {
  //todo
};

exports.uploadPhoto = (req, res, next) => {
  if (req.files === null) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const file = req.files.file;
  const fileExt = file.name.split(".").pop();

  fs.mkdir(
    `${ROOT_PATH}/uploads/${req.user._id}`,
    { recursive: true },
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    }
  );

  file.mv(
    `${ROOT_PATH}/uploads/${req.user._id}/${Date.now() + "." + fileExt}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({ message: "File uploaded" });
    }
  );
};
