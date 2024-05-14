import { MongoClient } from "mongodb";

export class ActualizarModelo {
    constructor(mongoURI, dbName, collectionName) {
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.mongoURI = mongoURI;
    }

    async actualizar(documento, nuevosDatos) {
        try {
            const client = await MongoClient.connect(this.mongoURI);
            const db = client.db(this.dbName);
            const collection = db.collection(this.collectionName);
            
            const result = await collection.updateOne(
                { Documento: documento }, 
                { $set: nuevosDatos }
            );
            
            client.close();
            return result.modifiedCount;
        } catch (error) {
            console.error(error);
            throw new Error('Error interno del servidor');
        }
    }
}
