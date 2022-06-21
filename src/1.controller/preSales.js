const { preSales, status, user } = require('../3.models')
const {
  responseJson,
  getWithPagination,
  compiler,
  nodemailer,
  moment:momentUtil
} = require('../5.util')
// const moment = require('moment')
const sequelize = require('sequelize')

exports.addPreSales = async (req, res) => {
  const { merek, model, name, tel, email, id_user } = req.body

  try {
    await preSales
      .create({
        merek,
        model,
        name,
        tel,
        email,
        id_user
      })
      .then(resultPresales => {
        if (resultPresales) {
          nodemailer.sendSalesMail({ merek, model, name, tel, email })
          responseJson(res, resultPresales.dataValues, 201)
        }
      })
      .catch(err => {
        console.log('ini error', err)
        responseJson(res, err.message, 400)
      })
  } catch (error) {
    responseJson(res, error.message, 500)
  }
}

exports.getDataListSales = async (req, res) => {
  const { page = 1, limit = 10, order_by = 'id', sort_by = 'ASC',search='' } = req.query

  try {
    await getWithPagination({
      models: preSales,
      page,
      limit,
      order_by,
      sort_by,
      search
    })
      .then(result => {
        responseJson(res, compiler.compilerPage(result, page, limit), 200)
      })
      .catch(err => responseJson(res, err.parent.sqlMessage, 400))
  } catch (error) {
    responseJson(res, error.message, 500)
  }
}

exports.changeStatusPreSales = async (req, res) => {
  const { id } = req.query
  const { date, status } = req.body
  let tes = new Date(date)
  let tes1 = tes.getHours()

  try {
    preSales
      .findOne({
        where: {
          id: id
        }
      })
      .then(result => {
        if (result.status === 'PENDING' && result.inspection_date === null) {
          preSales
            .findOne({
              where: {
                id
              },
              attributes: {
                include: [
                  'id',
                  [
                    sequelize.fn(
                      'DATE_FORMAT',
                      sequelize.col('inspection_date'),
                      '%Y-%m-%d %H:%i'
                    ),
                    'inspection_date'
                  ]
                ]
              }
            })
            .then(resultUpdate => {
              resultUpdate
                .update({
                  status: status,
                  inspection_date: new Date(date)
                })
                .then( resultFinal => {
                  resultFinal.dataValues = {
                    ...resultFinal.dataValues,
                    inspection_date: momentUtil.formatLocalDate(resultFinal.dataValues.inspection_date)
                  }
                  responseJson(res, resultFinal.dataValues, 200)
                })
            })
        } else if (
          (result.status === 'SCHEDULE' && status === 'INSPEKSI') ||
          (result.status === 'INSPEKSI' && status === 'APPROVE') ||
          (result.status === 'APPROVE' && status === 'SOLD') ||
          (result.status === 'INSPEKSI' && status === 'CANCEL') ||
          status === 'CANCEL'
        ) {
          preSales
            .findOne({
              where: {
                id
              }
            })
            .then(resultUpdate => {
              if (
                (result.status === 'APPROVE' && status === 'CANCEL') ||
                (result.status === 'SOLD' && status === 'CANCEL')
              ) {
                resultUpdate = {
                  message: 'Input Invalid !'
                }
                responseJson(res, resultUpdate, 400)
              } else {
                resultUpdate
                  .update({
                    status: status
                  })
                  .then(resultFinal => {
                    responseJson(res, resultFinal, 200)
                  })
              }
            })
        } else {
          let resultFinal = {
            message: 'Pre Sales Gagal Update'
          }
          responseJson(res, resultFinal, 200)
        }
      })
      .catch(err => console.log(err))
  } catch (error) {
    responseJson(res, error, 500)
  }
}

exports.getDetailPreSales = async (req, res) => {
  const { id } = req.params

  try {
    await preSales
      .findOne({ where: { id: id } })
      .then(result => {
        if (result?.dataValues) {
          responseJson(res, result, 200)
        } else {
          result = {
            message: 'Data Tidak Ditemukan'
          }
          responseJson(res, result, 200)
        }
      })
      .catch(err => responseJson(res, err.parent.sqlMessage, 400))
  } catch (error) {
    responseJson(res, error.message, 500)
  }
}

exports.getStatus = async (req, res) => {
  try {
    await status
      .findAll()
      .then(result => {
        if (result) {
          responseJson(res, result, 200)
        } else {
          result = {
            message: 'Tidak Ada Data'
          }
          responseJson(res, result, 200)
        }
      })
      .catch(err => responseJson(res, err.parent.sqlMessage, 400))
  } catch (error) {
    responseJson(res, error.message, 500)
  }
}
