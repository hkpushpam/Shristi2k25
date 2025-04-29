import '@tensorflow/tfjs-node';
import * as use from '@tensorflow-models/universal-sentence-encoder';

export async function getEmbedding(text: string): Promise<number[]> {
    const model = await use.load();
    const embeddings = await model.embed([text]);

    const embeddingArray = await embeddings.array() as number[][];
    return embeddingArray[0];
}
