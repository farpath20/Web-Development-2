const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const posts = data.post;
const users = data.users;

async function main() 
{
    const db = await dbConnection();
    await db.dropDatabase();
    const user1 = await users.createUser("Faraz Pathan","farpath20","far123");
    try
    {
        const user2 = await users.createUser("Faraza Pathan","farpath20","far123");
    }
    catch(e)
    {

    }
    const loginAttempt1 = await users.loginCheck("farpath20","far123");
    try
    {
        const loginAttempt2 = await users.loginCheck("farpath200","far123");
    }
    catch(e)
    {
        
    }
    try
    {
        const loginAttempt3 = await users.loginCheck("farpath20","far1234");
    }
    catch(e)
    {

    }
    let user1Id =user1._id;
    let username1 = user1.username;
    const blogPostOne = await posts.createPost("Sorry Nabid", "I overslept and missed going to your house",user1Id,username1)
    const postOneId = blogPostOne._id;
    console.log('Done seeding database');
    const getTest = await posts.getPost(postOneId);
    
    const user2 = await users.createUser("Nabid Kabir","nabidiboy","nab123");
    const user2Id = user2._id;
    let username2 = user2.username;
    const comment1 = await posts.createComment(postOneId,user2Id,username2,"It's all goood")
    const comment1Id = comment1.comments[0]._id;
    const blogPostTwo = await posts.createPost("Why Bees Are Awesome","I think bees are awesome because they are cool.",user2Id,username2)
    const postTwoId = blogPostTwo._id;
    const comment2 = await posts.createComment(postTwoId,user1Id,username1,"You got a good point");
    const commentDelete = await posts.deleteComment(comment1Id,postOneId);
    const updatePost = await posts.updatePost("I'll see you tom Nab", "Lets make plans before you go", user1Id,username1,postOneId);
    const patchPost = await posts.patchUpdate("Hey There","",user2Id,username2,postTwoId);
    const listofPost = await posts.listOfPost(1);
    const listofPost2 = await posts.listOfPost();
    const user3 = await users.createUser("Romy Pathan","zerf","zerf123");
    const user3Id = user3._id;
    const username3 = user3.username;
    const blogPostThree = await posts.createPost("Valorant Sucks", "Playing riot games makes me sad",user3Id,username3)
    const postThreeId = blogPostThree._id;
    const comment3 = await posts.createComment(postOneId,user3Id,username3,"Thats on God");
    const comment4 =await posts.createComment(postThreeId,user2Id,username2,"Thats on God");




    await db.serverConfig.close();
}
main();