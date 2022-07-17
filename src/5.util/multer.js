const multer = require('multer');

// Simpan Foto Produk
let saveFile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/produk')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})


uploadProduk = multer({ storage: saveFile })