//import crypto from 'crypto';
import { nanoid } from "nanoid";
import formidable from "formidable";
import fs from "fs";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth].js";

export const config = {
 api: {
  bodyParser: false,
 },
};

export default async function api(req, res) {
 try {
 const session = await unstable_getServerSession(req, res, authOptions)
 if (!session) {
  return res.status(401).json({
   message: "Unauthorized",
   error: "Unauthorized",
   })
 }
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
   await saveFile(files.file).then((id) => {
    return res.status(201).json({
     message: id + "." + ext,
     error: null,
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

// uncomment commented lines to change link length
const saveFile = async (file) => {
 const data = fs.readFileSync(file.filepath);
 const ext = file.originalFilename.split(".").pop();
 const id = nanoid(15); // remove this if you use md5
 //const hashSum = crypto.createHash('md5');
 //hashSum.update(data);
 //const hex = hashSum.digest('hex');
 fs.writeFileSync(`${process.cwd()}/public/${id}.${ext || "png"}`, data); // remove this if you use md5
 //fs.writeFileSync(`${process.cwd()}/public/${hex}.${ext || "png"}`, data);
 await fs.unlinkSync(file.filepath);
 return id;
};
