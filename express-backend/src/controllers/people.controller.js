import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { Friend } from "../models/friends.model.js";

const getPeopleFriendshipStatus = asyncHandler(async (req, res) => {
    const personProfilePersonId = req.params.id;
    // const user = req.user.id
    const user = req.params.id2;
    let userItself;
    let loggedin;
    let finder;
    let friends;

    if (personProfilePersonId == user) {
        userItself = true
    }
    else {
        userItself = false
    }

    if (!user) {
        loggedin = false;
    }
    else {
        loggedin = true;
    }

    if (!personProfilePersonId) {
        throw new ApiError(400, "Person ID is required");
    }

    if (loggedin) {
        finder = await Friend.find({ ProfileOfUser: personProfilePersonId, WatchingUser: user })
    }

    if (loggedin === false) {
        friends = "none"
    }
    else if (finder.length === 0) {
        friends = "none"
    }
    else {
        friends = finder[0];
    }

    res.status(200)
        .json(new ApiResponse(200, { friends: friends, userThemself: userItself }, "Friendship status fetched successfully"));

})

const friendshipStuff = asyncHandler(async (req, res) => {
    const personProfilePersonId = req.params.id;
    // const user = req.user.id
    const user = req.params.id2;

    const currentToDo = req.body.currentToDo;

    let newFriendProfile;
    let whatIDid;

    if (currentToDo == 'new') {
        newFriendProfile = await Friend.create({
            ProfileOfUser: personProfilePersonId,
            WatchingUser: user,
            status: 'pending'
        })
        whatIDid = 'sentFR'
    }
    
    else if (currentToDo == 'sendFR') {
        await Friend.findOneAndUpdate({ ProfileOfUser: personProfilePersonId, WatchingUser: user }, { status: 'pending' })
        whatIDid = 'sentFR'
    }
    else if (currentToDo == 'block') {
        await Friend.findOneAndUpdate({ ProfileOfUser: personProfilePersonId, WatchingUser: user }, { status: 'blocked' })
        whatIDid = 'blocked'
    }
    else if (currentToDo == 'unblock') {
        await Friend.findOneAndUpdate({ ProfileOfUser: personProfilePersonId, WatchingUser: user }, { status: 'none' })
        whatIDid = 'unblocked'
    }
    else if (currentToDo == 'removeFriend') {
        await Friend.findOneAndUpdate({ ProfileOfUser: personProfilePersonId, WatchingUser: user }, { status: 'none' })
        whatIDid = 'removedFriend'
    }
    else if (currentToDo == 'acceptRequest') {
        await Friend.findOneAndUpdate({ ProfileOfUser: personProfilePersonId, WatchingUser: user }, { status: 'friends' })
        whatIDid = 'acceptedFR'
    }
    else if (currentToDo == 'rejectRequest') {
        await Friend.findOneAndUpdate({ ProfileOfUser: personProfilePersonId, WatchingUser: user }, { status: 'none' })
        whatIDid = 'rejectedFR'
    }

    res.status(200)
        .json(new ApiResponse(200, { whatIDid: whatIDid }, "Friendship action completed successfully"));

})

const incomingFR = asyncHandler(async (req, res) => {
    const user = req.params.id;
    // const user = req.user.id

    const incomingFRs = await Friend.find({ ProfileOfUser: user, status: 'pending' })

    if (!user) {
        console.log("User not logged in");
    }

    let noFRs

    if (incomingFRs.length === 0) {
        noFRs = true;
    }
    else {
        noFRs = false;
    }    

    res.status(200)
        .json(new ApiResponse(200, { incomingFRs: incomingFRs , noFRs: noFRs }, "Incoming friend requests fetched successfully"));

})
const outgoingFR = asyncHandler(async (req, res) => {
    const user = req.params.id;
    // const user = req.user.id

    const outgoingFRs = await Friend.find({ WatchingUser: user, status: 'pending' })

    if (!user) {
        console.log("User not logged in");
    }

    let noFRs

    if (outgoingFRs.length === 0) {
        noFRs = true;
    }
    else {
        noFRs = false;
    }    

    res.status(200)
        .json(new ApiResponse(200, { outgoingFRs: outgoingFRs , noFRs: noFRs }, "Outgoing friend requests fetched successfully"));

})

export {
    getPeopleFriendshipStatus,
    friendshipStuff,
    incomingFR,
    outgoingFR
}