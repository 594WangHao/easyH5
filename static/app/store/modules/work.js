var state = {
    data: {
        pageData: {
            currentPage: 0,
            list:[{
                name: 'ddddd'
            }]
        }
    }
}

var mutations = {
    changeCurrent: function (state, current) {
        state.pageData.currentPage = current;
    }
}


module.exports = {
    state: state,
    mutations: mutations,
}
