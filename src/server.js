const express = require('express');
const cors = require('cors');
const documentRoutes = require('./routes/documentRoutes');

const app = express();
const PORT = process.env.PORT || 3100; 

// Middleware
app.use(cors()); 
app.use(express.json());

// Rutas
app.use('/documents', documentRoutes);

// Ruta de salud del servicio
app.get('/health', (req, res) => res.send('Servicio de Documentos en funcionamiento'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});