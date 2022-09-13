const express = require('express');
const { ObjectId } = require("bson");
const router = express.Router();
const data = require('../data');
const postData= data.post;
const userData = data.users;
const xxs = require('xss');
const { user } = require('../config/mongoCollections');

//Does put delete the comments?
// did not check if you are login is here
// did not check if the same user is updating here yet?
//what should comment return after you post it
router.get('/', async (req, res) => {
///how to get the params for this?
let take;
let skip;
if(req.query.take)
{
    //https://stackoverflow.com/questions/1779013/check-if-string-contains-only-digits
    let isnum = /^\d+$/.test(req.query.take);
    if(!isnum)
    {
        return res.status(400).json({error: "Error: Was given non numbers in take"});
    }
    take = parseInt(req.query.take);
}
else
{
    take = req.query.take;
}
if(req.query.skip)
{
    let isnum = /^\d+$/.test(req.query.skip);
    if(!isnum)
    {
        return res.status(400).json({error:"Error: Was given non numbers in skip"});
    }
    skip = parseInt(req.query.skip);
}
else
{
    skip = req.query.skip;
}
try{
    const result = await postData.listOfPost(skip,take);
return res.status(200).json(result);
}
catch(e)
{
    return res.status(400).json({error:e})
}

})
router.get('/logout', async (req, res) => {
    req.session.destroy();
    return res.status(200).json({message:"You got logged out"})
})
router.get('/:id', async (req, res) => {
    try{
        if(typeof req.params.id != "string")
        {
            return res.status(400).json({error: "Somehow did not get string"});
        }
        let id = req.params.id;

        const blogPost = await postData.getPost(id);
        return res.status(200).json(blogPost);

    }
    catch(e)
    {
        return  res.status(404).json({message:"Could not find the blog post"})
    }
})
router.post('/', async (req, res) => {
    if(!req.session.user)////////////////////////////////////////
    {
        return res.status(400).json({error:"Error: Did not sign in yet."})
    }
    let title = req.body.title;
    let body = req.body.body;
    title = xxs(title);
    body = xxs(body);
    if(typeof title!="string")
    {
        return res.status(400).json({error:"Error: title is not a string"})
    } 
    if(typeof body!="string")
    {
        return res.status(400).json({error:"Error: body is not a string"})
    }
    title = title.trim();
    body = body.trim();
    if(title.length<=0||body.length<=0)
    {
        return res.status(400).json({error:"Error: was given a empty string for title or body"})
    }
    try
    {
        //////////might be too much going in
        let blogPost = await postData.createPost(title,body,req.session.user._id,req.session.user.username)
        return res.status(200).json(blogPost);

    }
    catch(e)
    {
        return res.status(400).json({error:e});
    }
})
router.put('/:id', async (req, res) => {
    ///////Do i check if the user id is the same as the id that need to be changed here or in app.js
    if(!req.session.user)////////////////////////////////////////
    {
        return res.status(400).json({error:"Error: Did not sign in yet."})
    }
    let title = req.body.title;
    let body = req.body.body;
    title = xxs(title);
    body = xxs(body);
    let id = req.params.id;
    let ogUserId;
    try{
    let post  = await postData.getPost(id)
    ogUserId = post.userThatPosted._id;
    }
    catch(e)
    {
       return res.status(400).json({error:e});
    }
    if(ogUserId!=req.session.user._id)
    {
        return res.status(400).json({error:"Error: Not the same account"});
    }
    if(typeof title != "string")
    {
        return res.status(400).json({error:"Error: title is not a string"})
    }
    if(typeof body != "string")
    {
        return res.status(400).json({error:"Error: body is not a string"})
    }
    title =title.trim();
    body = body.trim();
    if(title.length<=0||body.length<=0)
    {
        return res.status(400).json({error:"Error: Title or body is a empty string."})
    }
    try{
        let updatedPost = await postData.updatePost(title,body,req.session.user._id,req.session.user.username,id)
        return res.status(200).json(updatedPost);
    }
    catch(e)
    {
        return res.status(400).json({error:e});
    }
})
router.patch('/:id', async (req, res) => {
    if(!req.session.user)////////////////////////////////////////
    {
        return res.status(400).json({error:"Error: Did not sign in yet."})
    }
    let title  = req.body.title;
    let body  = req.body.body;
    let id = req.params.id;
    title = xxs(title);
    body = xxs(body);
    let ogUserId;
    try{
        let post  = await postData.getPost(id)
        ogUserId = post.userThatPosted._id;
    }
    catch(e)
    {
        return res.status(400).json({error:e});
    }
    if(ogUserId!=req.session.user._id)
    {
        return res.status(400).json({error:"Error: Not the same account"});
    }
    if(typeof title != "string")
    {
        return res.status(400).json({error:"Error: Title was not given a string"})
    }
    if(typeof body != "string")
    {
        return res.status(400).json({error:"Error: Body was not given a string"})
    }
    title = title.trim();
    body= body.trim();
    if(title.length<=0&&body.length<=0)
    {
        return res.status(400).json({error:"Error: Body or title is a empty string."})
    }
    try{
        let patchedUpdate = await postData.patchUpdate(title,body,req.session.user._id,req.session.user.username,id)
        return res.status(200).json(patchedUpdate);
    }
    catch(e)
    {
        return res.status(400).json({error:e});
    }
})
router.post('/:id/comments', async (req, res) => {
    if(!req.session.user)////////////////////////////////////////
    {
        return res.status(400).json({error:"Error: Did not sign in yet."})
    }
    let comment = req.body.comment;
    let id = req.params.id;
    comment = xxs(comment);
    if(typeof comment !="string")
    {
        return res.status(400).json({error:"Error: Comment is not a string"})
    }
    comment = comment.trim();
    if(comment.length<=0)
    {
        return res.status(400).json({error:"Error: Comment is an empty string"})
    }
    try{
        const postComment =await  postData.createComment(id,req.session.user._id,req.session.user.username,comment);
        res.status(200).json(postComment);
    }
    catch(e)
    {
        return res.status(400).json({error:e});
    }
})
router.delete('/:blogId/:commentId', async (req, res) => {
    if(!req.session.user)////////////////////////////////////////
    {
        return res.status(400).json({error:"Error: Did not sign in yet."})
    }
    let commentId = req.params.commentId;
    let blogId = req.params.blogId;
    let dComment = await postData.getComment(commentId);
    if(req.session.user._id!=dComment.userThatPostedComment._id)
    {
        return res.status(400).json({error:"Error: Not the same account"});
    }
    try{
        const deletedComment = await postData.deleteComment(commentId,blogId);
        return res.status(200).json({message:"It was successfully deleted"});
    }
    catch(e)
    {
        return res.status(400).json(e);
    }
})
router.post('/signup', async (req, res) => {
    let bodyInfo = req.body;
    if(!bodyInfo)
    {
    res.status(400).json({ error:"Error: There is no data"});
    }
    let username = bodyInfo.username;
    let password = bodyInfo.password;
    let name = bodyInfo.name;
    name = xxs(name);
    password = xxs(password);
    username = xxs(username);
    
    if(typeof name !="string")
    {
        return res.status(400).json({error:"Error: name isn't stirng"})
    }
    if(typeof username !="string")
    {
        return res.status(400).json({error:"Error: username isn't stirng"})
    }
    if(typeof password !="string")
    {
        return res.status(400).json({error:"Error: password isn't stirng"})
    }
    username = username.trim();
    password = password.trim();
    name = name.trim();
    if(username.length<=0||password.length<=0||name.length<=0)
    {
        return res.status(400).json({error:"Error: one of the inputs given was just empty spaces"})
    }
    try{
        await userData.createUser(name,username,password);

    }
    catch(e)
    {
        return res.status(400).json({error:e})
    }
    return res.status(200).json({username:username,name:name});

})
router.post('/login', async (req, res) => {
    let username= req.body.username;
    let password = req.body.password;
    password = xxs(password);
    username = xxs(username);
    if(typeof username !="string")
    {
        return res.status(400).json({error:"Error: username isn't stirng"})
    }
    if(typeof password != "string")
    {
        return res.status(400).json({error:"Error: Password isn't a string"})
    }
    username = username.trim();
    password = password.trim();
    username = username.toLowerCase();
    if(username<=0||password<=0)
    {
        return res.status(400).json({error:"Error: Either password or username has is empty string"})
    }
    try{
       let user = await  userData.loginCheck(username,password)
       // req.session={};//////////////////////////////////////////////////////////////
        let parseId = ObjectId(user._id)
        req.session.user = {username:username,_id:user._id}
        //req.session.user = {username:username,_id:parseId}
        return  res.status(200).json({_id:user._id,name:user.name,username:username})
    }
    catch(e)
    {
        return  res.status(400).json({error:e})
    }
    
})


module.exports = router; 