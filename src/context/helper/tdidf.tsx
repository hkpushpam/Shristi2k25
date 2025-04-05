import natural from 'natural';
import cosineSimilarity from 'compute-cosine-similarity';
import TfIdf from 'tf-idf';

// 1️⃣ Tokenizer from Natural
const tokenizer = new natural.WordTokenizer();

// 2️⃣ Preprocess text
export function preprocessText(text: string): string {
    return tokenizer.tokenize(text.toLowerCase()).join(' ');
}

// 3️⃣ Add documents to TF-IDF
export function addDocumentsToTfIdf(
    tfidf: TfIdf,
    docs: { id: string; content: string }[]
): void {
    docs.forEach((doc) => {
        const processed = preprocessText(doc.content);
        tfidf.addDocument(processed, doc.id);
    });
}

// 4️⃣ Get document vector
export function getVector(tfidf: TfIdf, docIndex: number): number[] {
    const terms = tfidf.listTerms(docIndex);
    return terms.map((term) => term.tfidf);
}

// 5️⃣ Compare new document to existing ones
export function compareNewDocToExisting(
    tfidf: TfIdf,
    newDocIndex: number
): { id: string; score: number }[] {
    const newVector = getVector(tfidf, newDocIndex);
    const results: { id: string; score: number }[] = [];

    for (let i = 0; i < tfidf.documents.length - 1; i++) {
        const existingVector = getVector(tfidf, i);
        const score = cosineSimilarity(existingVector, newVector);
        results.push({
            id: (tfidf.documents[i] as any).__key || `doc_${i}`, // fallback if key isn't set
            score,
        });
    }

    return results.sort((a, b) => b.score - a.score);
}
