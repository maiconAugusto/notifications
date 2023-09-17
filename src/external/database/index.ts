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
  
    return mongoose.connect("mongodb+srv://apitask:j5X8ntbbMfP3oS5O@taskapp.q9crxam.mongodb.net/taskapp?retryWrites=true&w=majority", {
      useUnifiedTopology: true
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
