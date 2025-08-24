import mongoose from "mongoose"

const FriendSchema = new mongoose.Schema({
    friends: [
        {
            ProfileOfUser: { type: String, required: true },
            WatchingUser: { type: String, required: true },
            status: { type: String, enum: ['pending', 'friends', 'blocked' , 'incoming']},
            since: { type: Date, default: Date.now }
        }
    ]
});

export const Friend = mongoose.model('friend', FriendSchema);