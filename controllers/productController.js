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

const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || typeof name !== "string" || name.trim() === "" || price === undefined) {
            return res.status(400).json({
                message: "nama atau harga tidak ditemukan",
            });
        }

        const parsedPrice = Number(price);
        if (isNaN(parsedPrice) || parsedPrice < 0) {
            return res.status(400).json({
                message: "Harga harus berupa angka yang valid",
            });
        }

        const newProduct = await prisma.product.create({
            data: {
                name: name.trim(),
                price: parsedPrice,
            },
        });

        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const rawId = req.body?.id ?? req.params.id;
        const { name, price } = req.body;

        if (rawId === undefined || !name || typeof name !== "string" || name.trim() === "" || price === undefined) {
            return res.status(400).json({
                message: "id, nama, atau harga tidak ditemukan",
            });
        }

        const id = parseInt(rawId, 10);
        const parsedPrice = Number(price);

        if (isNaN(id) || isNaN(parsedPrice) || parsedPrice < 0) {
            return res.status(400).json({
                message: "ID dan harga harus berupa angka yang valid",
            });
        }

        const existingProduct = await prisma.product.findUnique({
            where: { id },
        });

        if (!existingProduct) {
            return res.status(404).json({
                message: "Produk tidak ditemukan",
            });
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name: name.trim(),
                price: parsedPrice,
            },
        });

        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const rawId = req.params.id ?? req.body?.id;

        if (rawId === undefined) {
            return res.status(400).json({
                message: "ID produk tidak ditemukan",
            });
        }

        const id = parseInt(rawId, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID harus berupa angka",
            });
        }

        const existingProduct = await prisma.product.findUnique({
            where: { id },
        });

        if (!existingProduct) {
            return res.status(404).json({
                message: "Produk tidak ditemukan",
            });
        }

        const deletedProduct = await prisma.product.delete({
            where: { id },
        });

        return res.status(200).json({
            message: "Produk berhasil dihapus",
            data: deletedProduct,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada server",
            error: error.message,
        });
    }
};

module.exports = {
    getAllProducts,
    getProductbyID,
    createProduct,
    updateProduct,
    deleteProduct,
};
