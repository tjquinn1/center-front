<template>
    <v-flex>
        <h6>{{ this.time }}</h6>
        <h4>{{ this.time.task.task_name }}</h4>
        <h6>{{ this.time.task.project.project_name }}</h6>
        <h6>{{ this.time.task.project.client.name }}</h6>
        <h6 v-if="time.non_billable === true">non billable</h6>
        <h1><time>{{this.hours}}:{{ this.minutes }}</time></h1>
        <div class="stopwatch"></div>
        <v-btn v-if="running == false" @click.native="start()" dark color="green">
            <span>Start</span>
        </v-btn>
        <v-btn v-if="running == true" @click.native="stop()" dark color="red">
            <span>Stop</span>
        </v-btn>
    </v-flex>
</template>

<script>
export default {
  props: ['time'],
  name: 'TaskItem',
  data: function() {
    return {
      running: false,
      minutes: 0,
      timer: null,
      hours: 0,
      seconds: 0
    };
  },
  watch: {},
  created: function() {},
  mounted: function() {},
  methods: {
    calculate: function(seconds, minutes) {
      if (seconds > 60) {
        this.minutes++;
        this.seconds = this.seconds - 60;
      }
      if (minutes > 60) {
        this.hours++;
        this.minutes = this.minutes - 60;
      }
    },
    start: function() {
      this.running = true;
      this.timer = setInterval(() => {
        this.seconds++;
        this.calculate(this.seconds, this.minutes);
        console.log(this.minutes); // |this| properly refers to the person object
      }, 1000);
    },
    stop: function() {
      clearInterval(this.timer);
      this.running = false;
    }
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
