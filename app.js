//var Vue = require('vue');

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
      this.$set('events', events);
      this.$http.get('/backend/events').success(function (events) {
          this.$set('events', events);
          console.log(events);
        }).error(function (err) {
          console.log(err);
        });
    },

    addEvent: function () {
      if (this.event.title.trim()) {
        this.events.push(this.event);
        this.event = { title: '', detail: '', date: '' };
        this.$http.post('/backend/events', this.event).success(function (res) {
            this.events.push(this.event);
            console.log('Event added!');
          }).error(function (err) {
            console.log(err);
          });
      }
    },

    deleteEvent: function (index) {
      if (confirm("Do you want to delete this event?")) {
        //this.events.splice(index, 1);
        this.$http.delete('/backend/events/' + event.id).success(function (res) {
            console.log(res);
            this.events.$remove(index);
          }).error(function (err) {
            console.log(err);
          });
      }
    }
  }
});