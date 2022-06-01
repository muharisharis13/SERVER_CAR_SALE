const models = require("../../3.models")
const utils = require("../../5.util")


// PRODUK==========================

exports.getProduk = async (req, res) => {
    try {
        await models.produk.findAll()
            .then(result => {
                utils.responseJson(res, result, 200)
            })
    } catch (error) {
        utils.responseJson(res, error, 500)
    }
}

exports.getDetailProduk = async (req, res) => {
    const { id } = req.params
    try {
        const result = await models.produk.findOne({ where: { id: id } })
        utils.responseJson(res, result, 200)


    } catch (error) {
        utils.responseJson(res, error, 500)
    }
}

exports.editProduk = async (req, res) => {
    const { nama_penjual, email, no_hp, merek, model } = req.body
    const { id } = req.params
    try {
        await models.produk.findOne({ where: { id: id } })
            .then(result => {
                if (result?.dataValues) {
                    result.update({
                        nama_penjual,
                        email,
                        no_hp,
                        model,
                        merek
                    })
                    utils.responseJson(res, result, 200)
                } else {
                    result = {
                        message: "Data Tidak Ditemukan"
                    }
                    utils.responseJson(res, result, 200)
                }
            })

    } catch (error) {
        utils.responseJson(res, error, 500)
    }

}


exports.addProduk = async (req, res) => {
    const { nama_penjual, no_hp, email, merek, model } = req.body
    try {
        const data1 = await models.produk.create({
            nama_penjual,
            no_hp,
            email,
            merek,
            model
        })
        utils.responseJson(res, data1, 200)
    } catch (error) {
        utils.responseJson(res, error, 500)
    }
}

exports.deleteProduk = async (req, res) => {
    const { id } = req.params
    try {
        await models.produk.destroy({ where: { id: id } })
            .then(result => {
                result = {
                    message: "Data Produk Berhasil Di Hapus"
                }
                utils.responseJson(res, result, 200)
            })
    } catch (error) {
        utils.responseJson(res, error, 500)
    }
}
