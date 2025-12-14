# InsightFlow - Documents Service

Este repositorio consiste a un microservicio encargado de la gestión de documentos, notas y páginas colaborativas para la plataforma InsightFlow. Este servicio permite la creación, edición en tiempo real y eliminación lógica (SOFTDELETE) de contenido estructurado.

* **Ignacio Jesús Bugueño Madrigal** | 21.267.231-9

## Arquitectura y Patrón de Diseño
Este proyecto implementa una **Arquitectura en Capas (Layered Architecture)**, utilizando el patrón de diseño **Controller-Service-Repository** para asegurar la separación de responsabilidades, mantenibilidad y escalabilidad del código.

### Estructura del Proyecto:
* **📂 Controllers (`src/controllers`):** Capa encargada de manejar las peticiones HTTP (Request/Response) y códigos de estado. No contiene lógica de negocio.
* **📂 Services (`src/services`):** Capa que contiene la lógica de negocio y validaciones. Es el intermediario entre el controlador y los datos.
* **📂 Repositories (`src/repositories`):** Capa de acceso a datos. Maneja la persistencia en memoria (Array) y simula las operaciones de base de datos.
* **📂 Models (`src/models`):** Define la estructura y atributos de la entidad `Document`.

## Tecnologías Utilizadas
* **Lenguaje:** Node.js (v18)
* **Framework Web:** Express.js
* **Containerización:** Docker
* **CI/CD:** GitHub Actions
* **Despliegue:** Render
* **Control de Versiones:** Git (Conventional Commits)

## Endpoints de la API
El servicio expone los siguientes recursos:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| **POST** | `/documents` | Crea un nuevo documento. Requiere `title` y `workspace_id`. Genera un UUID v4. |
| **GET** | `/documents/:id` | Obtiene el detalle y contenido JSON de un documento activo. |
| **PATCH** | `/documents/:id` | Actualiza el contenido (bloques JSON), título o icono del documento. |
| **DELETE**| `/documents/:id` | Realiza un **Soft Delete** (marcado lógico), preservando la trazabilidad. |

**URL Base en Producción:** `https://insightflow-documents-y31i.onrender.com` 

## Instalación y Ejecución Local

Sigue estos pasos para correr el proyecto en tu máquina:

### 1. Prerrequisitos
* Node.js instalado.
* Git instalado.

### 2. Clonar el repositorio
```bash
git clone https://github.com/Taller-3-Arq-de-Sistemas/insightflow-documents.git
cd insightflow-documents
```

### 3. Instalar dependencias
```bash
npm install
```

### 4. Ejecutar el servidor (Modo Desarrollo)
```bash
npm run dev
```
En tu terminal se indicará "Servidor corriendo en el puerto XXXX"

## Ejecución con Docker

Para probar el contenedor localmente antes de desplegar:

### 1. Construir la imagen
```bash
docker build -t insightflow-documents .
```

### 2. Correr el contenedor (mapeando puerto 3003)
```bash
docker run -p 3003:3003 insightflow-documents
```

## Pruebas (Postman)

Se adjunta en la raíz del repositorio el archivo `InsightFlow - Documents.postman_collection.json` que contiene las peticiones configuradas para probar todos los endpoints del servicio.

## Flujo de Pruebas Recomendado

Aunque se incluye una colección de Postman, puedes seguir estos pasos manuales para verificar el ciclo de vida completo (CRUD) de un documento.

### 1. Crear Documento (POST)
* **Endpoint:** `POST /documents`
* **Acción:** Enviar un JSON con los datos requeridos.
* **Importante:** El `workspace_id` **debe ser un UUID válido existente** en el servicio de Workspaces. Puedes obtener uno real consultando `https://insightflow-workspaces.onrender.com/api/workspaces`.
* **Cuerpo (JSON):**
  ```json
  {
    "title": "Documento de Especificaciones",
    "icon": "📝",
    "workspace_id": "1231d229-c079-4a00-a931-5751498f18c9 (UUID VÁLIDO)"
  }

* **Resultado Esperado:** Un código `201 Created` y un objeto JSON que incluye el nuevo `id` generado. **Nota:** Copia este `id` para los siguientes pasos.

### 2. Leer Documento (GET)
* **Endpoint:** `GET /documents/{id}`
* **Acción:** Reemplaza `{id}` en la URL por el ID que copiaste en el paso anterior.
* **Resultado Esperado:** Un código `200 OK` mostrando el documento completo con su contenido inicial (JSON vacío o por defecto) y `is_deleted: false`.

### 3. Actualizar Contenido (PATCH)
* **Endpoint:** `PATCH /documents/{id}`
* **Acción:** Enviar actualizaciones de contenido o metadatos.
* **Cuerpo (JSON):**
  ```json
  {
    "title": "Documento Actualizado",
    "content": {
    "ops": [
      { "insert": "Texto agregado durante la prueba.\n" }
    ]
  }
* **Resultado Esperado:** Un código `200 OK` devolviendo el documento con el `title` y `content` modificados.

### 4. Eliminar Documento (Soft Delete)
* **Endpoint:** `DELETE /documents/{id}`
* **Acción:** Enviar la petición DELETE al mismo ID.
* **Resultado Esperado:** Un código `204 No Content` (sin cuerpo de respuesta).

### 5. Verificar Soft Delete
* **Endpoint:** `GET /documents/{id}`
* **Acción:** Intentar leer nuevamente el documento borrado.
* **Resultado Esperado:** Un código `404 Not Found`, confirmando que el documento ya no es accesible, aunque sigue existiendo físicamente en la memoria con la bandera `is_deleted: true`.
