const documentRepository = require('../repositories/documentRepository');
const Document = require('../models/documentModel');

class DocumentService {
    
    /**
     * Obtiene todos los documentos
     * @returns Retorna un arreglo con todos los documentos
     */
    getAllDocuments() {
        return documentRepository.findAll();
    }

    /**
     * Obtiene un documento por su ID
     * @param {*} id El ID del documento
     * @returns Retorna el documento si se encuentra, de lo contrario lanza un error
     */
    getDocumentById(id) {
        const doc = documentRepository.findById(id);
        if (!doc) {
            throw new Error('Documento no encontrado'); // Manejo de errores
        }
        return doc;
    }

    /**
     * Crea un nuevo documento
     * @param {*} data Los datos del documento a crear
     * @returns Retorna el documento creado, de lo contrario lanza un error
     */
    createDocument(data) {
        if (!data.title || !data.workspace_id) {
            throw new Error('Faltan campos requeridos: title, workspace_id');
        }
        const newDoc = new Document(data.title, data.icon, data.workspace_id);
        return documentRepository.save(newDoc);
    }

    /**
     * Actualiza un documento existente
     * @param {*} id El ID del documento a actualizar
     * @param {*} updates Los campos a actualizar
     * @returns Retorna el documento actualizado, de lo contrario lanza un error
     */
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

    /**
     * Elimina un documento (soft delete)
     * @param {*} id El ID del documento a eliminar
     * @returns Retorna true si se elimina correctamente, de lo contrario lanza un error
     */
    deleteDocument(id) {
        const isDeleted = documentRepository.softDelete(id);
        if (!isDeleted) {
            throw new Error('Documento no encontrado');
        }
        return true;
    }
}

module.exports = new DocumentService();