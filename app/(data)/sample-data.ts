import {Category, SubCategory, Product} from '../types/backend-types';

const categoriesMap = new Map<number, Category>([
  [
    1,
    {
      id: 1,
      name: 'Clothing',
      description: 'T-shirts, hoodies, and sweatshirts',
    },
  ],
  [
    2,
    {
      id: 2,
      name: 'Accessories',
      description: 'Candles, desk mats, and notebooks',
    },
  ],
  [
    3,
    {
      id: 3,
      name: 'Drinkware',
      description: 'Mugs and tumblers',
    },
  ],
]);

const subCategoriesMap = new Map<number, SubCategory>([
  [
    1,
    {
      id: 1,
      name: 'T-shirts',
      description: 'T-shirts',
      heroProduct: 16,
    },
  ],
  [
    2,
    {
      id: 2,
      name: 'Hoodies',
      description: 'Hoodies',
      heroProduct: 8,
    },
  ],
  [
    3,
    {
      id: 3,
      name: 'Sweatshirts',
      description: 'Sweatshirts',
      heroProduct: 13,
    },
  ],
  [
    4,
    {
      id: 4,
      name: 'Shorts',
      description: 'Shorts',
      heroProduct: 11,
    },
  ],
  [
    5,
    {
      id: 5,
      name: 'Candles',
      description: 'Candles',
      heroProduct: 1,
    },
  ],
  [
    6,
    {
      id: 6,
      name: 'Desk Mats',
      description: 'Desk Mats',
      heroProduct: 4,
    },
  ],
  [
    7,
    {
      id: 7,
      name: 'Notebooks',
      description: 'Notebooks',
      heroProduct: 6,
    },
  ],
  [
    8,
    {
      id: 8,
      name: 'Bottles',
      description: 'Bottles',
      heroProduct: 21,
    },
  ],
  [
    9,
    {
      id: 9,
      name: 'Mugs',
      description: 'Mugs',
      heroProduct: 23,
    },
  ],
  [
    10,
    {
      id: 10,
      name: 'Tumblers',
      description: 'Tumblers',
      heroProduct: 19,
    },
  ],
]);

const categorySubCategoriesMapping = [
  {
    categoryId: 1,
    subCategoryId: 1,
  },
  {
    categoryId: 1,
    subCategoryId: 2,
  },
  {
    categoryId: 1,
    subCategoryId: 3,
  },
  {
    categoryId: 1,
    subCategoryId: 4,
  },
  {
    categoryId: 2,
    subCategoryId: 5,
  },
  {
    categoryId: 2,
    subCategoryId: 6,
  },
  {
    categoryId: 2,
    subCategoryId: 7,
  },
  {
    categoryId: 3,
    subCategoryId: 8,
  },
  {
    categoryId: 3,
    subCategoryId: 9,
  },
  {
    categoryId: 3,
    subCategoryId: 10,
  },
];

const products: Product[] = [
  {
    id: 1,
    name: 'Llama Chinese Qipao Candle',
    description:
      'Soy wax scented candle with a label showcasing a Llama in a traditional Chinese qipao, holding a paper lantern.',
    category: 2,
    subCategory: 5,
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
    category: 2,
    subCategory: 5,
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
    category: 2,
    subCategory: 5,
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
    category: 2,
    subCategory: 6,
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
    category: 2,
    subCategory: 6,
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
    category: 2,
    subCategory: 7,
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
    category: 2,
    subCategory: 7,
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
    category: 1,
    subCategory: 2,
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
    category: 1,
    subCategory: 2,
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
    category: 1,
    subCategory: 2,
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
    category: 1,
    subCategory: 4,
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
    category: 1,
    subCategory: 4,
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
    category: 1,
    subCategory: 3,
    price: 45,
    previousPrice: 50,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716207/llama_moon_sweatshirt_amegsn.png',
    offered: true,
  },
  {
    id: 14,
    name: 'Llama Soothing Reader Sweatshirt',
    description:
      'Sweatshirt featuring an adorable Llama reading a book under a blanket fort, with fairy lights around.',
    category: 1,
    subCategory: 3,
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
    category: 1,
    subCategory: 3,
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
    category: 1,
    subCategory: 1,
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
    category: 1,
    subCategory: 1,
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
    category: 1,
    subCategory: 1,
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
    category: 3,
    subCategory: 10,
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
    category: 3,
    subCategory: 10,
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
    category: 3,
    subCategory: 8,
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
    category: 3,
    subCategory: 8,
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
    category: 3,
    subCategory: 9,
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
    category: 3,
    subCategory: 9,
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
    category: 3,
    subCategory: 9,
    price: 30,
    previousPrice: 35,
    imageUrl:
      'https://res.cloudinary.com/dbbfm4bbc/image/upload/v1724716145/llama_white_mauve_mug_ub2jcb.png',
    offered: true,
  },
];

const heroProducts: number[] = [1, 11, 16, 19];

const getHeroProducts = () => {
  return products.filter((product) => heroProducts.includes(product.id));
};

const getSubCategories = (categoryId: number): SubCategory[] => {
  // confirm category Id is valid
  if (!categoriesMap.has(categoryId)) {
    throw new Error(`Invalid category ID: ${categoryId}`);
  }
  const subCategories = categorySubCategoriesMapping
    .filter((mapping) => mapping.categoryId === categoryId)
    .map((mapping) => subCategoriesMap.get(mapping.subCategoryId));

  // confirm none of the sub categories are undefined
  if (subCategories.some((subCategory) => !subCategory)) {
    throw new Error('Invalid sub category data');
  }

  return subCategories as SubCategory[];
};

const getCategoryHeroProducts = (categoryId: number): Product[] => {
  const subCategories = getSubCategories(categoryId);

  const heroProducts = subCategories.map((subCategory) =>
    products.find((product) => product.id === subCategory.heroProduct)
  );

  // confirm none of the hero products are undefined
  if (heroProducts.some((product) => !product)) {
    throw new Error('Unable to retrieve hero products');
  }

  return heroProducts as Product[];
};

export const SAMPLE_DATA = {
  categoriesMap,
  subCategoriesMap,
  getSubCategories,
  getCategoryHeroProducts,
  categorySubCategoriesMapping,
  products,
  getHeroProducts,
};