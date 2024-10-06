import { PrismaClient } from '@prisma/client';

import { provinceVN } from '@utils/provinceVN';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      email: 'admin@gmail.com',
      password: '123123a',
      role: 'ADMIN',
      name: 'Admin',
      phone_number: '0987654321',
      address: 'Sơn Trà Đà Nẵng',
    },
  });

  await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      email: 'vnfood@gmail.com',
      password: '123123a',
      role: 'USER',
      name: 'Nguyễn Văn A',
      phone_number: '0987654321',
      address: 'Sơn Trà Đà Nẵng',
    },
  });

  await prisma.region.createMany({
    data: [{ name: 'NORTH' }, { name: 'CENTRAL' }, { name: 'SOUTH' }],
  });

  for (let i = 1; i <= provinceVN.length; i++) {
    await prisma.province.upsert({
      where: { id: i },
      update: {},
      create: {
        name: provinceVN[i - 1].name,
        region_id: provinceVN[i - 1].regionId,
      },
    });
  }

  await prisma.shop.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Quán Hải Sản ÔNG MINH',
      address: '94 Võ Nguyên Giáp, Mân Thái, Sơn Trà, Đà Nẵng',
      phone_number: '0987654321',
      description:
        'BỌ BIỂN - VUA HẢI SẢN BIỂN SÂU. Hàng luôn được rộng sống tại hồ nên bao chắc khoẻ, mời quý khách hàng ghé thưởng thức nhé',
      image:
        'https://firebasestorage.googleapis.com/v0/b/file-storage-6ac01.appspot.com/o/vietnam-food%2F415973940_352661860845292_8049997340613527946_n.jpg?alt=media&token=d6284447-91e2-4b6e-85ed-e41b55f82621',
      region_id: 2,
      province_id: 37,
      status: 'APPROVED',
    },
  });

  await prisma.shop.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Cửa hàng 2',
      address: '94 Võ Nguyên Giáp, Mân Thái, Sơn Trà, Đà Nẵng',
      phone_number: '0987654321',
      description: 'Mô tả cửa hàng 2',
      image:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
      region_id: 2,
      province_id: 37,

      status: 'APPROVED',
    },
  });

  await prisma.shopFood.upsert({
    where: { id: 1 },
    update: {},
    create: {
      shop_id: 1,
      food: 'Mì Quảng',
    },
  });

  await prisma.shopFood.upsert({
    where: { id: 2 },
    update: {},
    create: {
      shop_id: 1,
      food: 'Bún bò Huế',
    },
  });

  await prisma.shopFood.upsert({
    where: { id: 3 },
    update: {},
    create: {
      shop_id: 1,
      food: 'Bún đậu mắm tôm',
    },
  });

  await prisma.shop.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Cửa hàng 3',
      address: '144 Xuân Thủy, Cầu Giấy, Hà Nội',
      phone_number: '0987654321',
      description: 'Mô tả cửa hàng 2',
      image:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
      region_id: 1,
      province_id: 18,
      status: 'APPROVED',
    },
  });

  await prisma.shop.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Cửa hàng 4',
      address: '123 Lê Lợi, Quận 1, TP Hồ Chí Minh',
      phone_number: '0987654321',
      description: 'Mô tả cửa hàng 2',
      image:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
      region_id: 3,
      province_id: 57,
      status: 'APPROVED',
    },
  });

  await prisma.story.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Mì Quảng',
      featured_image:
        'https://firebasestorage.googleapis.com/v0/b/file-storage-6ac01.appspot.com/o/vietnam-food%2FRight.png?alt=media&token=fc040898-9f3e-451c-a0c5-ed0be0cb9a97',
      description:
        'Mì Quảng kể về một món ăn phản ánh sự sáng tạo và khéo léo trong việc sử dụng nguyên liệu đơn giản, phổ biến như bánh tráng, nước luộc, thịt heo, tôm, và rau sống để tạo ra một bữa ăn ngon miệng và độc đáo.',
      region_id: 2,
      user_id: 2,
      content: 'Nội dung mì quảng',
      cooking_method: 'Cách nấu mì quảng',
    },
  });

  await prisma.story.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Bún bò Huế',
      featured_image:
        'https://firebasestorage.googleapis.com/v0/b/file-storage-6ac01.appspot.com/o/vietnam-food%2Fbunbohue.png?alt=media&token=cd381823-d9c9-4189-abfd-98920709d3fb',
      description:
        'Bún bò Huế có nguồn gốc từ xứ Huế, nơi mà nền ẩm thực phát triển mạnh mẽ và đa dạng. Món ăn này không chỉ là biểu tượng của văn hóa ẩm thực miền Trung mà còn kể lên câu chuyện của những người làm nghề ẩm thực, những người nấu nước dùng từ xương bò cũng như nấu bún và chế biến thịt bò.',
      user_id: 2,
      content: 'Bún bò Huế',
      cooking_method: 'Cách nấu Bún bò Huế',
      region_id: 2,
    },
  });

  console.log('seed success');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
