(function () {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  function loadScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'more-storese.myshopify.com',
      storefrontAccessToken: '157d47b99cc1af367ce12e227d2ca751',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      const el = document.getElementById('collection-component-1588157966426');
      el.innerHTML = '';
      ui.createComponent('collection', {
        id: brandCollectionID,
        node: el,
        moneyFormat: 'Rs.%20%7B%7Bamount%7D%7D',
        options: {
  "product": {
    "styles": {
      "product": {
        "@media(min-width: 300px)": {
          "max-width": "40%",
          "min-width": "0",
          "margin-left": "5px",
          "margin-right": "5px"
        },
        "@media (min-width: 601px)": {
          "max-width": "calc(25% - 20px)",
          "margin-left": "20px",
          "margin-bottom": "50px",
          "width": "calc(25% - 20px)"
        },
        "img": {
          "height": "80%",
          "position": "absolute",
          "left": "0",
          "right": "0",
          "top": "0"
        },
        "imgWrapper": {
          "padding-top": "calc(75% + 15px)",
          "position": "relative",
          "height": "0"
        }
      },
      "title": {
        "font-family": "Montserrat, sans-serif",
        "font-size": "1.1rem"
      },
      "button": {
        "font-size": "0.9rem",
        "font-family": "Montserrat, sans-serif",
        ":hover": {
          "background-color": "#3d4da2"
        },
        "background-color": "#242d5f",
        ":focus": {
          "background-color": "#3d4da2"
        },
        "border-radius": "15px",
        "padding-left": "20px",
        "padding-right": "20px"
      },
      "price": {
        "font-family": "Montserrat, sans-serif"
      },
      "compareAt": {
        "font-family": "Montserrat, sans-serif"
      },
      "unitPrice": {
        "font-family": "Montserrat, sans-serif"
      }
    },
    "buttonDestination": "modal",
    "contents": {
      "options": false
    },
    "text": {
      "button": "View product"
    },
    "googleFonts": [
      "Montserrat"
    ]
  },
  "productSet": {
    "styles": {
      "products": {
        "@media (min-width: 601px)": {
          "margin-left": "-20px"
        }
      }
    }
  },
  "modalProduct": {
    "contents": {
      "img": false,
      "imgWithCarousel": true,
      "button": false,
      "buttonWithQuantity": true
    },
    "styles": {
      "product": {
        "@media (min-width: 601px)": {
          "max-width": "100%",
          "margin-left": "0px",
          "margin-bottom": "0px"
        }
      },
      "button": {
        "font-family": "Montserrat, sans-serif",
        ":hover": {
          "background-color": "#3d4da2"
        },
        "background-color": "#242d5f",
        ":focus": {
          "background-color": "#3d4da2"
        },
        "border-radius": "15px",
        "padding-left": "20px",
        "padding-right": "20px"
      },
      "title": {
        "font-family": "Montserrat, sans-serif"
      },
      "price": {
        "font-family": "Montserrat, sans-serif"
      },
      "compareAt": {
        "font-family": "Montserrat, sans-serif"
      },
      "unitPrice": {
        "font-family": "Montserrat, sans-serif"
      },
      "description": {
        "font-family": "Montserrat, sans-serif"
      }
    },
    "googleFonts": [
      "Montserrat"
    ],
    "text": {
      "button": "Add to cart"
    }
  },
  "cart": {
    "styles": {
      "button": {
        "font-family": "Montserrat, sans-serif",
        ":hover": {
          "background-color": "#3d4da2"
        },
        "background-color": "#242d5f",
        ":focus": {
          "background-color": "#3d4da2"
        },
        "border-radius": "15px"
      }
    },
    "text": {
      "total": "Subtotal",
      "button": "Checkout"
    },
    "popup": false,
    "googleFonts": [
      "Montserrat"
    ]
  },
  "toggle": {
    "styles": {
      "toggle": {
        "font-family": "Montserrat, sans-serif",
        "background-color": "#242d5f",
        ":hover": {
          "background-color": "#3d4da2"
        },
        ":focus": {
          "background-color": "#3d4da2"
        }
      }
    },
    "googleFonts": [
      "Montserrat"
    ]
  }
},
      });
    });
  }
})();
