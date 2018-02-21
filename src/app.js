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
/**
 * @typedef itemView
 * @property {item} item
 * @property {number} price total price
 */

(function () {
    ajax('GET', '/src/data.json', handler);

    function handler(status, data) {
        if (status !== 200) return;

        /** @type {Array.<item>} */
        var items = data.items;
        /** @type {Array.<itemView>} */
        var itemViews = items.map(x => ({
            item: x,
            price: price(items, x.id)
        }));

        render(itemViews);
    }

    /**
     * @param {Array.<item>} items
     * @param {number} code
     * @return {number} total price
     */
    function price(items, code) {
        var item = items.find(x => x.id === code);

        if (!item) return 0;
        if (!Array.isArray(item.materials) || !item.materials.length) return item.price || 0;
        return item.materials.reduce((pre, x) =>
            pre + (price(items, x.id) * x.count),
            0);
    }

    /**
     * @param {Array.<itemView>} items
     */
    function render(items) {
        var html = '<table>';
        html += items.reduce((pre, x) =>
            pre + (
                '<tr>' +
                    '<td>' + x.item.name + '</td>' +
                    '<td>' + x.price + '</td>' +
                '</tr>'),
            '');
        html += '</table>';
        document.querySelector('#content').innerHTML = html;
    }
})();
