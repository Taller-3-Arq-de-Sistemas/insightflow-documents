const { v4: uuidv4 } = require('uuid');

class Document {
    /**
     * Modelo de Documento
     * @param {*} title El título del documento
     * @param {*} icon El ícono del documento
     * @param {*} workspaceId El ID del workspace al que pertenece el documento
     */
    constructor(title, icon, workspaceId) {
        this.id = uuidv4(); 
        this.title = title;
        this.icon = icon || "📄";
        this.content = {}; 
        this.workspace_id = workspaceId;
        this.is_deleted = false; 
        this.created_at = new Date();
    }
}

module.exports = Document;