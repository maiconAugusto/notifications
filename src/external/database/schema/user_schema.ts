import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  name: { type: 'string', require: true },
  gender: { type: 'string' },
  password: { type: 'string', require: true },
  email: { type: 'string', require: true, unique: true },
  active: { type: Boolean, default: true },
  created: { type: 'string' },
  recipient:{ type: 'string' },
});

export default mongoose.model('users', usersSchema);
