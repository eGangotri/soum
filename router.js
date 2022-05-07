import express from "express";

export const router = express.Router();

router.get('/', function (req, res) {
    res.send('Home Page');
  })

  //localhost:6969/getCategory?parent_id=10
router.get('/getCategory', function (req, res) {
  const parentId = req.query.parent_id
  console.log(`parentId ${parentId}`);
  res.send(`parentId ${parentId}`);
})

// localhost:6969/getProduct?state='Deleted'
router.get('/getProduct', function (req, res) {
  const state = req.query.state;
  console.log(`getProduct: ${state}`);
  res.send(`getProduct: ${state}`);
})

router.post('/updateProductState',  function (req, res) {
  const {stateFrom, stateTo} = req.body
  console.log(`req body: ${stateFrom}, ${stateTo}`);
//{ stateFrom: 'S-1', stateTo: 'S-2' }
    res.send(`req body: ${stateFrom}, ${stateTo}`);
})
  

