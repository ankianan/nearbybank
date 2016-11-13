let { page } = window.interfaces;



//Configuration
/*page.start({
    popstate: true
});
*/
export default (actions) => {
    page('/', () => {
        console.log("hello1")
        page.redirect('/bank/nearby');
    });

    page('/bank/nearby', () => {
        console.log("hello2")
        actions.bankNearBy();
    })

    page('/bank/detail/:name', (ctx) => {
        actions.bankDetail(ctx.params.name);
    })

    page('*', (ctx) => {
        console.log(ctx);
    })
}
