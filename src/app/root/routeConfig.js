let { page } = window.interfaces;
import * as routesStatic from "./routeStatic.js";


//Configuration
/*page.start({
    popstate: true
});
*/
export default (actions) => {
    page('/', () => {
        console.log("hello1")
        page.redirect(routesStatic.BANK_NEARBY);
    });

    page(routesStatic.BANK_NEARBY, () => {
        console.log("hello2")
        actions.bankNearBy();
    })

    page(routesStatic.BANK_DETAIL+':name', (ctx) => {
        actions.bankDetail(ctx.params.name);
    })

    page('*', (ctx) => {
        console.log(ctx);
    })
}
