const User = require("../model/user");
const bcrypt = require("bcryptjs");

const addUser = async (body) => {
  return validate(body)
    .then(() => {
      return;
    })
    .then(() => {
      return checkIfEmailAlreadyExists(body.email);
    })
    .then(() => {
      return saveUser(body);
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

const checkIfEmailAlreadyExists = async (email) => {
  const value = await findUserByEmail(email);
  if (value) {
    console.log("Email already registered");
    throw new Error("User with email already exists. Proceed to login!!");
  } else {
    return;
  }
};

const saveUser = async (body) => {
  encryptedPassword = await bcrypt.hash(body.password, 10);
  const user = new User({
    name: body.name,
    address: body.address,
    date_of_birth: body.date_of_birth,
    email: body.email,
    password: encryptedPassword,
    roles: body.roles,
  });

  await user.save();
  return "User saved successfully";
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const validate = async (data) => {
  if (!(data.email && data.password && data.name && data.roles)) {
    console.log("Validation failed");
    throw new Error("Name, Email , Role and Password are required");
  }
  console.log("Validation Passed");
  return;
};

const findAll = async () => {
  return await User.find({});
};

const findById = async (id) => {
  return User.findOne({ _id: id }).then((user) => {
    if (user) {
      return user;
    } else {
      console.log("User not found for id : " + id);
      throw new Error("User not found");
    }
  });
};

const deleteById = async (id) => {
  return findById(id)
    .then((user) => {
      return user;
    })
    .then((user) => {
      return User.findOneAndDelete({ _id: id });
    })
    .then((data) => {
      console.log(data);
      return "Deleted Successfully";
    })
    .catch((err) => {
      throw err;
    });
};

const updateUser = async (id, toUpdate) => {
  return findById(id)
    .then((user) => {
      return;
    })
    .then(() => {
      return User.findOneAndUpdate(id, toUpdate);
    })
    .then(() => {
      return "User updated Successfully";
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  addUser,
  findAll,
  findById,
  deleteById,
  updateUser,
  findUserByEmail,
};
