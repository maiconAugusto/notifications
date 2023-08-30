import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: { type: 'string', required: true },
  body: { type: 'string', require: true },
  taskId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tasks',
  },
  date: { type: 'string', require: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: true
  },
  timeNotificationMobile: { type: 'string' },
  timeNotificationServerPush: { type: 'string' },
  read: { type: Boolean, default: false },
  sentNotification: { type: Boolean },
});

export default mongoose.model('notifications', notificationSchema);