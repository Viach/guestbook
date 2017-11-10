import './menu';

import Config from './settings/config';

import Module1 from './test';

console.log(Config);
// =========================================
// Initialization
// =========================================
Module1.init();
// register modal component
// Vue.component('modal', {
//   template: '#modal-template',
//   props: ['message'],
//   created: function () {
//       // alert();
//   }
// });

// Vue.component('modal-edit', {
//   template: '#modal-edit-template',
//   props: ['message', 'newguest'],
//   methods: {
//       editGuest: function (guest) {
//           axios.put('/api/guests/' + guest.id + '.json',
//               {
//                   id: guest.id,
//                   name: guest.name,
//                   email: guest.email
//               }
//           ).then(function (response) {
//                   this.guests = response.data.guests;
//               }.bind(this)
//           ).catch(function (error) {
//               console.log(error);
//           });

//       },
//       addGuest: function (guest) {
//           axios.post('/api/guests/.json',
//               {
//                   name: guest.name,
//                   email: guest.email
//               }
//           ).then(function (response) {
//                   this.guests = response.data.guests;
//               }.bind(this)
//           ).catch(function (error) {
//               console.log(error);
//           });
//       }
//   },
//   created: function () {
//       // alert();
//   }
// });

new Vue({
  el: ".section-book__content",
  data: {
      books: [],
      guestModal: [],
      newguest: false,
      showModal: false,
      editModal: false
  },
  methods: {
      getList: function () {
          axios.get('/app/book.json')
              .then(function (response) {
                  this.books = response.data.guest;
                  console.log(response);
                  
              }.bind(this))
              .catch(function (error) {
                  console.log(error);
              });
      },
      delGuest: function (json) {
          axios.delete('/app/book.json', {guest:[json.id]})
          
              .then(function (response) {
                  this.books = response.data.guest;
                  console.log(this.books);
                  
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


