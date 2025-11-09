const UserChat = require('../models/UserChat.model');

const sendMessage = async (senderId, receiverId, message) => {
  const chat = await UserChat.create({
    senderId,
    receiverId,
    message,
  });

  return chat;
};

const getChatHistory = async (loggedInUserId, otherUserId) => {
  const messages = await UserChat.find({
    $or: [
      { senderId: loggedInUserId, receiverId: otherUserId },
      { senderId: otherUserId, receiverId: loggedInUserId },
    ],
  })
    .sort({ createdAt: 1 })
    .select('senderId receiverId message createdAt')
    .lean();

  return messages;
};

module.exports = { sendMessage, getChatHistory };