const { preBuy, user: userModel } = require("../3.models")
const {
    responseJson,
    getWithPagination,
    compiler,
    nodemailer,
    moment: momentUtil,
} = require("../5.util");



userModel.hasMany(preBuy, {
    foreignKey: { name: "id_user", allowNull: false },
});
preBuy.belongsTo(userModel, {
    foreignKey: { name: "id_user", allowNull: false },
});


class userController {
    postPrebuy = async (req, res) => {
        const { id_user, id_produk,  merek, model, name, tel, email} = req.body

        try {
            await preBuy.create({
                id_user,
                id_produk
            })
                .then((resultPreBuy) => {
                    if (resultPreBuy) {
                        responseJson(res, resultPreBuy, 201);
                       nodemailer.sendSalesMail({merek, model, name, tel, email})

                        
                    } else {
                        let result = {
                            message: 'Data Gagal Di Tambahkan'
                        }
                        responseJson(res, result, 400)
                    }
                })
                .catch((err) => {
                    responseJson(res, err.message, 400)
                })
        } catch (e) {
            responseJson(res, e.message, 500)
        }
    }
}

let user = new userController()
class adminController {
    getList = async (req, res) => {
        const {
            page = 1,
            limit = 10,
            order_by = "id",
            sort_by = "ASC",
            search = "",
            approve = false,
        } = req.query;

        await preBuy
            .findAndCountAll({
                offset: 0 + (page - 1) * limit,
                limit,
                order: [[order_by, sort_by]],
            })
            .then((result) => {
                responseJson(res, compiler.compilerPage(result, page, limit), 200);
            })
            .catch((err) => responseJson(res, err.parent.sqlMessage, 400));
    }
}

let admin = new adminController()

module.exports = {
    user,
    admin
}