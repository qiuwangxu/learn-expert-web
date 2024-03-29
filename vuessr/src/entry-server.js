import { createApp } from './app';

export default context => {
    return new Promise((resolve, reject) => {

        const { app, router } = createApp();
        router.push(context.url);

        router.onReady(()=> {

            const matchedComponents = router.getMatchedComponents();

            if (!matchedComponents.length) {
                return reject({ code: 404 });
            }

            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                      })
                }
            })).then(_ => {
                context.state = store.state
                resolve(app);
            }).catch(reject);
            
        }, reject)

    }).catch(new Function());
}