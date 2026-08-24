/* =========================================================
   LUXURY COLLECTION
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   01. ELEMENTS
========================================================= */

const featuredProducts =
    document.getElementById("featuredProducts");

const cartCount =
    document.getElementById("cartCount");

const searchButton =
    document.getElementById("searchButton");

const searchOverlay =
    document.getElementById("searchOverlay");

const searchClose =
    document.getElementById("searchClose");

const searchForm =
    document.getElementById("searchForm");

const searchInput =
    document.getElementById("searchInput");

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const mobileMenuClose =
    document.getElementById("mobileMenuClose");

const newsletterForm =
    document.getElementById("newsletterForm");


/* =========================================================
   02. LOCAL STORAGE
========================================================= */


/*
    The browser stores our cart and wishlist
    locally.

    No account or database is required.
*/


let cart = JSON.parse(
    localStorage.getItem(
        "luxuryCollectionCart"
    )
) || [];


let wishlist = JSON.parse(
    localStorage.getItem(
        "luxuryCollectionWishlist"
    )
) || [];


/* =========================================================
   03. SAVE CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        "luxuryCollectionCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   04. SAVE WISHLIST
========================================================= */

function saveWishlist() {

    localStorage.setItem(
        "luxuryCollectionWishlist",
        JSON.stringify(wishlist)
    );

}


/* =========================================================
   05. UPDATE CART COUNT
========================================================= */

function updateCartCount() {

    if (!cartCount) return;


    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent =
        totalItems;

}


/* =========================================================
   06. CREATE PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const isWishlisted =
        wishlist.includes(product.id);


    return `

        <article
            class="product-card"
            data-product-id="${product.id}"
        >

            <div class="product-image">

                ${
                    product.badge
                        ? `
                            <span class="product-badge">
                                ${product.badge}
                            </span>
                          `
                        : ""
                }


                <button
                    class="wishlist-button ${
                        isWishlisted
                            ? "wishlist-active"
                            : ""
                    }"
                    data-wishlist-id="${product.id}"
                    aria-label="Add to wishlist"
                >

                    ${isWishlisted ? "♥" : "♡"}

                </button>


                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.type}
                </span>


                <h3 class="product-name">
                    ${product.name}
                </h3>


                <p class="product-price">

                    ${formatPrice(product.price)}

                    ${
                        product.oldPrice
                            ? `
                                <del>
                                    ${formatPrice(
                                        product.oldPrice
                                    )}
                                </del>
                              `
                            : ""
                    }

                </p>

            </div>

        </article>

    `;

}


/* =========================================================
   07. DISPLAY FEATURED PRODUCTS
========================================================= */

function displayFeaturedProducts() {

    if (!featuredProducts) return;


    const featured =
        getFeaturedProducts()
            .slice(0, 4);


    featuredProducts.innerHTML =
        featured
            .map(createProductCard)
            .join("");


    attachWishlistEvents();

}


/* =========================================================
   08. WISHLIST
========================================================= */

function attachWishlistEvents() {

    const wishlistButtons =
        document.querySelectorAll(
            "[data-wishlist-id]"
        );


    wishlistButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();


                const productId =
                    Number(
                        button.dataset.wishlistId
                    );


                toggleWishlist(productId);

            }
        );

    });

}


/* =========================================================
   09. TOGGLE WISHLIST
========================================================= */

function toggleWishlist(productId) {

    const existingIndex =
        wishlist.indexOf(productId);


    if (existingIndex === -1) {

        wishlist.push(productId);

        showNotification(
            "Added to your wishlist ♥"
        );

    } else {

        wishlist.splice(
            existingIndex,
            1
        );

        showNotification(
            "Removed from your wishlist"
        );

    }


    saveWishlist();


    /*
        Re-render the homepage products
        so the heart changes immediately.
    */

    displayFeaturedProducts();


    /*
        If the shop page exists,
        refresh it too.
    */

    if (
        typeof displayShopProducts ===
        "function"
    ) {

        displayShopProducts();

    }

}


/* =========================================================
   10. SEARCH OPEN
========================================================= */

function openSearch() {

    if (!searchOverlay) return;


    searchOverlay.classList.add(
        "active"
    );


    document.body.classList.add(
        "search-open"
    );


    setTimeout(
        () => {

            if (searchInput) {

                searchInput.focus();

            }

        },
        300
    );

}


/* =========================================================
   11. SEARCH CLOSE
========================================================= */

function closeSearch() {

    if (!searchOverlay) return;


    searchOverlay.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "search-open"
    );

}


/* =========================================================
   12. SEARCH BUTTON
========================================================= */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        openSearch
    );

}


/* =========================================================
   13. SEARCH CLOSE BUTTON
========================================================= */

if (searchClose) {

    searchClose.addEventListener(
        "click",
        closeSearch
    );

}


/* =========================================================
   14. SEARCH OVERLAY BACKGROUND
========================================================= */

if (searchOverlay) {

    searchOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                searchOverlay
            ) {

                closeSearch();

            }

        }
    );

}


/* =========================================================
   15. SEARCH FORM
========================================================= */

if (searchForm) {

    searchForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const searchValue =
                searchInput.value.trim();


            if (!searchValue) {

                searchInput.focus();

                return;

            }


            /*
                Send the search term to shop.html.
            */

            window.location.href =
                `shop.html?search=${encodeURIComponent(
                    searchValue
                )}`;

        }
    );

}


/* =========================================================
   16. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeSearch();

            closeMobileMenu();

        }

    }
);


/* =========================================================
   17. MOBILE MENU OPEN
========================================================= */

function openMobileMenu() {

    if (!mobileMenu) return;


    mobileMenu.classList.add(
        "active"
    );


    document.body.classList.add(
        "menu-open"
    );

}


/* =========================================================
   18. MOBILE MENU CLOSE
========================================================= */

function closeMobileMenu() {

    if (!mobileMenu) return;


    mobileMenu.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "menu-open"
    );

}


/* =========================================================
   19. MOBILE MENU BUTTON
========================================================= */

if (menuButton) {

    menuButton.addEventListener(
        "click",
        openMobileMenu
    );

}


/* =========================================================
   20. MOBILE MENU CLOSE
========================================================= */

if (mobileMenuClose) {

    mobileMenuClose.addEventListener(
        "click",
        closeMobileMenu
    );

}


/* =========================================================
   21. MOBILE MENU LINKS
========================================================= */

if (mobileMenu) {

    const mobileLinks =
        mobileMenu.querySelectorAll(
            "a"
        );


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });

}


/* =========================================================
   22. NEWSLETTER
========================================================= */

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const emailInput =
                newsletterForm.querySelector(
                    "input[type='email']"
                );


            const email =
                emailInput.value.trim();


            if (!email) return;


            showNotification(
                "Thank you for joining Luxury Collection."
            );


            emailInput.value = "";

        }
    );

}


/* =========================================================
   23. NOTIFICATION
========================================================= */

function showNotification(message) {


    /*
        Create notification element
        dynamically.
    */


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "luxury-notification";


    notification.textContent =
        message;


    document.body.appendChild(
        notification
    );


    /*
        Add styles directly so we
        don't need another CSS file.
    */

    Object.assign(
        notification.style,
        {

            position: "fixed",

            bottom: "25px",

            right: "25px",

            zIndex: "9999",

            maxWidth: "320px",

            padding: "16px 22px",

            border:
                "1px solid rgba(201,164,92,0.45)",

            background: "#111",

            color: "#f5f3ee",

            fontSize: "0.75rem",

            letterSpacing: "0.04em",

            boxShadow:
                "0 15px 50px rgba(0,0,0,0.5)",

            transform:
                "translateY(20px)",

            opacity: "0",

            transition:
                "0.3s ease"

        }

    );


    /*
        Animate in.
    */

    requestAnimationFrame(
        () => {

            notification.style.transform =
                "translateY(0)";

            notification.style.opacity =
                "1";

        }
    );


    /*
        Remove after 3 seconds.
    */

    setTimeout(
        () => {

            notification.style.transform =
                "translateY(20px)";

            notification.style.opacity =
                "0";


            setTimeout(
                () => {

                    notification.remove();

                },
                300
            );

        },
        3000
    );

}


/* =========================================================
   24. PRODUCT CARD CLICK
========================================================= */

document.addEventListener(
    "click",
    event => {


        /*
            Find the product card
            that was clicked.
        */

        const card =
            event.target.closest(
                ".product-card"
            );


        if (!card) return;


        /*
            Don't redirect if the
            wishlist button was clicked.
        */

        if (
            event.target.closest(
                ".wishlist-button"
            )
        ) {

            return;

        }


        const productId =
            card.dataset.productId;


        /*
            Product page will be created
            later.
        */

        if (productId) {

            window.location.href =
                `product.html?id=${productId}`;

        }

    }
);


/* =========================================================
   25. INITIALIZE WEBSITE
========================================================= */

function initializeWebsite() {

    /*
        Display products.
    */

    displayFeaturedProducts();


    /*
        Update cart number.
    */

    updateCartCount();

}


/* =========================================================
   26. START
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeWebsite
    );

} else {

    initializeWebsite();

}
