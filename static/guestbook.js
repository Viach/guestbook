// register modal component
Vue.component('modal', {
    template: '#modal-template',
    props: ['message'],
    created: function () {
        // alert();
    }
});


new Vue({
    el: "#app",
    data: {
        guests: [],
        guestModal : [],
        showModal: false
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
        showGuest: function (guest) {
            alert('Guest info:\n' + guest.id + '\n' + guest.name + '\n' + guest.email);
        },
        editGuest: function (guest) {
            axios.put('/api/guests/' + guest.id + '.json',
                {
                    id: guest.id,
                    name: 'NEW',
                    email: 'ENAIL'
                }
            )
                .then(function (response) {
                    this.guests = response.data.guests;
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
            this.getList();
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


