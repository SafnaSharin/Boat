const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    // id:{type:Number, required:true},
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact: { type: Number, required: true },
    role:{type: String,required:true},
    image:{type: String,required:true},
    location:{type: String,required:true},
    tokens: { type: String, default: '' },
});
adminSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
      // Only hash the password if it's not already hashed
      if (!this.password.startsWith('$2b$')) {
        try {
          const hashedPassword = await bcrypt.hash(this.password, 10);
          this.password = hashedPassword;
          next();
        } catch (error) {
          return next(error);
        }
      } else {
        return next();
      }
    } else {
      return next();
    }
  });
const adminModel = mongoose.model('adminModel', adminSchema);

module.exports = adminModel;
