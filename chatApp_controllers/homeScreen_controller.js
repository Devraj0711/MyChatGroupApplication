const sequelize = require('../util/database');

const Login_page = require('../models/signup_db');

const StoreMessage_page= require('../models/storeMessage');

const groupDetails_db= require('../models/groupDetails_db');

const userGroup_JoinDb= require('../models/userGroup_Join');

const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

const bcrypt= require('bcrypt');

const jwt= require('jsonwebtoken');

exports.getHomeScreen= async(req, res, next)=> {
    try {
        
        
       
        // Send both JSON data and HTML content as the response
        res.sendFile(path.join(__dirname, '..', 'view', 'Message', 'HomeScreen.html'));
        // res.status(200).send(userList);

        // res.setHeader('Content-Type', 'application/json');
        // res.status(200).json(userList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
    
};


//homeScreen page
exports.showContactScreen= async(req,res,next)=>{
    try {
        const userList = await Login_page.findAll();

        //to extract uniques group names
        const groupNames = await groupDetails_db.findAll({
            attributes: [
              [sequelize.fn('DISTINCT', sequelize.col('groupName')), 'groupName']
            ]
          });
          
          // Extract groupNames from the result
          const uniqueGroupNames = groupNames.map(group => group.groupName);
          
          console.log("Group Names", uniqueGroupNames);
          
        

        res.status(200).send({userList:userList, uniqueGroupNames:uniqueGroupNames});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
}

exports.showChat= async(req, res, next)=> {
    
    const contactName= req.params.name;

    console.log("is it working", contactName);

    try {
        res.sendFile(path.join(__dirname, '..', 'view', 'Message', 'chatScreen.html'));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
    
};

exports.addGroup= (req,res,next)=>{
    try {
        res.sendFile(path.join(__dirname, '..', 'view', 'Message', 'addGroup.html'));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
}

exports.post_addGroup= async(req,res,next)=>{

    const groupName= req.body.GroupDetails.groupName;
    console.log("seee the group name?", groupName);

    const members= Array.isArray( req.body.GroupDetails.memberName) ?  req.body.GroupDetails.memberName : [ req.body.GroupDetails.memberName];
    console.log("seee the group members?", members);

    const AdminuserId= req.body.AdminuserId

    // Retrieve existing group with the same groupName
    const existingGroup = await groupDetails_db.findOne({
        where: { groupName: groupName }
      });
  
      let groupId;
      if (existingGroup) {

        if(existingGroup.AdminuserId !== AdminuserId)
        {
            return res.status(500).json({ error: 'Only admins can create groups.' });
        }
        // Use existing groupId for the same groupName
        groupId = existingGroup.groupId;
      } else {
        // Generate a new groupId if the groupName is not repeated
        groupId = Math.floor(Math.random() * 1000);
      }

      
  
      const group_details = await groupDetails_db.create({
        groupName: groupName,
        memberName: members,
        adminUserId: AdminuserId,
        groupId: groupId,
      });
      

    // group_details.memberName.forEach((element)=>{
    //     console.log(element);
    // })  
    res.status(200).send("api call successfully made");

}

//to show the group chat screen
exports.get_Groupchat= (req,res,next)=>{
    try {
        res.sendFile(path.join(__dirname, '..', 'view', 'Message', 'groupchatScreen.html'));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
}

//to show joined members
exports.show_GroupMembers= async(req,res,next)=>{
   const groupName= req.params.groupName;
    try{
    const selectedGroup= await groupDetails_db.findAll({where:{groupName: groupName} });
    // console.log("Selected group details", selectedGroup);
    let mergedMembers = [];
    selectedGroup.forEach((element)=>{
        const members = JSON.parse(element.dataValues.memberName);
        mergedMembers = [...new Set([...mergedMembers, ...members])];
        })
        console.log("Selected group details", mergedMembers);
    res.status(200).json(mergedMembers);
   }
   catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
   } 
}

//to store group message.
exports.post_Groupchat= async(req, res, next)=>{
    try{
        const message= req.body.message;
        const groupName= req.body.groupName;
        const currentUser_id= req.body.user_id;

      
        const Users = await Login_page.findOne({ where: { id: currentUser_id } });

        const groupid= await groupDetails_db.findOne({where: {groupName: groupName}})

        const groupMessages= await userGroup_JoinDb.create({
            Usermessage: message,
            Username: Users.name,
            groupname: groupName,
            SignupDbId: currentUser_id,

        })

 
        res.status(200).json(groupMessages); 

    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//to display the stored message in the group

exports.show_userMessage= async(req,res,next)=>{
    try{
        const currentuserId= req.params.userid;

        const selectedGroup= req.params.groupName;

        console.log("current user id-", currentuserId);

        console.log("selected user name--", selectedGroup);

        const groupMessages= await userGroup_JoinDb.findAll({where: {groupname: selectedGroup}});

        console.log("`${selectedGroup}` messages", groupMessages);

        res.status(200).json(groupMessages);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}