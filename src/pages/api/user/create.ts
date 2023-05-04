import { prisma } from "../../../db/prisma"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async function handler(req, res) {
  const { body } = req;

  var md5 = require('md5');

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      cpf: body.cpf,
      password: md5(body.password),
      role: body.role,
    }});

  res.json(user)
  
}
