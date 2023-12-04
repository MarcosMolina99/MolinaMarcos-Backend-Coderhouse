import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "Email",
    auth: {
        user: "marcosgmolina998@gmail.com",
        pass: "password",
    }
})


function recoveringEmail(destinatary, link){
    const option = {
        from: "mail@gmail.com",
        to: destinatary,
        subject: "Recovering password",
        text: `Click here to reset your password: ${link}`
    }

    transporter.sendMail(option, (info,error) =>{
        if(error){
            console.log("Error recovering password", error);
        }else{
            console.log("Email sent", info.response);
        }
    })
}

export{recoveringEmail}