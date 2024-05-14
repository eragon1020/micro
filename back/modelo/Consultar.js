import { MongoClient } from 'mongodb';

export class ConsultarModelo {
    constructor(mongoURI, dbName, collectionName) {
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.mongoURI = mongoURI;
    }

    async consultar(filtro) {
        try {
            const client = await MongoClient.connect(this.mongoURI);
            const db = client.db(this.dbName);
            const collection = db.collection(this.collectionName);
            
            const result = await collection.findOne(filtro);
            
            client.close();
            return result;
        } catch (error) {
            console.error('Error al consultar:', error);
            throw new Error('Error interno del servidor');
        }
    }
}
