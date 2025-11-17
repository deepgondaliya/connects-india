const User = require('../models/User.model');
const UserDetail = require('../models/UserDetail.model');
const UserLikes = require('../models/UserLikes.model');
const UserRequests = require('../models/UserRequests.model');
const UserConnections = require('../models/UserConnections.model');
const mongoose = require('mongoose');

const getFeed = async (userId, userCity, userGender, cursor = null, limit = 20) => {
  const oppositeGender = userGender === 'Male' ? 'Female' : userGender === 'Female' ? 'Male' : null;
  if (!oppositeGender) throw new Error('Invalid gender');

  const cursorObj = cursor ? new mongoose.Types.ObjectId(cursor) : null;

  // Build excluded user IDs
  const [liked, sentReq, receivedReq, connections] = await Promise.all([
    UserLikes.find({ userId }).select('likedUserId'),
    UserRequests.find({ senderId: userId, status: 'pending' }).select('receiverId'),
    UserRequests.find({ receiverId: userId, status: 'pending' }).select('senderId'),
    UserConnections.find({
      $or: [{ connection1Id: userId }, { connection2Id: userId }],
    }),
  ]);

  const excludedIds = new Set();

  // Add liked
  liked.forEach(l => excludedIds.add(l.likedUserId.toString()));

  // Add sent requests
  sentReq.forEach(r => excludedIds.add(r.receiverId.toString()));

  // Add received requests
  receivedReq.forEach(r => excludedIds.add(r.senderId.toString()));

  // Add connections
  connections.forEach(c => {
    if (c.connection1Id.toString() !== userId.toString()) excludedIds.add(c.connection1Id.toString());
    if (c.connection2Id.toString() !== userId.toString()) excludedIds.add(c.connection2Id.toString());
  });

  // Add self
  excludedIds.add(userId.toString());

  const matchStage = {
    'details.city': userCity,
    'details.gender': oppositeGender,
    _id: {
      $nin: Array.from(excludedIds).map(id => new mongoose.Types.ObjectId(id)),
    },
  };

  if (cursorObj) {
    matchStage._id = { ...matchStage._id, $lt: cursorObj };
  }

  const pipeline = [
    {
      $lookup: {
        from: 'userdetails',
        localField: 'userDetailId',
        foreignField: '_id',
        as: 'details',
      },
    },
    { $unwind: '$details' },
    { $match: matchStage },
    { $sort: { _id: -1 } },
    { $limit: limit + 1 }, // +1 to check if more exist
    {
      $project: {
        id: '$_id',
        fullName: '$details.fullName',
        profileImage: '$details.profileImage',
        dateOfBirth: '$details.dateOfBirth',
        city: '$details.city',
      },
    },
  ];

  const result = await User.aggregate(pipeline);

  const hasMore = result.length > limit;
  const profiles = hasMore ? result.slice(0, limit) : result;

  const nextCursor = hasMore ? profiles[profiles.length - 1].id : null;

  // Calculate age
  const formatted = profiles.map(p => ({
    ...p,
    age: p.dateOfBirth
      ? Math.floor((Date.now() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
      : null,
  }));

  return { profiles: formatted, nextCursor };
};

module.exports = { getFeed };