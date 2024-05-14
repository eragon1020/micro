import express from 'express';
import bodyParser from 'body-parser';
import { EliminarModelo } from '../modelo/Eliminar.js';
import cors from 'cors'; // Importa el paquete 'cors'

export class C_Eliminar {
    constructor(mongoURI, dbName, collectionName, puerto) {
        this.app = express();
        this.eliminarModelo = new EliminarModelo(mongoURI, dbName, collectionName);
        this.puerto = puerto;

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        // Usa el middleware 'cors' en todas las rutas
        this.app.use(cors());

        this.app.delete('/api/eliminar/:documento', async (req, res) => {
            try {
                const documento = req.params.documento;
                const deletedCount = await this.eliminarModelo.eliminar(documento);
                res.send({ deletedCount });
            } catch (error) {
                console.error(error);
                res.status(500).send('Error interno del servidor');
            }
        });

        this.app.listen(this.puerto, () => {
            console.log(`Servidor de eliminación escuchando en el puerto ${this.puerto}`);
        });
    }
}
