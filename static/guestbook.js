// register modal component
Vue.component('modal', {
    template: '#modal-template',
    props: ['message'],
    created: function () {
        // alert();
    }
});

Vue.component('modal-edit', {
    template: '#modal-edit-template',
    props: ['message', 'newguest'],
    methods: {
        editGuest: function (guest) {
            axios.put('/api/guests/' + guest.id + '.json',
                {
                    id: guest.id,
                    name: guest.name,
                    email: guest.email
                }
            ).then(function (response) {
                    this.guests = response.data.guests;
                }.bind(this)
            ).catch(function (error) {
                console.log(error);
            });

        },
        addGuest: function (guest) {
            axios.post('/api/guests/.json',
                {
                    name: guest.name,
                    email: guest.email
                }
            ).then(function (response) {
                    this.guests = response.data.guests;
                }.bind(this)
            ).catch(function (error) {
                console.log(error);
            });
        }
    },
    created: function () {
        // alert();
    }
});

new Vue({
    el: "#app",
    data: {
        guests: [],
        guestModal: [],
        newguest: false,
        showModal: false,
        editModal: false
    },
    methods: {
        getList: function () {
            axios.get('/api/guests/.json')
                .then(function (response) {
                    this.guests = response.data.guests;
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
        },
        delGuest: function (guest) {
            axios.delete('/api/guests/' + guest.id + '.json')
                .then(function (response) {
                    this.guests = response.data.guests;
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
            this.getList();
        }
    },
    created: function () {
        this.getList();
    }
});


