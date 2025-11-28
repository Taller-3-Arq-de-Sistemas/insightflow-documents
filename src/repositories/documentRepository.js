const Document = require('../models/documentModel');

let documents = [];

const seed = () => {
    const doc = new Document("Documento de Bienvenida", "👋", "workspace-demo-123");
    doc.content = { ops: [{ insert: "Hola, bienvenido a InsightFlow.\n" }] };
    documents.push(doc);
    console.log("🌱 Seeder ejecutado: Documento inicial cargado en memoria.");
};
seed();

class DocumentRepository {

    findById(id) {
        return documents.find(d => d.id === id && !d.is_deleted);
    }

    save(document) {
        documents.push(document);
        return document;
    }

    update(id, updates) {
        const index = documents.findIndex(d => d.id === id && !d.is_deleted);
        if (index === -1) return null;
        
        documents[index] = { ...documents[index], ...updates };
        return documents[index];
    }

    softDelete(id) {
        const index = documents.findIndex(d => d.id === id && !d.is_deleted);
        if (index === -1) return false;
        
        documents[index].is_deleted = true;
        return true;
    }
}

module.exports = new DocumentRepository();