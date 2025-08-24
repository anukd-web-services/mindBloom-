import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/APIError.js";
import ApiResponse from "../utils/ApiResponse.js"
import { Friend } from "../models/friends.model.js";

const getPeopleFriendshipStatus = asyncHandler(async (req, res) => {
    const personProfilePersonId = req.params.id;
    const user = req.user.id;

    if(personProfilePersonId == user){
        var userItself = true
    }
    else{
        var userItself = false
    }

    if (!user) {
        var loggedin = false;
    }
    else {
        loggedin = true;
    }

    if (!personProfilePersonId) {
        throw new ApiError(400, "Person ID is required");
    }

    if (loggedin) {
        var finder = await Friend.find({ ProfileOfUser: personProfilePersonId, WatchingUser: user })
    }

    if (loggedin === false) {
        var friends = "no"
    }
    else if (finder.length === 0) {
        var friends = "no"
    }
    else {
        var friends = finder[0].status;
    }

    res.status(200)
        .json(new ApiResponse(200, { friends: friends , userThemself: userItself }, "Friendship status fetched successfully"));

})

export default {
    getPeopleFriendshipStatus
}