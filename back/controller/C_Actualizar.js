import express from 'express';
import { ActualizarModelo } from '../modelo/Actualizar.js';
import cors from 'cors'; // Importa el paquete 'cors'

export class C_Actualizar {
    constructor(mongoURI, dbName, collectionName, puerto) {
        this.app = express();
        this.actualizarModelo = new ActualizarModelo(mongoURI, dbName, collectionName);
        this.puerto = puerto;

        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        // Usa el middleware 'cors' en todas las rutas
        this.app.use(cors());

        this.app.put('/api/actualizar', async (req, res) => {
            try {
                const { Documento, ...nuevosDatos } = req.body;
                const modifiedCount = await this.actualizarModelo.actualizar(Documento, nuevosDatos);
                res.send({ modifiedCount });
            } catch (error) {
                console.error(error);
                res.status(500).send('Error interno del servidor');
            }
        });

        this.app.listen(this.puerto, () => {
            console.log(`Servidor de actualización escuchando en el puerto ${this.puerto}`);
        });
    }
}
