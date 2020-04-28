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
      const el = document.getElementById('collection-component-1586969812920');
      el.innerHTML = '';
      ui.createComponent('collection', {
        id: brandCollectionID,
        node: el,
        moneyFormat: 'Rs.%20%7B%7Bamount%7D%7D',
        options: {
          "product": {
            "styles": {
              "product": {
                "@media (max-width: 600px)": {
                  "max-width": "calc(25% - 20px)",
                  "margin-left": "20px",
                  "margin-bottom": "50px",
                  "width": "calc(25% - 20px)",
                  "min-width": "40%"

                },
                "img": {
                  "height": "calc(100% - 15px)",
                  "position": "absolute",
                  "left": "0",
                  "right": "0",
                  "top": "0",
                  // "flex": "50%",
                  // "max-width": "45%",
                  // "padding": "0 0"
                },
                "imgWrapper": {
                  "padding-top": "calc(75% + 15px)",
                  "position": "relative",
                  "height": "0"
                }
              },
              "title": {
                "font-size": "14px"
              },
              "button": {
                ":hover": {
                  "background-color": "#3d4da2"
                },
                "background-color": "#242d5f",
                ":focus": {
                  "background-color": "#3d4da2"
                },
                "border-radius": "7px",
                "padding-left": "5px",
                "padding-right": "5px"
              }
            },
            "contents": {
              "button": false,
              "buttonWithQuantity": true
            },
            "text": {
              "button": "Add to cart"
            }
          },
          "productSet": {
            "styles": {
              "products": {
                "@media (min-width: 300px)": {
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
                "@media (min-width: 300px)": {
                  "max-width": "100%",
                  "margin-left": "0px",
                  "margin-bottom": "0px"
                }
              },
              "button": {
                ":hover": {
                  "background-color": "#3d4da2"
                },
                "background-color": "#242d5f",
                ":focus": {
                  "background-color": "#3d4da2"
                },
                "border-radius": "7px",
                "padding-left": "28px",
                "padding-right": "28px"
              }
            },

            "text": {
              "button": "Add to cart"
            }
          },
          "cart": {
            "styles": {
              "button": {
                ":hover": {
                  "background-color": "#3d4da2"
                },
                "background-color": "#242d5f",
                ":focus": {
                  "background-color": "#3d4da2"
                },
                "border-radius": "7px"
              }
            },
            "text": {
              "total": "Subtotal",
              "button": "Checkout"
            },
            "popup": false
          },
          "toggle": {
            "styles": {
              "toggle": {
                "background-color": "#242d5f",
                ":hover": {
                  "background-color": "#3d4da2"
                },
                ":focus": {
                  "background-color": "#3d4da2"
                }
              }
            }
          }
        },
      });
    });
  }
})();
