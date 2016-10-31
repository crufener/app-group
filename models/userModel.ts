import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export interface IUser extends mongoose.Document {
    username: string,
    email: string,
    password: string,
    admin: boolean
}

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Must have a username'],
        minlength: [3, 'Your username must be 3 or more characters long'],
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    passwordHash: String,
    salt: String,
    admin: {
        type: Boolean,
        default: false,
        required: true
    }
});
/** Set the password */
UserSchema.method('setPassword', function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
});
/** authenticate credentials/password */
UserSchema.method('validatePassword', function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return (hash === this.passwordHash);
});
/** grant an access token */
UserSchema.method('generateJWT', function() {
  return jwt.sign({
    id: this._id,
    username: this.username,
    email: this.email
  }, 'SecretKey');
});

export default mongoose.model<IUser>('User', UserSchema);
