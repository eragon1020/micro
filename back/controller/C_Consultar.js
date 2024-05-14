import express from 'express';
import bodyParser from 'body-parser';
import { ConsultarModelo } from '../modelo/Consultar.js';
import cors from 'cors'; // Importa el paquete 'cors'

export class C_Consultar {
    constructor(mongoURI, dbName, collectionName, puerto) {
        this.app = express();
        this.consultarModelo = new ConsultarModelo(mongoURI, dbName, collectionName);
        this.puerto = puerto;

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        // Usa el middleware 'cors' en todas las rutas
        this.app.use(cors());

        this.app.post('/api/consultar', async (req, res) => {
            try {
                console.log('Recibida solicitud de consulta:', req.body);
                const resultadoConsulta = await this.consultarModelo.consultar(req.body);
                console.log('Resultado de la consulta:', resultadoConsulta);
                res.send(resultadoConsulta);
            } catch (error) {
                console.error('Error al consultar:', error);
                res.status(500).send('Error interno del servidor');
            }
        });

        this.app.listen(this.puerto, () => {
            console.log(`Servidor de consulta escuchando en el puerto ${this.puerto}`);
        });
    }
}
