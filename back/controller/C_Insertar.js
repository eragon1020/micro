import express from 'express';
import bodyParser from 'body-parser';
import { InsertarModelo } from '../modelo/Insertar.js';
import cors from 'cors'; // Importa el paquete 'cors'

export class C_Insertar {
    constructor(mongoURI, dbName, collectionName, puerto) {
        this.app = express();
        this.insertarModelo = new InsertarModelo(mongoURI, dbName, collectionName);
        this.puerto = puerto;

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        // Usa el middleware 'cors' en todas las rutas
        this.app.use(cors());

        this.app.post('/api/insertar', async (req, res) => {
            try {
                const insertedId = await this.insertarModelo.insertar(req.body);
                res.send({ id: insertedId });
            } catch (error) {
                console.error(error);
                res.status(500).send('Error interno del servidor');
            }
        });

        this.app.listen(this.puerto, () => {
            console.log(`Servidor de inserción escuchando en el puerto ${this.puerto}`);
        });
    }
}
