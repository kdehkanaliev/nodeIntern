import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
    },
    password: { type: String, minlength: 3, required: true },
    email: {
      type: String,
      minlength: 3,
      required: true,
      unique: ["email oldin ishlatilgan", true],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

usersSchema.pre("save", async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usersSchema.methods.checkHash = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model("users", usersSchema);
