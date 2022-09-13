const { ObjectId } = require("bson");
const mongoCollections = require("../config/mongoCollections");
const blog = mongoCollections.blog;

async function createPost(title,body,userId,usernameString)
{
    if(typeof title !="string")
    {
        throw "Error: Title is not given or not the same type";
    }
    if(typeof body !="string")
    {
        throw "Error: Body is not given or not the same type";
    }
    if(typeof userId !=="string")
    {
        throw "Error: Did not recieve a string."
    }
    if(typeof usernameString!=="string")
    {
        throw "Error: Username is not given or not the same type";
    }
    userId = userId.trim();
    title = title.trim();
    body = body.trim();
    usernameString = usernameString.trim();
    if(userId.length<=0||title.length<=0||body.length<=0||usernameString.length<=0)
    {
        throw "Error: String is empty spaces"
    }
    let parseId = null;
    const blogCollection = await blog();//look if the user exist?
    try
    {
        parseId = ObjectId(userId);
    }
    catch(e)
    {
        throw "Error: Id could not be converted to an ObjectId."
    }
    let obj = {
        _id: new ObjectId().toString(),
        title:title,
        body:body,
        userThatPosted:{_id:userId,username:usernameString},
        comments:[]
    }
    const insertInfo = await blogCollection.insertOne(obj);
    if (insertInfo.insertedCount === 0)
    {
        throw "Error: Did not insert right"
    }

    
    return obj;



}
async function getPost(postId)
{
    if(typeof postId !="string")
    {
        throw "Error: postId is not given a input or wrong type"
    }
    postId = postId.trim();
    if(postId.length<=0)
    {
        throw "Error: post id is just empty spaces."
    }
    const blogCollection = await blog();
    let parseId;
    try
    {
        parseId = ObjectId(postId);
    }
    catch(e)
    {
        throw "Error: Id could not be converted to an ObjectId."
    }
   
    const place = await blogCollection.findOne({_id: postId });
    if (place === null) 
    {
        throw 'Error: does not have any blogs.';
    }
    return place;


}
async function createComment(postId, userId,usernameString,commentString)//could get username by getting the user
{
    if(typeof postId != "string")
    {
        throw "Error: Not a string for post Id"
    }
    if(typeof userId != "string")
    {
        throw "Error: Not a string for user Id"
    }
    if(typeof usernameString != "string")
    {
        throw "Error: Username is not a string"
    }
    if(typeof commentString != "string")
    {
        throw "Error: commentStirng is not a string"
    }
    postId = postId.trim();
    userId = userId.trim();
    usernameString = usernameString.trim();
    commentString = commentString.trim();
    if(usernameString.length<=0||userId.length<=0||usernameString.length<=0||commentString.length<=0)
    {
        throw "Error: One of the inputs is empty strings."
    }
    try
    {
        parsePostId = ObjectId(postId);
    }
    catch(e)
    {
        throw "Error: Id could not be converted to an ObjectId."
    }
    const blogCollection = await blog();
    const place = await blogCollection.findOne({_id: postId });
    let obj = {
       _id: new ObjectId().toString(),
       userThatPostedComment:{_id:userId,username:usernameString},
       comment:commentString
    }
    let newComments = place.comments;
    newComments.push(obj);
    let postObj={
        title:place.title,
        body:place.body,
        userThatPosted:place.userThatPosted,
        comments:newComments
    }
    const updatedInfo = await blogCollection.updateOne({_id:postId},{$set:postObj});
    if(updatedInfo.modifiedCount ==0)
    {
        throw "Error: Could not update anything."
    }
    return await getPost(postId);

    
}
async function getComment(commentId)
{
    if(typeof commentId !="string")
    {
        throw "Error: Comment Id is not the "
    }
    commentId = commentId.trim();
    const blogCollection = await blog();
    const blogList = await blogCollection.find({}).toArray();
    for(i of blogList)
    {
        for(j of i.comments)
        {
            if(commentId==j._id)
            {
                return j
            }
        }
    }
    throw "Error: comment cannot be found."

}
async function deleteComment(commentId, postId)
{
    if(typeof commentId!= "string")
    {
        throw "Error: Comment id is not given or is not a string "
    }
    if(typeof postId !="string")
    {
        throw "Error: post id is not given or is not a string"
    }
    commentId = commentId.trim();
    postId = postId.trim();
    if(commentId.length<=0||postId.length<=0)
    {
        throw "Error: PostId or commentId is empty string."
    }
    try
    {
        parsePostId = ObjectId(postId);
    }
    catch(e)
    {
        throw "Error: Id could not be converted to an ObjectId."
    }
    const blogCollection = await blog();
    const post = await blogCollection.findOne({ _id: postId });
    let newComment = [];
    for( i of post.comments)
    {
        if(i._id===commentId)
        {
            continue
        }
        newComment.push(i);
    }
    const updateInfo = await blogCollection.updateOne({_id:postId},{$set:{comments:newComment}});
    if(updateInfo.modifiedCount==0)
    {
        throw "Error: Did not update reviews."
    } 
    return await getPost(postId);

}
async function updatePost(title, body, userId, usernameString, postId)//Question: should comments be empty because it a put request and requires everything to be updated
{
    if(typeof title !="string")
    {
        throw "Error: Title is not given or not the same type";
    }
    if(typeof body !="string")
    {
        throw "Error: Body is not given or not the same type";
    }
    if(typeof userId !=="string")
    {
        throw "Error: Did not recieve a string."
    }
    if(typeof usernameString!=="string")
    {
        throw "Error: Username is not given or not the same type";
    }
    
    userId = userId.trim();
    title = title.trim();
    body = body.trim();
    usernameString = usernameString.trim();
    if(userId.length<=0||title.length<=0||body.length<=0||usernameString.length<=0)
    {
        throw "Error: String is empty spaces"
    }
    let parseId = null;
    const blogCollection = await blog();//look if the user exist?
    try
    {
        parseId = ObjectId(userId);
        parsePostId = ObjectId(postId);
    }
    catch(e)
    {
        throw "Error: Id could not be converted to an ObjectId."
    }
    const OgPost = await getPost(postId);
    let obj = {
        _id:postId,
        title:title,
        body:body,
        userThatPosted:{_id:userId,username:usernameString},
        comments:OgPost.comments
    }
    const updateInfo = await blogCollection.updateOne({_id:postId},{$set:obj});
    if(updateInfo==null)
    {
        throw "Error: Did not update anything";
    }
    return obj;

}
async function patchUpdate(title=null, body=null, userId, usernameString, postId)
{
    try
    {
        parseId = ObjectId(userId);
        parsePostId = ObjectId(postId);
    }
    catch(e)
    {
        throw "Error: Id could not be converted to an ObjectId."
    }
    if(typeof usernameString!="string")
    {
        throw "Error: Username not given or wrong type";
    }
    if(body==null&&title==null)
    {
        throw "Error: there is nothing to update."
    }
    if(title.length>0)
    {
        if(typeof title!="string")
        {
            throw "Error: Title is not a string";
        }
        title = title.trim();
        if(title.length<=0)
        {
            throw "Error: Title is a empty String."
        }
        const blogCollection = await blog();
        const updateInfo = await blogCollection.updateOne({_id:postId},{$set:{title:title}});
        if(updateInfo==null)
        {
            throw "Error: Did not update Title."
        }

    }
    if(body.length>0)
    {
        if(typeof body!="string")
        {
            throw "Error: Title is not a string";
        }
        body = body.trim();
        if(body.length<=0)
        {
            throw "Error: Body is not a string"
        }
        const blogCollection = await blog();
        const updateInfo = await blogCollection.updateOne({_id:postId},{$set:{body:body}});
    }
    return await getPost(postId);

}
async function listOfPost(skip=0,take=20)
{
    if(typeof skip != "number")
    {
        throw "Error: Skip is not a number."
    }
    if(typeof take !="number")
    {
        throw "Error: Take is not a number."
    }
    if(skip<0||take<0||take>100)
    {
        throw "Error: take or skip is not in the range."
    }
    const blogCollection = await blog();
    const blogList = await blogCollection.find({}).toArray();
    let listPost =[];
    for (i of blogList)
    {
        if(skip>0)
        {
           skip--; 
           continue
        }
        if(take>0)
        {
            take--;
            listPost.push(i);
        }
        else
        {
            break;
        }
    }
    return listPost;
}
module.exports ={
    createPost,
    createComment,
    getComment,
    getPost,
    deleteComment,
    updatePost,
    patchUpdate,
    listOfPost
}