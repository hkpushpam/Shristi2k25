/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import type { File as FormidableFile } from 'formidable';
import { IncomingForm } from 'formidable';
import { mkdir, rename, readFile } from 'fs/promises';
import path from 'path';
import dbConnect from '@/lib/dbConnect';
import fileModel from '@/model/document';
import { getEmbedding } from '@/helper/getEmbedding';
import { getAuthUser } from '@/context/getAuthUser';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    await dbConnect();

    const uploadDir = path.join(process.cwd(), '/temp');
    const saveDir = path.join(process.cwd(), '/public/files');
    await mkdir(uploadDir, { recursive: true });
    await mkdir(saveDir, { recursive: true });

    const _user = await getAuthUser(["Admin"]);
    if (_user instanceof NextResponse) return _user;

    const form = new IncomingForm({
        uploadDir,
        keepExtensions: true,
        multiples: false,
        maxFileSize: 5 * 1024 * 1024, // 5MB limit
        allowEmptyFiles: false,
    });

    form.parse(req as any, async (err, fields, files) => {
        if (err) {
            console.error('File upload error:', err);
            return NextResponse.json(
                    { success: false, message: 'File upload failed' },
                    { status: 500 }
            );
        }
        try {
            const file = (files.file?.[0] ?? files.file) as FormidableFile;
            if (!file || !file.originalFilename?.endsWith('.txt')) {
                return NextResponse.json(
                    { success: false, message: 'Only .txt files allowed' }),
                    { status: 400 }
            }

            // 1. Read the file
            const content = await readFile(file.filepath, 'utf-8');

            // 2. Process the text
            const array = getEmbedding(content);

            // 3. Connect to insert
            const newFile = new fileModel({
                name: file.originalFilename,
                embeddings: array,
                user: _user.id
            })
            const savedFile = await newFile.save();
            const fileName = savedFile._id;

            // 4. Save the file using the MongoDB _id as filename
            const newFilePath = path.join(saveDir, `${fileName}.txt`);
            await rename(file.filepath, newFilePath);

            return NextResponse.json({
                        success: true,
                        message: 'Uploaded',
                        id: fileName,
                    },
                    { status: 200 }
            );
        } catch (e) {
            console.error('Processing error:', e);
            return NextResponse.json(
                    { success: false, message: 'Processing failed' },
                    { status: 500 }
            );
        }
    });
}
