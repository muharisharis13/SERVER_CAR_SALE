const nodemailer = require('nodemailer');
const responseJson = require("./responseJson");


exports.sendSalesMail = ({
    merek, model, name, tel, email
}) => {
    var transporter = nodemailer.createTransport({
        // service : 'gmail',
        host: 'mail.mesproject.id',
        port: '465',
        secure: true,
        auth: {
            user: 'info@mesproject.id',
            pass: 'Infomesproject_123'
            // pass: 'hctcesbvroyqcwms'
        },

    });

    var mailoptions = {
        from: 'info@mesproject.id',
        to: email,
        subject: '<no-reply> SELL YOUR CAR',
        html: `<p>Halo ${name} , Terima Kasih menggunakan website kami.</p><p>Anda akan menjual 1 unit Mobil ${merek} dengan model ${model} , pastikan nomor handphone anda ${tel} dapat dihubungi.</p><b>Salam dari kami. PT.CARSALE MEDAN</b>
        <p>0822-3972-0318 (dayat)</p>`
    }
    var responseText = "";
    transporter.sendMail(mailoptions, function (err, info) {
        if (err) {
            let errText = {
                "message": "Kirim Email Gagal"
            }
            responseText = "Kirim Email Gagal";
            // responseJson(res,err,400)
            console.log(err)
        } else {
            let successText = `Sudah Terkirim ke Email ${email}`
            // responseJson(res,successText,200)
            return "res"
            responseText = successText
        }
    });
    transporter.close();
}