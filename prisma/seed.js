
const { PrismaClient } = require('@prisma/client');
const { medicinesSeed } = require('./data.js');
const prisma = new PrismaClient();

const load = async () =>{
    try {
      await prisma.medicinesApi.createMany({
        data: medicinesSeed
      })

      console.log('Medicines are created');

    } catch (error) {
      console.log(error);        
    } finally {
        await prisma.$disconnect();
    }
}
load()

