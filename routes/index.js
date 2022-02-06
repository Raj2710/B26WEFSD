var express = require('express');
const { mobile } = require('jade/lib/doctypes');
var router = express.Router();
const {dbUrl,mongodb,MongoClient,dbName} = require('../dbConfig');

router.get('/', async(req, res)=> {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db(dbName)
    let business = await db.collection('business').find().toArray()
    res.json({
      statusCode:200,
      message:"Business Fetched Successfully",
      data:business
    })
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error!"
    })
  }
  finally{
    client.close()
  }
});



router.get('/:id', async(req, res)=> {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db(dbName)
    let business = await db.collection('business').findOne({_id: mongodb.ObjectId(req.params.id)})
    res.json({
      statusCode:200,
      message:"Business Fetched Successfully",
      data:business
    })
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error!"
    })
  }
  finally{
    client.close()
  }
});

router.post('/',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db(dbName)
    let business = await db.collection('business').findOne({email:req.body.email})
    if(business)
    {
      res.json({
        statusCode:400,
        message: "Business Already Exists",
        data:business
      })
    }
    else{
      const business = await db.collection('business').insertOne(req.body)
      res.json({
        statusCode:200,
        message: "Business Created Successfully"
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error!"
    })
  }
  finally{
    client.close();
  }
})

router.put('/:id',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db(dbName)
    let business = await db.collection('business').findOneAndReplace({_id:mongodb.ObjectId(req.params.id)},req.body)
    res.json({
      statusCode:200,
      message:"Business Edited Successfully"
    })
    
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error!"
    })
  }
  finally{
    client.close();
  }
})


router.delete('/:id', async(req, res)=> {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db(dbName)
    let business = await db.collection('business').deleteOne({_id: mongodb.ObjectId(req.params.id)})
    res.json({
      statusCode:200,
      message:"Business Deleted Successfully"
    })
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error!"
    })
  }
  finally{
    client.close()
  }
});


module.exports = router;
