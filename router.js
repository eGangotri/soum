import express from "express";
import {getCategory, getProduct,updateProductState} from './controller/controller.js';
export const router = express.Router();

router.get('/', function (req, res) {
    res.send('Soum');
  })

// localhost:6969/getCategory?parent_id=11
router.get('/getCategory', async (req, res) => {
  const parentId = req.query.parent_id
  console.log(`parentId ${parentId}`);
  const data = await getCategory(parentId);
  res.send(data);
});


// localhost:6969/getProduct?state='Deleted'
router.get('/getProduct', async function (req, res) {
  const state = req.query.state;
  console.log(`state: ${state}`);
  const data = await getProduct(state);
  res.send(data);
})

//{ stateFrom: 'S-1', stateTo: 'S-2' }
router.post('/updateProductState', async function (req, res) {
  const {stateFrom, stateTo} = req.body
  console.log(`req body: ${stateFrom}, ${stateTo}`);
  const data = await updateProductState(state);
  res.send(data);
})
  


