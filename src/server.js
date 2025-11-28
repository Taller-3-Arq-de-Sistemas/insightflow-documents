const express = require('express');
const cors = require('cors');
const documentRoutes = require('./routes/documentRoutes');

const app = express();
const PORT = process.env.PORT || 3100; 

app.use(cors()); 
app.use(express.json());

app.use('/documents', documentRoutes);

app.get('/health', (req, res) => res.send('Servicio de Documentos en funcionamiento'));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});