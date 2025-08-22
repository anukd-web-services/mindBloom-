import mongoose from "mongoose"

const FriendSchema = new mongoose.Schema({
    friends: [
        {
            ProfileOfUser: { type: String, required: true },
            WatchingUser: { type: String, required: true },
            status: { type: String, enum: ['pending', 'accepted', 'rejected' , 'blocked' , 'none' , 'incoming'], default: 'none' },
            since: { type: Date, default: Date.now }
        }
    ]
});

export const Friend = mongoose.model('friend', FriendSchema);