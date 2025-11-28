const documentRepository = require('../repositories/documentRepository');
const Document = require('../models/documentModel');

class DocumentService {
    
    getAllDocuments() {
        return documentRepository.findAll();
    }

    getDocumentById(id) {
        const doc = documentRepository.findById(id);
        if (!doc) {
            throw new Error('Documento no encontrado'); // Manejo de errores
        }
        return doc;
    }

    createDocument(data) {
        if (!data.title || !data.workspace_id) {
            throw new Error('Faltan campos requeridos: title, workspace_id');
        }
        const newDoc = new Document(data.title, data.icon, data.workspace_id);
        return documentRepository.save(newDoc);
    }

    updateDocument(id, updates) {
        const safeUpdates = {};
        if (updates.title) safeUpdates.title = updates.title;
        if (updates.icon) safeUpdates.icon = updates.icon;
        if (updates.content) safeUpdates.content = updates.content; 

        const updatedDoc = documentRepository.update(id, safeUpdates);
        if (!updatedDoc) {
            throw new Error('Documento no encontrado');
        }
        return updatedDoc;
    }

    deleteDocument(id) {
        const isDeleted = documentRepository.softDelete(id);
        if (!isDeleted) {
            throw new Error('Documento no encontrado');
        }
        return true;
    }
}

module.exports = new DocumentService();