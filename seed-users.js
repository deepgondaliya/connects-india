const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./src/config/database');
const User = require('./src/models/User.model');
const UserDetail = require('./src/models/UserDetail.model');

connectDB();

const users = [
  {"fullName":"Priya Sharma","gender":"Female","city":"Surat","dateOfBirth":"1998-03-15","profileImage":"https://randomuser.me/api/portraits/women/1.jpg"},
  {"fullName":"Anjali Patel","gender":"Female","city":"Surat","dateOfBirth":"1997-07-22","profileImage":"https://randomuser.me/api/portraits/women/2.jpg"},
  {"fullName":"Neha Singh","gender":"Female","city":"Surat","dateOfBirth":"1999-01-10","profileImage":"https://randomuser.me/api/portraits/women/3.jpg"},
  {"fullName":"Riya Gupta","gender":"Female","city":"Surat","dateOfBirth":"1996-11-30","profileImage":"https://randomuser.me/api/portraits/women/4.jpg"},
  {"fullName":"Kajal Mehta","gender":"Female","city":"Surat","dateOfBirth":"2000-05-18","profileImage":"https://randomuser.me/api/portraits/women/5.jpg"},
  {"fullName":"Sneha Desai","gender":"Female","city":"Surat","dateOfBirth":"1998-09-25","profileImage":"https://randomuser.me/api/portraits/women/6.jpg"},
  {"fullName":"Pooja Verma","gender":"Female","city":"Surat","dateOfBirth":"1997-12-08","profileImage":"https://randomuser.me/api/portraits/women/7.jpg"},
  {"fullName":"Aarti Joshi","gender":"Female","city":"Surat","dateOfBirth":"1999-04-14","profileImage":"https://randomuser.me/api/portraits/women/8.jpg"},
  {"fullName":"Divya Shah","gender":"Female","city":"Surat","dateOfBirth":"1996-08-03","profileImage":"https://randomuser.me/api/portraits/women/9.jpg"},
  {"fullName":"Isha Thakur","gender":"Female","city":"Surat","dateOfBirth":"2001-02-27","profileImage":"https://randomuser.me/api/portraits/women/10.jpg"},
  {"fullName":"Tanya Rao","gender":"Female","city":"Surat","dateOfBirth":"1998-06-19","profileImage":"https://randomuser.me/api/portraits/women/11.jpg"},
  {"fullName":"Simran Kaur","gender":"Female","city":"Surat","dateOfBirth":"1997-10-05","profileImage":"https://randomuser.me/api/portraits/women/12.jpg"},
  {"fullName":"Aditi Mishra","gender":"Female","city":"Surat","dateOfBirth":"1999-03-21","profileImage":"https://randomuser.me/api/portraits/women/13.jpg"},
  {"fullName":"Nidhi Yadav","gender":"Female","city":"Surat","dateOfBirth":"2000-07-11","profileImage":"https://randomuser.me/api/portraits/women/14.jpg"},
  {"fullName":"Kirti Jain","gender":"Female","city":"Surat","dateOfBirth":"1996-01-29","profileImage":"https://randomuser.me/api/portraits/women/15.jpg"},
  {"fullName":"Rahul Sharma","gender":"Male","city":"Surat","dateOfBirth":"1995-04-12","profileImage":"https://randomuser.me/api/portraits/men/1.jpg"},
  {"fullName":"Vikram Singh","gender":"Male","city":"Surat","dateOfBirth":"1994-08-25","profileImage":"https://randomuser.me/api/portraits/men/2.jpg"},
  {"fullName":"Arjun Patel","gender":"Male","city":"Surat","dateOfBirth":"1996-11-18","profileImage":"https://randomuser.me/api/portraits/men/3.jpg"},
  {"fullName":"Rohan Mehta","gender":"Male","city":"Surat","dateOfBirth":"1997-02-14","profileImage":"https://randomuser.me/api/portraits/men/4.jpg"},
  {"fullName":"Karan Desai","gender":"Male","city":"Surat","dateOfBirth":"1995-09-30","profileImage":"https://randomuser.me/api/portraits/men/5.jpg"},
  {"fullName":"Aman Verma","gender":"Male","city":"Surat","dateOfBirth":"1998-05-07","profileImage":"https://randomuser.me/api/portraits/men/6.jpg"},
  {"fullName":"Siddharth Joshi","gender":"Male","city":"Surat","dateOfBirth":"1994-12-22","profileImage":"https://randomuser.me/api/portraits/men/7.jpg"},
  {"fullName":"Yash Shah","gender":"Male","city":"Surat","dateOfBirth":"1996-03-09","profileImage":"https://randomuser.me/api/portraits/men/8.jpg"},
  {"fullName":"Nikhil Thakur","gender":"Male","city":"Surat","dateOfBirth":"1997-07-16","profileImage":"https://randomuser.me/api/portraits/men/9.jpg"},
  {"fullName":"Ravi Rao","gender":"Male","city":"Surat","dateOfBirth":"1995-10-28","profileImage":"https://randomuser.me/api/portraits/men/10.jpg"},
  {"fullName":"Deepak Kaur","gender":"Male","city":"Surat","dateOfBirth":"1998-01-04","profileImage":"https://randomuser.me/api/portraits/men/11.jpg"},
  {"fullName":"Ajay Mishra","gender":"Male","city":"Surat","dateOfBirth":"1996-06-20","profileImage":"https://randomuser.me/api/portraits/men/12.jpg"},
  {"fullName":"Vivek Yadav","gender":"Male","city":"Surat","dateOfBirth":"1994-09-11","profileImage":"https://randomuser.me/api/portraits/men/13.jpg"},
  {"fullName":"Rajat Jain","gender":"Male","city":"Surat","dateOfBirth":"1997-12-01","profileImage":"https://randomuser.me/api/portraits/men/14.jpg"},
  {"fullName":"Sumit Agarwal","gender":"Male","city":"Surat","dateOfBirth":"1995-04-27","profileImage":"https://randomuser.me/api/portraits/men/15.jpg"},
  {"fullName":"Meera Kapoor","gender":"Female","city":"Surat","dateOfBirth":"1999-08-14","profileImage":"https://randomuser.me/api/portraits/women/16.jpg"},
  {"fullName":"Shreya Reddy","gender":"Female","city":"Surat","dateOfBirth":"1997-11-06","profileImage":"https://randomuser.me/api/portraits/women/17.jpg"},
  {"fullName":"Kavya Nair","gender":"Female","city":"Surat","dateOfBirth":"2000-02-19","profileImage":"https://randomuser.me/api/portraits/women/18.jpg"},
  {"fullName":"Sanya Malhotra","gender":"Female","city":"Surat","dateOfBirth":"1998-05-23","profileImage":"https://randomuser.me/api/portraits/women/19.jpg"},
  {"fullName":"Riddhi Trivedi","gender":"Female","city":"Surat","dateOfBirth":"1996-10-15","profileImage":"https://randomuser.me/api/portraits/women/20.jpg"},
  {"fullName":"Akash Kumar","gender":"Male","city":"Surat","dateOfBirth":"1995-03-28","profileImage":"https://randomuser.me/api/portraits/men/16.jpg"},
  {"fullName":"Pratik Solanki","gender":"Male","city":"Surat","dateOfBirth":"1997-06-17","profileImage":"https://randomuser.me/api/portraits/men/17.jpg"},
  {"fullName":"Harsh Vyas","gender":"Male","city":"Surat","dateOfBirth":"1994-09-04","profileImage":"https://randomuser.me/api/portraits/men/18.jpg"},
  {"fullName":"Dhruvin Soni","gender":"Male","city":"Surat","dateOfBirth":"1998-01-30","profileImage":"https://randomuser.me/api/portraits/men/19.jpg"},
  {"fullName":"Jayesh Pandya","gender":"Male","city":"Surat","dateOfBirth":"1996-07-25","profileImage":"https://randomuser.me/api/portraits/men/20.jpg"}
];

const seed = async () => {
  await User.deleteMany({});
  await UserDetail.deleteMany({});

  for (let i = 0; i < users.length; i++) {
    const phoneNumber = `+91${9000000000 + i}`;
    const user = await User.create({ phoneNumber });
    const detail = await UserDetail.create({
      fullName: users[i].fullName,
      gender: users[i].gender,
      city: users[i].city,
      dateOfBirth: users[i].dateOfBirth,
      religion: "Hindu",
      status: "Unmarried",
      preferredLanguage: "Hindi",
      profileImage: users[i].profileImage,
    });
    user.userDetailId = detail._id;
    await user.save();
    console.log(`Created: ${users[i].fullName}`);
  }
  console.log("60 users seeded!");
  process.exit();
};

seed();