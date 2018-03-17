/**
 * @typedef Material
 * @property {number} id
 * @property {number} count
 */
/**
 * @typedef Item
 * @property {number} id
 * @property {string} name
 * @property {string} price
 * @property {Array.<Material>} materials
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

        /** @type {Array.<Item>} */
        var items = data.items;
        /** @type {Array.<itemView>} */
        // var itemViews = items.map(x => ({
        //     item: x,
        //     price: reduce(items, x.id)
        // }));

        // render(itemViews);
        items.forEach(x => console.log(x.name, reduce(items, x)));
    }

    /**
     * @param {Array.<Item>} items
     * @param {Item} item
     * @return {total}
     */
    function reduce(items, item) {
        function getItem(id) {
            return items.find(x => x.id === id);
        }

        /**
         * @param {Item} head
         * @param {Array.<Item>} stack
         */
        function dfs(head, stack) {
            return (head.materials || []).concat(stack);
        }

        // function loop(Result, stack) {
        //     if (!stack.length) return Result;

        //     var [head, ...tail] = stack;
        //     head = getItem(head.id);
        //     Result = {
        //         price: Result.price + (head.price || 0)
        //     };

        //     return loop(Result, dfs(head, tail));
        // }

        /**
         * @param {Result} result
         * @param {Item} stack
         * @return {Result}
         */
        function loop(result, stack) {
            var priceSum = 0;
            if (stack.materials) {
                var results = stack.materials.map(x => loop({}, getItem(x.id)));
                priceSum = results.reduce((p, x, i) => p + (x.price || 0) * stack.materials[i].count, 0);
            }

            return {
                price: stack.price || priceSum,
                profit: stack.materials ?
                    ((stack.price || priceSum) - priceSum) :
                    0
            };
        }

        return loop({}, item);
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
