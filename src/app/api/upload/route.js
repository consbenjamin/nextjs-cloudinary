import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import path from "path";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dfrl3p3k5', 
  api_key: '615589812553944', 
  api_secret: 'm0mMPZOBE7FeQ-_KE5Fccyl6744' 
});

export async function POST(request) {

  const data = await request.formData();
  const image = data.get('file');
  
  if (!image) {
    return NextResponse.json('no se ha subido ninguna imagen', {status: 400});
  }

  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  //guardar en un archivo
  // const filePath = path.join(process.cwd(), 'public', image.name);
  // console.log(filePath);
  // await writeFile(filePath, buffer);

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({}, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    }).end(buffer)
  });

  //Aca puedo manipular la imagen y hacer lo que quiera como...
  //guardar en base de datos
  //procesar imagen
  console.log(response.secure_url)
  

  return NextResponse.json({
    message: 'imagen subida',
    url: response.secure_url
  });
}