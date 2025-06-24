import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderName: { type: String, required: true },       // email or unique name
  senderRole: { type: String, required: true },       // "instructor" or "student"
  recipientName: { type: String, required: true },    // email or unique name
  messageText: { type: String, required: true },
  courseId: { type: String },                         // optional
}, { timestamps: true }); // adds createdAt and updatedAt

const Message = mongoose.model("Message", messageSchema);
export default Message;
