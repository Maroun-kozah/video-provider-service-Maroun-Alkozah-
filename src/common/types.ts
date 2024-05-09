import { Schema } from 'mongoose';

//User Request
interface User {
  _id: Schema.Types.ObjectId;
  dateOfBirth: Date;
}

export class UserRequest extends Request {
  user: User;
  dateOfBirth?: Date;
}
