const documentService = require('../services/documentService');

class DocumentController {
    /**
     * Obtiene un documento por su ID
     * @param {*} req Request object 
     * @param {*} res Response object
     */
    getOne(req, res) {
        try {
            const doc = documentService.getDocumentById(req.params.id);
            res.json(doc);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * Crea un nuevo documento
     * @param {*} req Request object
     * @param {*} res Response object
     */
    create(req, res) {
        try {
            const newDoc = documentService.createDocument(req.body);
            res.status(201).json(newDoc); 
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Actualiza un documento existente
     * @param {*} req Request object
     * @param {*} res Response object
     */
    update(req, res) {
        try {
            const updatedDoc = documentService.updateDocument(req.params.id, req.body);
            res.json(updatedDoc);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * Elimina un documento (soft delete)
     * @param {*} req Request object
     * @param {*} res Response object
     */
    delete(req, res) {
        try {
            documentService.deleteDocument(req.params.id);
            res.status(204).send(); 
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new DocumentController();