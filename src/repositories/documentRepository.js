const Document = require('../models/documentModel');

let documents = [];

/**
 * Seeder inicial para documentos
 */
const seed = () => {
    const doc = new Document("Documento de Bienvenida", "👋", "workspace-demo-123");
    doc.content = { ops: [{ insert: "Hola, bienvenido a InsightFlow.\n" }] };
    documents.push(doc);
    console.log(documents)
    console.log("🌱 Seeder ejecutado: Documento inicial cargado en memoria.");
};
seed();

class DocumentRepository {
    /**
     * Encuentra un documento por su ID, excluyendo los eliminados
     * @param {*} id El ID del documento
     * @returns El documento si se encuentra, de lo contrario undefined
     */
    findById(id) {
        return documents.find(d => d.id === id && !d.is_deleted);
    }

    /**
     * Obtiene todos los documentos no eliminados
     * @param {*} document El documento a guardar
     * @returns Retorna el documento guardado
     */
    save(document) {
        documents.push(document);
        return document;
    }

    /**
     * Actualiza un documento existente
     * @param {*} id El ID del documento a actualizar
     * @param {*} updates Los campos a actualizar
     * @returns Retorna el documento actualizado si se encuentra, de lo contrario null
     */
    update(id, updates) {
        const index = documents.findIndex(d => d.id === id && !d.is_deleted);
        if (index === -1) return null;
        
        documents[index] = { ...documents[index], ...updates };
        return documents[index];
    }

    /**
     * Elimina un documento (soft delete)
     * @param {*} id El ID del documento a eliminar
     * @returns Retorna true si se elimina correctamente, de lo contrario false
     */
    softDelete(id) {
        const index = documents.findIndex(d => d.id === id && !d.is_deleted);
        if (index === -1) return false;
        
        documents[index].is_deleted = true;
        return true;
    }
}

module.exports = new DocumentRepository();