/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import dbConnect from '@/lib/dbConnect';
import fileModel from '@/model/document';
import { getEmbedding } from '@/helper/getEmbedding';
import { getAuthUser } from '@/context/getAuthUser';

// export const config = {
// api: {
//         bodyParser: false,
//     },
// };

// export async function POST(req: server.NextRequest) {
//     try {
//         await dbConnect();

//         const uploadDir = path.join(process.cwd(), 'temp');
//         const saveDir = path.join(process.cwd(), 'public/files');
//         await mkdir(uploadDir, { recursive: true });
//         await mkdir(saveDir, { recursive: true });

//         const _user = await getAuthUser(["User"]);
//         if (_user instanceof server.NextResponse) return _user;

//         // Parse multipart form data using Next.js built-in parser.
//         const formData = await server.unstable_parseMultipartFormData(req);
//         const file = formData.get('file') as File;
//         if (!file || !file.name.endsWith('.txt')) {
//             return server.NextResponse.json(
//                 { success: false, message: 'Only .txt files allowed' },
//                 { status: 400 }
//             );
//         }

//         // Save the file temporarily
//         const arrayBuffer = await file.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);
//         const tempFilePath = path.join(uploadDir, file.name);
//         await rename(tempFilePath, tempFilePath); // placeholder if you want to move file later

//         // For example, if you want to process the file directly from buffer:
//         const content = buffer.toString('utf-8');
//         const embeddings = getEmbedding(content);

//         const newFile = new fileModel({
//             name: file.name,
//             embeddings,
//             user: _user.id,
//         });
//         const savedFile = await newFile.save();
//         const newFilePath = path.join(saveDir, `${savedFile._id}.txt`);

//         // Write the file buffer to the final destination
//         await rename(tempFilePath, newFilePath);

//         return server.NextResponse.json(
//             { success: true, message: 'Uploaded' },
//             { status: 200 }
//         );
//     } catch (error: any) {
//         console.error('Error processing file upload:', error.message);
//         return server.NextResponse.json(
//             { success: false, message: 'Processing failed' },
//             { status: 500 }
//         );
//     }
// }

export async function POST(request: Request) {
    try {
        await dbConnect();

        const { filename, content } = await request.json();
        if (!filename || !content) {
            return NextResponse.json(
                { success: false, message: "Missing filename or content" },
                { status: 400 }
            );
        }
        console.log("found file: "+ filename)
        console.log("content:- " + content)

        // Create directories if they don't exist
        const saveDir = path.join(process.cwd(), "public/files");
        await mkdir(saveDir, { recursive: true });

        const _user = await getAuthUser(["User"]);
        if (_user instanceof NextResponse) return _user;

        // Process the content and generate embeddings if necessary
        const embeddings = await getEmbedding(content);
        console.log("embedding" + embeddings)

        // Save file details to your database
        const newFile = new fileModel({
            name: filename,
            embeddings,
            user: _user.id,
        });
        const savedFile = await newFile.save();
        console.log("saved file" + savedFile)
        const filePath = path.join(saveDir, `${savedFile._id}.txt`);

        // Create a new .txt file with the provided content
        const filesaved = await writeFile(filePath, content, "utf8");
            console.log("File Saved" + filesaved)

        return NextResponse.json(
            { success: true, message: "Uploaded" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error processing file upload:", error.message);
        return NextResponse.json(
            { success: false, message: "Processing failed" },
            { status: 500 }
        );
    }
}
