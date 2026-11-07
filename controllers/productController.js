let products = [
  { id: 1, name: "Buku", price: 15000 },
  { id: 2, name: "Pulpen", price: 5000 },
];


const getAllProducts = (req, res) => {
    return res.status(200).json(products);
}

const getProductbyID = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = products.find((p) => p.id == id);


    if(!product){
        return res.status(404).json(
            {message: 'Produk tidak ditemukan'}
        );
    }

    return res.status(200).json(product);
}

const createProduct = (req, res) => {
    const {name, price} = req.body;

    if(!name || price === undefined){
        return res.status(400).json({message: 'nama atau harga tidak ditemukan'});
    }

    const newID = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
        id : newID,
        name : name,
        price : Number(price),
    };

    products.push(newProduct);
    return res.status(201).json(newProduct);
}

module.exports = {
    getAllProducts,
    getProductbyID,
    createProduct,
};