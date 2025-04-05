import cosineSimilarity from 'compute-cosine-similarity';
import fileModel from '@/model/document';

export async function findMostSimilarDocument(newEmbedding: number[]) {
    const Alldocs = await fileModel.find({}).select("_id embeddings").lean();

    let bestDoc = null;
    let highestSimilarity = -1;

    for (const doc of Alldocs) {
        const similarity = cosineSimilarity(newEmbedding, doc.embeddings) || -1;
        if (similarity > highestSimilarity) {
            highestSimilarity = similarity;
            bestDoc = doc;
        }
    }

    return { bestDoc, similarity: highestSimilarity };
}