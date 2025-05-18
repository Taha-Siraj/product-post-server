import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let products = [];

app.get('/get-product', (req, res) => {
  res.json(products);
});

app.post('/post-product', (req, res) => {
  const { name, price, description, imgUrl } = req.body;
  if (!name || !price || !description || !imgUrl) {
    return res.status(400).send('Required input field');
  }
  const product = {
    id: Date.now(),
    name,
    price,
    imgUrl,
    description,
  };
  products.push(product);
  res.status(201).json(product);
});

app.delete('/product-delete/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === productId);
  if (index === -1) {
    return res.status(404).send('Product not found');
  }
  products.splice(index, 1);
  res.status(200).send('Product deleted');
});

app.put('/edit-product/:id', (req, res) => {
  const { name, price, description, imgUrl } = req.body;
  const productId = parseInt(req.params.id);
  if (!name || !price || !description || !imgUrl) {
    return res.status(400).send('Required input field');
  }
  const index = products.findIndex((p) => p.id === productId);
  if (index === -1) {
    return res.status(404).send('Product not found');
  }
  products[index] = { id: productId, name, price, imgUrl, description };
  res.status(200).send('Product updated');
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});