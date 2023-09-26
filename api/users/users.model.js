const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = Schema({
    name : String,
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: isEmail,
            message: (props) => `${props} is not a valid email address`,
        }
        // validate(email) {
        //     return email.includes("@");
        // }
    },
    date: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        // enum: ["admin", "member"],
        enum: {
            values: ["admin", "member"],
            message: '{VALUE} is not a valid role',
        },
    },
    age: Number,
});

/*userSchema.pre('save', function() {
    await Promise.resolve();
    if (!this.email) {
        const error = new Error("Mon message");
        next(error);
    }
    next();
});*/

/*userSchema.pre('save', async function() {
    if (!this.email) {
        throw new Error("Mon message");
    }
});*/

userSchema.pre('save', async function() {
    this.email= this.email.toLowerCase();
});

userSchema.pre('save', async function() {
    this.password= await bcrypt.hash(this.password, 10);
});

module.exports = model ('User', userSchema);