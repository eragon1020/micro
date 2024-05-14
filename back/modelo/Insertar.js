import { MongoClient } from "mongodb";

export class InsertarModelo {
    constructor(mongoURI, dbName, collectionName) {
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.mongoURI = mongoURI;
    }

    async insertar(datos) {
        try {
            const client = await MongoClient.connect(this.mongoURI);
            const db = client.db(this.dbName);
            const collection = db.collection(this.collectionName);
            const result = await collection.insertOne(datos);
            
            client.close();
            return result.insertedId;
        } catch (error) {
            console.error(error);
            throw new Error('Error interno del servidor');
        }
    }
}
