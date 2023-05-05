import { prisma } from "../../../db/prisma"

export default async function handler(req, res) {

    const emailId = req.query.id

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    email: 
                        emailId
                    ,
                },
                {
                    id: 
                        Number(emailId)
                    ,
                },
            ],
        }
    })

    res.json(user)
}
