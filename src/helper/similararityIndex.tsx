import cosineSimilarity from 'compute-cosine-similarity';
import { getEmbedding } from './getEmbedding';
import fileModel from '@/model/document';

export async function findMostSimilarDocument(newText: string) {

    const newEmbedding = await getEmbedding(newText);
    const docs = await fileModel.find({}).lean();

    let bestDoc = null;
    let highestSimilarity = -1;

    for (const doc of docs) {
        const similarity = cosineSimilarity(newEmbedding, doc.embeddings) || -1;
        if (similarity > highestSimilarity) {
            highestSimilarity = similarity;
            bestDoc = doc;
        }
    }

    return { bestDoc, similarity: highestSimilarity };
}

// Example usage
// (async () => {
//     const newText = "Your new document content here...";
//     const result = await findMostSimilarDocument(newText);
//     console.log("Most similar document:", result.bestDoc);
//     console.log("Similarity score:", result.similarity);
// })();
