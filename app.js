// var Vue = require('vue');

Vue.prototype.$http = axios;

new Vue({
  el: '#events',

  data: {
    event: { title: '', detail: '', date: '' },
    events: []
  },

  ready: function () {
    this.fetchEvents();
  },

  methods: {

    fetchEvents: function () {
      var events = [];
      // this.$set('events', events);
      this.$http.get('/api/events').then(function (events) {
          this.$set('events', events);
          console.log(events);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    addEvent: function () {
      if (this.event.title.trim()) {
        // this.events.push(this.event);
        // this.event = { title: '', detail: '', date: '' };
        this.$http.post('/api/events', this.event).then(function (response) {
            this.events.push(this.event);
            console.log('Event added!');
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    },

    deleteEvent: function (index) {
      if (confirm('Are you sure you want to delete?')) {
        // this.events.splice(index, 1);
        this.$http.delete('api/events/' + event.id).then(function (response) {
            console.log(response);
            this.events.splice(index, 1);
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    }
  }
});