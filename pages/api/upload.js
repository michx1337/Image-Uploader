import { nanoid } from "nanoid";
import formidable from "formidable";

export const config = {
 api: {
  bodyParser: false,
 },
};

export default async function api(req, res) {
 try {
  if (req.method !== "POST") {
   return res.status(405).json({
    message: "Method not allowed!",
    error: "Method not allowed!",
   });
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
   if (err) {
    res.status(500).json({
     message: "Error parsing image!",
     error: "Error parsing image!",
    });
   }
   if (!files.file) {
    return res.status(400).json({
     message: "No file provided",
     error: "No file provided!",
    });
   }
   const ext = files.file.originalFilename.split(".").pop();
   if (!ext || !["png", "jpg", "jpeg", "gif"].includes(ext)) {
    return res.status(400).json({
     message: "Invalid file extension!",
     error: "Invalid file extension!",
    });
   }

   const id = nanoid(10);
   const fileName = `${id}.${ext}`;
   fetch(`https://storage.bunnycdn.com/${process.env.IMAGE_STORE}/${process.env.IMAGE_STORE}/${fileName}`, {
    method: "PUT",
    headers: {
     AccessKey: `${process.env.API_KEY}`,
     "content-type": "application/octet-stream",
    },
   })
    .then((res) => res.json())
    .then((json) => {
     return res.status(200).json({
      message: fileName,
      data: json,
     });
    })
    .catch((err) => {
     return res.status(500).json({
      message: "Error uploading image!",
      error: "Error uploading image!",
     });
    });
  });
 } catch (error) {
  return res.status(500).json({
   message: "Error uploading image!",
   error: "Error uploading image!",
  });
 }
}
