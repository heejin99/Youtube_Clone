const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

// config option
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

var upload = multer({storage: storage}).single("file")


//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    // 비디오를 서버에 저장한다.
    upload(req, res, err => {
        if (err) {
            return res.json({success: false, err})
        }
        return res.json({ success: true, url: res.req.file.path, filename: res.req.file.filename})
    })
});

router.post('/uploadVideo', (req, res) => {
    // 비디오 정보를 저장한다.
    const video = new Video(req.body)

    video.save((err, doc) => {
        if (err) return res.json({success: false, err})
        res.status(200).json({success: true})
    })
});

router.get('/getVideos', (req, res) => {
    // 비디오를 db에서 가져와 client에 보냄
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({success: true, videos})
        })
});

router.post('/thumbnail', (req, res) => {
    // 썸네일 생성 및 비디오 러닝타임 가져오기

    let filePath = ""
    let fileDuaration = ""
    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration)
        fileDuaration = metadata.format.duration
    })

    // 썸네일 생성
    ffmpeg(req.body.url)
    .on('filenames', function(filenames) {
        console.log('Will generate '+filenames.join(', '))
        console.log(filenames)

        filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', function() {
        console.log('Screenshots taken');
        return res.json({ success: true, url: filePath, fileDuaration: fileDuaration})
    })
    .on('error', function() {
        console.error(err);
        return res.json({ success: false, err });
    })
    .screenshots({
        count: 3,
        folder: 'uploads/thumbnails',
        size: '320x240',
        filename: 'thumbnail-%b.png'
    })
});

module.exports = router;
