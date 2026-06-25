// Multer is a medium to store date or file in cloudinary.

// Step one is multer will upload the file in local server temporary, and next step  cloudinary will take those file from local server or storage and and upload in server.

// https : it is used to encrypt the text,generally unreadable normally,can read in server can read in client but not in between.

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
