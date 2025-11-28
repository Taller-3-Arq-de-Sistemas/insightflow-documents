const { v4: uuidv4 } = require('uuid');

/**
 * Modelo Document
 * Representa un documento dentro de un espacio de trabajo.
 *
 * Propiedades:
 * - id: UUID generado automáticamente.
 * - title: Título del documento.
 * - content: Contenido estructurado del documento (objeto).
 * - workspace_id: ID del workspace al que pertenece.
 * - is_deleted: Indicador lógico de borrado (soft-delete).
 * - created_at: Fecha de creación.
 */
class Document {
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