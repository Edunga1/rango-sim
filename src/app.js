/**
 * @typedef material
 * @property {number} id
 * @property {number} count
 */
/**
 * @typedef item
 * @property {number} id
 * @property {string} name
 * @property {string} price
 * @property {Array.<material>} materials
 */

(function () {
    ajax('GET', '/src/data.json', handler);

    function handler(status, data) {
        if (status !== 200) return;

        /** @type {Array.<item>} */
        var items = data.items;
        items.forEach(x => {
            console.log(x.name, price(items, x.id));
        });
    }

    /**
     * @param {Array.<item>} items
     * @param {number} code
     * @return {number} price
     */
    function price(items, code) {
        var item = items.find(x => x.id === code);

        if (!item) return 0;
        if (!Array.isArray(item.materials) || !item.materials.length) return item.price || 0;
        return item.materials.reduce((pre, x) =>
            pre + (price(items, x.id) * x.count),
            0);
    }
})();
