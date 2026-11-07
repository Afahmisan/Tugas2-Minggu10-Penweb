const prisma = require("../lib/prisma");

const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { id: "asc" },
        });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
        });
    }
};

const getProductbyID = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID harus berupa angka",
            });
        }

        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return res.status(404).json({
                message: "Produk tidak ditemukan",
            });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
        });
    }
};

const createProduct = (req, res) => {
    const { name, price } = req.body;

    if (!name || price === undefined) {
        return res.status(400).json({ message: "nama atau harga tidak ditemukan" });
    }

    return res.status(201).json({ name, price: Number(price) });
};

module.exports = {
    getAllProducts,
    getProductbyID,
    createProduct,
};
