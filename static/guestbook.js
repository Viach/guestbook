new Vue({
    el: "#app",
    data: {
        messa: [1,2,3]
    },

    methods: {
        getList: function () {
            var myGet = axios.get('/api/guests/.json')
                .then(function (response) {
                    console.log(response.status);
                    return  response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    },
    created:function () {
        this.getList();
    }


});

