const documentService = require('../services/documentService');

class DocumentController {
    
    getOne(req, res) {
        try {
            const doc = documentService.getDocumentById(req.params.id);
            res.json(doc);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    create(req, res) {
        try {
            const newDoc = documentService.createDocument(req.body);
            res.status(201).json(newDoc); // 201 Created
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    update(req, res) {
        try {
            const updatedDoc = documentService.updateDocument(req.params.id, req.body);
            res.json(updatedDoc);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    delete(req, res) {
        try {
            documentService.deleteDocument(req.params.id);
            res.status(204).send(); // 204 No Content (Correcto para delete)
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new DocumentController();