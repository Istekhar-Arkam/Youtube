// Multer is a medium to store date or file in cloudinary.

// Step one is multer will upload the file in local server temporary, and next step  cloudinary will take those file from local server or storage and and upload in server.

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../Public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
