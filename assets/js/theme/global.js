import 'focus-within-polyfill';
import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import carousel from './common/carousel';
import svgInjector from './global/svg-injector';

export default class Global extends PageManager {
    onReady() {
        const { cartId, secureBaseUrl } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        svgInjector();
        console.log('Ishu');


        let token = document.querySelector('[data-token]').getAttribute('data-token');


        fetch('/graphql',{
          method: 'POST',
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer' + token
          },
          body : JSON.stringify({
              query:`
              query MyQuery {
                site {
                    product(entityId: 112) {
                    options {
                        edges {
                        node {
                            displayName
                            values {
                            edges {
                                node {
                                label
                                }
                            }
                            }
                        }
                        }
                    }
                    }
                }
            }
              `
          }),
      })
      .then(res => res.json())
      .then(json=>{
          const output = json.data.site.product.options.edges[0].node;
          console.log(output.displayName)
          console.log(output.values.edges[0].node.label)
      })
    }
}
