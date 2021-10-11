const User = require("../models/user");

// const filter = { isVerified: true };
// User.find(filter).then((user) => {
//   console.log(user);
// });
// console.log(users);
const getAllEmails = async function () {
  const filter = { isVerified: true };
  const docList = await User.find(filter);
  const emails = docList.map((doc) => doc.email);
  console.log(emails);
  return emails;
};

getAllEmails();
