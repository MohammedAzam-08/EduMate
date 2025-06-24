import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      validate: {
        validator: (v) => /^[A-Za-z\s]+$/.test(v),
        message: 'Full name can only contain letters and spaces',
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: 'Please enter a valid email address',
      },
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      validate: {
        validator: (v) => /^\d{10}$/.test(v),
        message: 'Mobile number must be exactly 10 digits',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
    },
    role: {
      type: String,
      enum: ['student', 'instructor'],
      default: 'student',
    },
  },
  { timestamps: true }
);

// Pre-save: lowercase email and hash password
userSchema.pre('save', async function (next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase().trim();
  }

  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
