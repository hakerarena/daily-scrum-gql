import {
  Collection,
  InsertOneResult,
  InsertManyResult,
  MongoError,
  Document,
  OptionalUnlessRequiredId,
  InsertOneOptions,
  UpdateResult,
  DeleteResult,
  Filter,
  UpdateFilter,
  FindOptions,
  WithId,
  UpdateOptions,
  DeleteOptions,
  AggregateOptions,
  BulkWriteOptions,
  Db,
} from "mongodb";
import { MongoDbClient } from "./connection";

export abstract class MongoCore<T extends Document = Document> {
  protected db: Db;
  protected collection: Collection<T>;

  constructor(collectionName: string) {
    this.db = MongoDbClient.getInstance().getDb();
    this.collection = this.db.collection(collectionName);
  }

  get getCollection(): Collection<T> {
    return this.collection;
  }

  protected async retryOperation<R>(
    operation: () => Promise<R>,
    retries: number = 3
  ): Promise<R> {
    let attempts = 0;
    while (attempts < retries) {
      try {
        return await operation();
      } catch (error) {
        if (error instanceof MongoError && attempts < retries - 1) {
          attempts++;
          console.warn(`Retrying operation... Attempt ${attempts + 1}`);
        } else {
          throw error;
        }
      }
    }
    throw new Error("Operation failed after maximum retries");
  }

  async insertOne(
    document: OptionalUnlessRequiredId<T>,
    options?: InsertOneOptions
  ): Promise<InsertOneResult<T>> {
    return await this.retryOperation(() =>
      this.collection.insertOne(document, options)
    );
  }

  async insertMany(
    documents: OptionalUnlessRequiredId<T>[],
    options?: BulkWriteOptions
  ): Promise<InsertManyResult<T>> {
    return await this.retryOperation(() =>
      this.collection.insertMany(documents, options)
    );
  }

  async find(
    filter: Filter<T>,
    options?: FindOptions<T>
  ): Promise<WithId<T>[]> {
    return await this.retryOperation(() =>
      this.collection.find(filter, options).toArray()
    );
  }

  async findOne(
    filter: Filter<T>,
    options?: FindOptions<T>
  ): Promise<WithId<T> | null> {
    return await this.retryOperation(() =>
      this.collection.findOne(filter, options)
    );
  }

  async updateOne(
    filter: Filter<T>,
    update: UpdateFilter<T>,
    options?: UpdateOptions
  ): Promise<UpdateResult> {
    return await this.retryOperation(() =>
      this.collection.updateOne(filter, update, options)
    );
  }

  async updateMany(
    filter: Filter<T>,
    update: UpdateFilter<T>,
    options?: UpdateOptions
  ): Promise<UpdateResult> {
    return await this.retryOperation(() =>
      this.collection.updateMany(filter, update, options)
    );
  }

  async deleteOne(
    filter: Filter<T>,
    options?: DeleteOptions
  ): Promise<DeleteResult> {
    return await this.retryOperation(() =>
      this.collection.deleteOne(filter, options)
    );
  }

  async deleteMany(
    filter: Filter<T>,
    options?: DeleteOptions
  ): Promise<DeleteResult> {
    return await this.retryOperation(() =>
      this.collection.deleteMany(filter, options)
    );
  }

  async aggregate<T extends Document>(
    pipeline: Document[],
    options?: AggregateOptions
  ): Promise<T[]> {
    return await this.retryOperation(() =>
      this.collection.aggregate<T>(pipeline, options).toArray()
    );
  }
}
