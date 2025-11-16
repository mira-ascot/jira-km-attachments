//src/routes/attach.js
const express = require('express');
const downloadMedia = require('../downloadFile');
const attachJiraAttachment = require('../jiraClient');
const router = express.Router();
router.post('/', async (req, res) => {
    try{
    const issueId = req.body.issueId;
    const mediaId  =req.body.mediaId; 
    const filename  =req.body.filename; 
    const {buffer, contentType} =await downloadMedia(mediaId);
    // Send a POST request
    const jiraResponse = await attachJiraAttachment(issueId,filename,buffer, contentType);
    res.status(200).json(jiraResponse.data);
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;