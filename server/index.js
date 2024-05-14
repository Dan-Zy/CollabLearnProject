// As you can see below I am using import instead of require this is beacause I have write a code line of { "type": "module" } in package.json file

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoute.js";
import postRoutes from "./routes/postRoute.js";


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets"); // Set the destination where files should be stored
    },
    filename: function (req, file, cb) {
      // Create a unique filename with the current timestamp
        cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage });


  // ROUTES
  app.use("/collablearn/user", userRoutes);

  app.use("/collablearn/user", postRoutes);

  // app.use("/collablearn/user", userRoutes);



  /* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);

  }).catch((error) => console.log(`${error} did not connect`));