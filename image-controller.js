import grid from 'gridfs-stream';
import mongoose from 'mongoose';

let gfs,gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'fs'
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('fs');
});




const url = 'http://localhost:8000'
/*** our image is successfully upload into monogodb in upload.js */
export const uploadImage = (request, response)=>{
  /***if client side se request file exist nhi kar rha hai tab */
  if(!request.file)
  {
    return response.status(404).json({msg:"File not found in image-controller"});
  }
  /**nhi toh file ko middleware ne sucessfully upload ho chuka hai, us image k url ko  */

  const imageUrl = `${url}/file/${request.file.filename}`;
  response.status(200).json(imageUrl);  
}
/** if you getting an error 404 while uploading image, use axios version 0.21.1 */

export const getImage = async (request, response) => {
  try {   
      const file = await gfs.files.findOne({ filename: request.params.filename });
      const readStream = gridfsBucket.openDownloadStream(file._id);
      readStream.pipe(response);
  } catch (error) {
      response.status(500).json({ msg: error.message });
  }
}