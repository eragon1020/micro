import { MongoClient } from "mongodb";

export class EliminarModelo {
    constructor(mongoURI, dbName, collectionName) {
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.mongoURI = mongoURI;
    }

    async eliminar(documento) {
        try {
            const client = await MongoClient.connect(this.mongoURI);
            const db = client.db(this.dbName);
            const collection = db.collection(this.collectionName);

            const result = await collection.deleteOne({ Documento: documento });

            client.close();
            return result.deletedCount;
        } catch (error) {
            console.error(error);
            throw new Error('Error interno del servidor');
        }
    }
}
