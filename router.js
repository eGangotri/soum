import express from "express";
import {getCategoryFromGraphAPI, getProductFromGraphAPI, updateProductStateFromGraphAPI} from './controller/controller.js';
export const router = express.Router();

router.get('/', function (req, res) {
    res.send('Soum');
  })

// localhost:6969/getCategory?parent_id=11
router.get('/getCategory', async (req, res) => {
  const parentId = req.query.parent_id
  const data = await getCategoryFromGraphAPI(parentId);
  res.send(data);
});


// localhost:6969/getProduct?state='Deleted'
router.get('/getProduct', async function (req, res) {
  const state = req.query.state;
  const data = await getProductFromGraphAPI(state);
  res.send(data);
})

//{ stateFrom: 'S-1', stateTo: 'S-2' }
router.post('/updateProductState', async function (req, res) {
  const {stateFrom, stateTo, productId} = req.body
  const data = await updateProductStateFromGraphAPI(stateFrom,stateTo,productId);
  res.send({"status": data});
})
  


