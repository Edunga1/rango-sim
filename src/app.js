(function () {
    ajax('GET', '/src/data.json', handler);
    function handler(status, data) {
        console.log(status, data);
    }
})();
