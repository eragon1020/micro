import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import { C_Consultar } from './controller/C_Consultar.js';
import { C_Insertar } from './controller/C_Insertar.js';
import { C_Actualizar } from './controller/C_Actualizar.js';
import { C_Eliminar } from './controller/C_Eliminar.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const puertoPrincipal = 3000;
const mongoURI = 'mongodb+srv://ambidata2024:ambidata2024**@ambidata.vn0dlbx.mongodb.net/';
const collectionName = 'UsuariosM';
const dbName = 'ambidata';

MongoClient.connect(mongoURI, (err, client) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');

    const consultarController = new C_Consultar();
    const insertarController = new C_Insertar();
    const actualizarController = new C_Actualizar();
    const eliminarController = new C_Eliminar();

    consultarController.iniciar(app, client, puertoPrincipal);
    insertarController.iniciar(app, client, puertoPrincipal);
    actualizarController.iniciar(app, client, puertoPrincipal);
    eliminarController.iniciar(app, client, puertoPrincipal);

    app.listen(puertoPrincipal, () => {
        console.log(`Servidor principal escuchando en el puerto ${puertoPrincipal}`);
    });
});
