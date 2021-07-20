const express = require('express');
const router = express.Router();
var ffmpeg = require('fluent-ffmpeg');

const { Like } = require("../models/Like");
const { Dislike } = require("../models/DisLike");

//=================================
//          Like DisLike
//=================================

router.post("/getLikes", (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = {videoId: req.body.videoId}
    } else {
        variable = {commentId: req.body.commentId}
    }
    Like.find(variable)
        .exec((err, likes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success: true, likes})
        })
});

router.post("/getDislikes", (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = {videoId: req.body.videoId}
    } else {
        variable = {commentId: req.body.commentId}
    }
    Dislike.find(variable)
        .exec((err, dislikes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success: true, dislikes})
        })
});

router.post("/upLike", (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = {videoId: req.body.videoId , userId : req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    // Like Collection에 클릭 정보 넣기

    const like = new Like(variable)

    like.save((err, likeResult) => {
        if (err) return res.status(400).json({success:false, err})

        // 만약 싫어요가 이미 클릭 되어있는 상태라면 싫어요 개수 -1 
        Dislike.findOneAndDelete(variable)
            .exec((err, dislikeResult) => {
                if (err) return res.status(400).json({suceess: false, err})
                res.status(200).json({success: true})
        })
    })
});


router.post("/unLike", (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = {videoId: req.body.videoId , userId : req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({suceess: false, err})
            res.status(200).json({success: true})
        })

});

router.post("/upDislike", (req, res) => {

    let variable = {}


    if (req.body.videoId) {
        variable = {videoId: req.body.videoId , userId : req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }


    // DisLike Collection에 클릭 정보 넣기

    const dislike = new Dislike(variable)

    dislike.save((err, dislikeResult) => {
        if (err) return res.status(400).json({success:false, err})
        // 만약 좋아요가 이미 클릭 되어있는 상태라면 좋아요 개수 -1 
        Like.findOneAndDelete(variable)
        .exec((err, likeResult) => {
            if (err) return res.status(400).json({suceess: false, err})
            res.status(200).json({success: true})
    })
    })
    
});


router.post("/unDislike", (req, res) => {

    let variable = {}

    if (req.body.videoId) {
        variable = {videoId: req.body.videoId , userId : req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({suceess: false, err})
            res.status(200).json({success: true})
        })

});

module.exports = router;