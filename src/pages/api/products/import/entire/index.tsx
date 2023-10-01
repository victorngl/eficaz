import { prisma } from "../../../../../db/prisma";
import xlsx from 'xlsx';
import fs from 'fs';
import { IncomingForm } from "formidable-serverless";
import { Product } from "../../../../../../types/types";


export default async function handler(req, res) {

    if (req.method === 'POST') {
        const form = new IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao processar o arquivo' });
            }

            const { file } = files;

            if (!file) {
                return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
            }

            try {
                const fileBuffer = fs.readFileSync(file.path);

                const workbook = xlsx.read(fileBuffer, { type: 'buffer' });

                const sheet = workbook.Sheets[workbook.SheetNames[0]];

                const data: Product[] = xlsx.utils.sheet_to_json(sheet);


                if (sheet['A1'].v !== 'name' || sheet['B1'].v !== 'unity' || sheet['C1'].v !== 'price' || sheet['D1'].v !== 'supplier' || sheet['E1'].v !== 'quantity') {
                    return res.status(400).json({ error: 'A planilha precisa estar dentro do padrão para ser importada, por favor baixe a planilha de exemplo na tela anterior.' });
                }

                console.log('1')
                //DELETANDO TODO O BANCO DE DADOS
                const deleteResult = await prisma.product.deleteMany({});
                console.log(deleteResult)


                let i = 0;
                // Faça a inserção dos dados no banco de dados usando o Prisma
                for (const item of data) {
                    i++
                    
                    await prisma.product.create({
                        data: {
                            name: item.name,
                            unity: item.unity,
                            price: Number(item.price),
                            supplier: item.supplier,
                            quantity: item.quantity,
                            // Mapeie os campos do modelo conforme necessário
                        } as Product
                    });
 
                }


                return res.status(200).json({ message: 'Planilha importada com sucesso. ( ' + i + ((i>1)?'itens ':'item ') + ((i>1)?'foram':'foi') + ' importado'+ ((i>1)?'s.':'.') + ')'});
            }
            catch (error) {
                return res.status(500).json({ error: 'Erro ao importar a planilha' });
            }
        });

    } else {
        return res.status(405).json({ error: 'Método não permitido' });
    }
}


export const config = {
    api: {
        bodyParser: false,
    },
};