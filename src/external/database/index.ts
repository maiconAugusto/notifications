import mongoose, { Mongoose } from 'mongoose';
import enviroments from '../../core/environment';

class Database {
  private url: string;

  constructor() {
    this.url = enviroments.MONGO_DATABASE || '';
    this.databaseConnection();
  }

  public databaseConnection(): Promise<Mongoose> {
    // @ts-ignore
  
    return mongoose.connect("mongodb+srv://sistemamg:IAckbJxUwgpXgsox@cluster0.vctr8.mongodb.net/teste", {
      useNewUrlParser: true
    })
      .then(() => {
        console.log("success mongo")
        require('./schema/user_schema')
      }).catch(() => {
        console.log("error mongo")
      })
  }
}
export default new Database();
