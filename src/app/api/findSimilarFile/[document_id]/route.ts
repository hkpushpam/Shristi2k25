/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthUser } from '@/context/getAuthUser';
import { findMostSimilarDocument } from '@/helper/similararityIndex';
import dbConnect from '@/lib/dbConnect';
import fileModel from '@/model/document';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { readFile } from 'fs/promises';

export async function GET(
    request: Request,
    { params }: any
) {
    await dbConnect();

    try {
        const { document_id } = await params;
        const user = await getAuthUser(["Admin", "SuperAdmin"]);
        if (user instanceof NextResponse) return user;

        const file = await fileModel.findById(document_id);
        if (!file) return new NextResponse('Document not found', { status: 404 });

        const { bestDoc, similarity } = await findMostSimilarDocument(file.embeddings);
        if (bestDoc) {
            const similarDocument = await fileModel.findById(bestDoc._id);
            if (similarDocument) {
                const filePath = path.join(process.cwd(), 'public', 'files', `${similarDocument._id}.txt`);
                await fs.promises.access(filePath, fs.constants.F_OK);
                const fileBuffer = await readFile(filePath);
                return new Response(fileBuffer, {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/plain',
                        'Content-Disposition': `attachment; filename="${similarDocument.name}"`,
                    },
                });
            } else {
                return new NextResponse('Similar document not found', { status: 404 });
            }
            console.log(similarDocument)
            console.log(similarity)
        }
        else {
            return NextResponse.json(
                {
                    success: false,
                    message: "Can't find the Smilar File"
                },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('Error Finding Similar File:', error);
        return Response.json(
            {
                success: false,
                message: 'Error Fiding Similar File',
            },
            { status: 500 }
        );
    }
}