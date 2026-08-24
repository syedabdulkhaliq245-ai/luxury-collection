/* =========================================================
   LUXURY COLLECTION
   PRODUCT DATABASE
========================================================= */


/*
    Each product has:

    id
    name
    category
    type
    price
    oldPrice
    badge
    image
    description
*/


const products = [

    /* =====================================================
       WATCHES
    ===================================================== */

    {
        id: 1,

        name: "Royal Chronograph",

        category: "watches",

        type: "Luxury Watch",

        price: 24999,

        oldPrice: 29999,

        badge: "Featured",

        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85",

        description:
            "A sophisticated chronograph combining timeless design with modern precision."
    },


    {
        id: 2,

        name: "Midnight Heritage",

        category: "watches",

        type: "Luxury Watch",

        price: 18999,

        oldPrice: 22999,

        badge: "Popular",

        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",

        description:
            "A refined black timepiece designed for effortless elegance."
    },


    {
        id: 3,

        name: "Golden Elite",

        category: "watches",

        type: "Luxury Watch",

        price: 32999,

        oldPrice: 38999,

        badge: "Premium",

        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=85",

        description:
            "A statement timepiece featuring a luxurious gold-inspired finish."
    },


    {
        id: 4,

        name: "Executive Classic",

        category: "watches",

        type: "Dress Watch",

        price: 15999,

        oldPrice: 19999,

        badge: "New",

        image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=85",

        description:
            "Clean lines and understated sophistication for the modern professional."
    },


    /* =====================================================
       PHONES
    ===================================================== */

    {
        id: 5,

        name: "Titan X Pro",

        category: "phones",

        type: "Flagship Smartphone",

        price: 119999,

        oldPrice: 129999,

        badge: "Flagship",

        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=85",

        description:
            "A powerful flagship smartphone designed for exceptional performance."
    },


    {
        id: 6,

        name: "Obsidian Ultra",

        category: "phones",

        type: "Premium Smartphone",

        price: 94999,

        oldPrice: 104999,

        badge: "Premium",

        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",

        description:
            "A sleek premium smartphone combining elegant design with advanced technology."
    },


    {
        id: 7,

        name: "Apex Pro Max",

        category: "phones",

        type: "Flagship Smartphone",

        price: 109999,

        oldPrice: 119999,

        badge: "Featured",

        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=85",

        description:
            "Engineered for speed, photography and an uncompromising premium experience."
    },


    {
        id: 8,

        name: "Velvet Edge",

        category: "phones",

        type: "Premium Smartphone",

        price: 74999,

        oldPrice: 84999,

        badge: "New",

        image: "https://images.unsplash.com/photo-1592286927505-2fd0b0c4a1b4?auto=format&fit=crop&w=900&q=85",

        description:
            "A beautifully crafted smartphone with a sophisticated edge-to-edge design."
    }

];


/* =========================================================
   CURRENCY FORMATTER
========================================================= */

function formatPrice(price) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(price);

}


/* =========================================================
   FIND PRODUCT
========================================================= */

function getProductById(id) {

    return products.find(
        product =>
            product.id === Number(id)
    );

}


/* =========================================================
   GET PRODUCTS BY CATEGORY
========================================================= */

function getProductsByCategory(category) {

    if (category === "all") {

        return products;

    }

    return products.filter(
        product =>
            product.category === category
    );

}


/* =========================================================
   GET FEATURED PRODUCTS
========================================================= */

function getFeaturedProducts() {

    return products.filter(
        product =>
            product.badge === "Featured" ||
            product.badge === "Premium"
    );

}
