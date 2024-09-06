import {
  Category,
  SubCategory,
  Product,
  CategoryHeroProduct,
} from '../types/backend-types';

const categories: Category[] = [
  {
    id: 1,
    name: 'Clothing',
    description:
      'Llama inspired clothing that embraces all cultures and promotes well-being and self-love.',
    offered: true,
  },
  {
    id: 2,
    name: 'Accessories',
    description: 'Find the perfect gift for your loved ones. Or yourself.',
    offered: true,
  },
  {
    id: 3,
    name: 'Drinkware',
    description:
      'Llama inspired drinkware. Not just usable but also beautiful.',
    offered: true,
  },
];

const subCategories: SubCategory[] = [
  {
    id: 1,
    name: 'T-shirts',
    description: 'T-shirts like never before. Llama inspired, human approved.',
    categoryId: 1,
    offered: true,
  },
  {
    id: 2,
    name: 'Hoodies',
    description: 'Hoodies for days good and bad. Cool design to keep you warm.',
    categoryId: 1,
    offered: true,
  },
  {
    id: 3,
    name: 'Sweatshirts',
    description: 'Sweatshirts that make you sweat. In a good way.',
    categoryId: 1,
    offered: true,
  },
  {
    id: 4,
    name: 'Shorts',
    description: 'Shorts for all occasions. Llama inspired.',
    categoryId: 1,
    offered: true,
  },
  {
    id: 5,
    name: 'Candles',
    description: 'Candles to suit every mood. Handmade with love.',
    categoryId: 2,
    offered: true,
  },
  {
    id: 6,
    name: 'Desk Mats',
    description: 'Desk mats that make your desk look good. And feel good',
    categoryId: 2,
    offered: true,
  },
  {
    id: 7,
    name: 'Notebooks',
    description: 'Notebooks that inspire creativity. And productivity.',
    categoryId: 2,
    offered: true,
  },
  {
    id: 8,
    name: 'Bottles',
    description: 'Bottles that fit your style. And your bag. And your life.',
    categoryId: 3,
    offered: true,
  },
  {
    id: 9,
    name: 'Mugs',
    description:
      'Mugs to empower your mornings. And your evenings. And your nights.',
    categoryId: 3,
    offered: true,
  },
  {
    id: 10,
    name: 'Tumblers',
    description: 'Tumblers that keep your drinks hot. Or cold. Or just right.',
    categoryId: 3,
    offered: true,
  },
];

const products: Product[] = [
  {
    id: 1,
    name: 'Llama Chinese Qipao Candle',
    description:
      'Soy wax scented candle with a label showcasing a Llama in a traditional Chinese qipao, holding a paper lantern.',
    categoryId: 2,
    subCategoryId: 5,
    price: 25,
    previousPrice: 34,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716258/llama_chinese_qipao_candle_ojvfpw.png',
    offered: true,
  },
  {
    id: 2,
    name: 'Llama Moroccan Candle',
    description:
      'Scented candle with a label featuring a Llama in traditional Moroccan attire, surrounded by intricate mosaic tiles',
    categoryId: 2,
    subCategoryId: 5,
    price: 27,
    previousPrice: 30,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716256/llama_moroccan_candle_nkdxce.png',
    offered: true,
  },
  {
    id: 3,
    name: 'Llama Mauve Candle',
    description:
      'Candle featuring an adorable Llama wearing a mauve scarf sitting besides fireplace.',
    categoryId: 2,
    subCategoryId: 5,
    price: 20,
    previousPrice: 25,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716257/llama_mauve_candle_ieopkf.png',
    offered: true,
  },
  {
    id: 4,
    name: 'Llama Comfy Desk Mat',
    description:
      'Desk mat with a cute Llama lying on a comfy pillow, reading a book under a cozy lamp.',
    categoryId: 2,
    subCategoryId: 6,
    price: 15,
    previousPrice: 15,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716247/llama_comfy_book_desk_mat_qp8eb7.png',
    offered: true,
  },
  {
    id: 5,
    name: 'Llama Tech Desk Mat',
    description:
      'Desk mat featuring an adorable Llama working at a computer, with glasses perched on its nose and a steaming cup of coffee by its side.',
    categoryId: 2,
    subCategoryId: 6,
    price: 20,
    previousPrice: 25,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716246/llama_programmer_desk_mat_xvic0t.png',
    offered: true,
  },
  {
    id: 6,
    name: 'Llama Cat Cloud Notebook',
    description:
      'Notebook featuring an adorable Llama sitting next to a cute cat between clouds.',
    categoryId: 2,
    subCategoryId: 7,
    price: 20,
    previousPrice: 25,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716238/llama_cat_cloud_notebook_iynocd.png',
    offered: true,
  },
  {
    id: 7,
    name: 'Llama Bonefire Notebook',
    description:
      'Illuminating notebook with a guitar playing Llama beside a bonefire on a star filled night.',
    categoryId: 2,
    subCategoryId: 7,
    price: 25,
    previousPrice: 25,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716237/llama_green_guitar_bonefore_notebook_pl8gzx.png',
    offered: true,
  },
  {
    id: 8,
    name: 'Llama Campfire Hoodie',
    description:
      'Hoodie featuring Llamas sitting around a campfire with a night sky filled with constellations.',
    categoryId: 1,
    subCategoryId: 2,
    price: 55,
    previousPrice: 65,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716227/llama_bonefire_group_hoody_gichfe.png',
    offered: true,
  },
  {
    id: 9,
    name: 'Llama Indian Floral Hoodie',
    description:
      'Hoodie with a Llama in traditional Indian attire surrounded by vibrant flowers.',
    categoryId: 1,
    subCategoryId: 2,
    price: 60,
    previousPrice: 70,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716226/llama_indian_kurta_hoody_qgo60t.png',
    offered: true,
  },
  {
    id: 10,
    name: 'Llama Superhero Hoodie',
    description:
      'Hoodie featuring a Llama in a superhero costume, flying through the sky with a cape.',
    categoryId: 1,
    subCategoryId: 2,
    price: 50,
    previousPrice: 60,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716226/llama_superhero_hoody_rskukl.png',
    offered: true,
  },
  {
    id: 11,
    name: 'Llama Chinese Shorts',
    description:
      'Shorts featuring two Llama in traditional Chinese attire, surrounded by paper lanterns and bamboo.',
    categoryId: 1,
    subCategoryId: 4,
    price: 30,
    previousPrice: 40,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716218/llama_chinese_shorts_augfj3.png',
    offered: true,
  },
  {
    id: 12,
    name: 'Llama Moon Shorts',
    description:
      'Shorts featuring a Llama sleeping on a crescent moon, surrounded by clouds and stars.',
    categoryId: 1,
    subCategoryId: 4,
    price: 25,
    previousPrice: 30,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716217/llama_moon_shorts_jegfxy.png',
    offered: true,
  },
  {
    id: 13,
    name: 'Llama Moon Sweatshirt',
    description:
      'Sweatshirt featuring a Llama sleeping on a crescent moon, surrounded by clouds and stars.',
    categoryId: 1,
    subCategoryId: 3,
    price: 45,
    previousPrice: 50,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716207/llama_moon_sweatshirt_amegsn.png',
    offered: true,
  },
  {
    id: 14,
    name: 'Llama Cozy Sweatshirt',
    description:
      'Sweatshirt featuring an adorable Llama reading a book under a blanket fort, with fairy lights around.',
    categoryId: 1,
    subCategoryId: 3,
    price: 50,
    previousPrice: 60,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716207/llama_reading_soothing_sweatshirt_zfa2xd.png',
    offered: true,
  },
  {
    id: 15,
    name: 'Llama Winter Sweatshirt',
    description:
      'Sweatshirt featuring a Llama wrapped in a cozy scarf, holding a cup of hot cocoa in a winter landscape.',
    categoryId: 1,
    subCategoryId: 3,
    price: 55,
    previousPrice: 65,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716206/llama_scarf_blue_sweatshirt_vucslb.png',
    offered: true,
  },
  {
    id: 16,
    name: 'Llama Japanese Kimono T-shirt',
    description:
      'T-shirt featuring an adorable Llama dressed in a traditional Japanese kimono, holding a fan and standing under a cherry blossom tree.',
    categoryId: 1,
    subCategoryId: 1,
    price: 25,
    previousPrice: 30,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716198/llama_japanese_kimono_lavender_eqhfo0.png',
    offered: true,
  },
  {
    id: 17,
    name: 'Llama Skateboard T-shirt',
    description:
      'T-shirt featuring a fun Llama riding a skateboard with a backwards cap, surrounded by graffiti-style doodles.',
    categoryId: 1,
    subCategoryId: 1,
    price: 20,
    previousPrice: 25,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716197/llama_skateboard_tshirt_gzlrie.png',
    offered: true,
  },
  {
    id: 18,
    name: 'Llama Hot Air Balloon T-shirt',
    description:
      'T-shirt featuring a adorable Llama wearing a Hawaiian lei and flying in a hot balloon, with a smile.',
    categoryId: 1,
    subCategoryId: 1,
    price: 20,
    previousPrice: 25,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716197/llama_hawaiin_lei_balloon_tshirt_yp6ik2.png',
    offered: true,
  },
  {
    id: 19,
    name: 'Llama African Tumbler',
    description:
      'Tumbler featuring a group of Llamas in traditional African attire, standing against a savanna backdrop with an acacia tree.',
    categoryId: 3,
    subCategoryId: 10,
    price: 30,
    previousPrice: 35,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716165/llama_african_tumbler_sif9ig.png',
    offered: true,
  },
  {
    id: 20,
    name: 'Llama Ushanka Tumbler',
    description:
      'Tumbler with a festive Llama wearing a ushanka hat, surrounded by snow flakes.',
    categoryId: 3,
    subCategoryId: 10,
    price: 35,
    previousPrice: 40,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716164/llama_winter_ushanka_hat_fd6xv4.png',
    offered: true,
  },
  {
    id: 21,
    name: 'Llama Japanese Kimono Bottle',
    description:
      'Stainless steel water bottle featuring a playful Llama dressed in a Japanese kimono, surrounded by cherry blossoms.',
    categoryId: 3,
    subCategoryId: 8,
    price: 40,
    previousPrice: 45,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716156/llama_japanese_kimono_bottle_yj1se5.png',
    offered: true,
  },
  {
    id: 22,
    name: 'Llama Taj Mahal Bottle',
    description:
      'Stainless steel bottle with a Llama adorned in vibrant Indian jewelry, standing in front of the Taj Mahal.',
    categoryId: 3,
    subCategoryId: 8,
    price: 45,
    previousPrice: 50,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716155/llama_taj_mahal_bottle_mxp7te.png',
    offered: true,
  },
  {
    id: 23,
    name: 'Llama Arizona Mug',
    description:
      'Mug with an adorable Llama surrounded by cacti and desert flowers.',
    categoryId: 3,
    subCategoryId: 9,
    price: 35,
    previousPrice: 40,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716144/texas_llama_mug_qhmaf8.png',
    offered: true,
  },
  {
    id: 24,
    name: 'Llama Explorer Mug',
    description:
      'Mug with an adventurous Llama surrounded by mountains and river.',
    categoryId: 3,
    subCategoryId: 9,
    price: 40,
    previousPrice: 55,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716144/llama_pastel_green_mug_dmc3mq.png',
    offered: true,
  },
  {
    id: 25,
    name: 'Llama Mauve Patterned Mug',
    description:
      'Mug with an adorable Llama among a unique inspirational pattern with a Mauve backdrop.',
    categoryId: 3,
    subCategoryId: 9,
    price: 30,
    previousPrice: 35,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716145/llama_white_mauve_mug_ub2jcb.png',
    offered: true,
  },
];

const categoryHeroProducts: CategoryHeroProduct[] = [
  {categoryId: 1, subCategoryId: 1, productId: 16},
  {categoryId: 1, subCategoryId: 2, productId: 8},
  {categoryId: 1, subCategoryId: 3, productId: 13},
  {categoryId: 1, subCategoryId: 4, productId: 11},
  {categoryId: 2, subCategoryId: 5, productId: 1},
  {categoryId: 2, subCategoryId: 6, productId: 4},
  {categoryId: 2, subCategoryId: 7, productId: 6},
  {categoryId: 3, subCategoryId: 8, productId: 21},
  {categoryId: 3, subCategoryId: 9, productId: 23},
  {categoryId: 3, subCategoryId: 10, productId: 19},
];

const heroProducts: number[] = [3, 4, 14, 23];

const getHeroProducts = () => {
  return products.filter((product) => heroProducts.includes(product.id));
};

const getSubCategories = (categoryId: number): SubCategory[] => {
  return subCategories.filter(
    (subCategory) => subCategory.categoryId === categoryId
  );
};

const getCategoryHeroProducts = (categoryId: number): Product[] => {
  const heroProductIds = categoryHeroProducts
    .filter((heroProduct) => heroProduct.categoryId === categoryId)
    .map((heroProduct) => heroProduct.productId);
  return products.filter((product) => heroProductIds.includes(product.id));
};

const getCategoryName = (id: number): string => {
  const category = categories.find((category) => category.id === id);
  if (!category) {
    throw new Error(`Invalid category ID: ${id}`);
  }
  return category.name;
};

const getSubCategoryName = (id: number): string => {
  const subCategory = subCategories.find(
    (subCategory) => subCategory.id === id
  );
  if (!subCategory) {
    throw new Error(`Invalid sub category ID: ${id}`);
  }
  return subCategory.name;
};

const getProductName = (id: number): string => {
  const product = products.find((product) => product.id === id);
  if (!product) {
    throw new Error(`Invalid product ID: ${id}`);
  }
  return product.name;
};

export const SAMPLE_DATA = {
  categories,
  subCategories,
  getSubCategories,
  getCategoryHeroProducts,
  products,
  getHeroProducts,
  getCategoryName,
  getSubCategoryName,
  getProductName,
};
