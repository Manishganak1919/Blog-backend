/*** This component is used for upolad new images to write blog about it****/
/** to upload this we use {multer & multer-Gridfs-storage} */
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb://${username}:${password}@ac-ojkiazd-shard-00-00.isavasq.mongodb.net:27017,ac-ojkiazd-shard-00-01.isavasq.mongodb.net:27017,ac-ojkiazd-shard-00-02.isavasq.mongodb.net:27017/?ssl=true&replicaSet=atlas-i6bewt-shard-0&authSource=admin&retryWrites=true&w=majority`,
  options: { useNewUrlParser: true },
  file: (request, file) => {
    const match = ["image/png", "image/jpg"];

    if(match.indexOf(file.memeType) === -1) 
        return`${Date.now()}-blog-${file.originalname}`;

    return {
        bucketName: "photos",
        filename: `${Date.now()}-blog-${file.originalname}`
    }
  }
});

export default multer({storage});