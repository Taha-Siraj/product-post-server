import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let products = []; 
app.get('/get-product', (req, res) => {
    res.json(products)
})
app.post('/post-product' , (req, res) => {
    const {name , price , description} = req.body;
    if(!name || !price || !description){
        res.send('requried input field')
        return
    } 
    const product = {
        id: new Date().getTime(),
        name,
        price,
        description,
      };
    products.push(product)
    res.json(product);
})

app.delete('/product-delete/:id', (req, res) => {
    const productId = req.params.id
    for(let i = 0; i < products.length; i++){
        if(products[i].id == productId){
            products.splice(i,1)
            res.send('product deleted')
        }
    }
})

app.put('/edit-product/:id' , (req, res) => { 
    const {name , price , description} = req.body;
    const productId = req.params.id;
    if(!name || !price || !description){
        res.send('requried input field')
        return
    }
    let  isMatched = false
    for(let i = 0; i < products.length; i++){
        isMatched = true
        if(products[i].id == productId){
            products[i] = {
                id: productId,
                name,
                price,
                description,
             }
             products.splice(i, 1 , {
               id: productId,
               name: name,
               price: price,
               description: description,
             })
             break
        }}
        if(isMatched){
            res.send('product edited')
        }else{
            res.send('product  did not deleted')
        }
})

app.listen(5000)