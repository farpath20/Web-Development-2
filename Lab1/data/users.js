const { ObjectId } = require("bson");
const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.user;
const bcrypt = require('bcryptjs');
const saltRounds = 12;

async function createUser(name,username, password)///ask around if we need to check if lowercase the same or if they are the same as other usernames.
{
    if(typeof name != "string")
    {
        throw "Error: Name is not the right type or have any value."
    }
    if(typeof username!="string")
    {
        throw "Error: Username is not the right type or have any values."
    }
    if(typeof password !="string")
    {
        throw "Error: Password is not the right type or have any values"
    }
    name = name.trim();
    username = username.trim();
    password = password.trim();
    if(name.length<=0||username.length<=0||password.length<=0)
    {
        throw "Error: Empty string was given as an input"
    }
    const userCollection = await user()
    username = username.toLowerCase();
    const findInfo = await userCollection.findOne({username:username})
    if(findInfo!=null)
    {
        throw "Error: Same username."
    }
    const hash = await bcrypt.hash(password, saltRounds);
    let obj= {
        _id: new ObjectId().toString(),
        name: name,
        username: username,
        password: hash
    }

    const insertInfo = await userCollection.insertOne(obj);
    if(insertInfo ===0)
    {
        throw "Error: inserting to a user into the database "
    }
    return obj;

}
async function getUser()
{

}
async function loginCheck(username, password)
{
    if(typeof username!="string")
    {
        throw "Error: Username is not the right type or have any values."
    }
    if(typeof password !="string")
    {
        throw "Error: Password is not the right type or have any values"
    }
    username = username.trim();
    password = password.trim();
    username = username.toLowerCase();
    if(username.length<=0||password.length<=0)
    {
        throw "Error: Empty string was given as an input"
    }
    const userCollection = await user();
    const findInfo = await userCollection.findOne({username:(username)});
    if(findInfo===null)
    {
        throw "Either the username or password is invalid2.";
    }
    else{
        try {

            compareToMatch = await bcrypt.compare(password,findInfo["password"] );
        } catch (e) {
            throw "Error can not bcrypt.";
        }
        if(compareToMatch)
        {
            return findInfo;
        }
        else
        {
            throw "Either the username or password is invalid.";
        }
    }

}
///ideas for patch is to preinput the the values and if it equals those values then do not update it
///
module.exports = {
   createUser,
   getUser,
   loginCheck
}