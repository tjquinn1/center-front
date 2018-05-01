<template>
<div>
      <v-list-tile :key="time.task.task_name" @click="">
        <v-list-tile-content>
          <v-list-tile-title>{{ time.task.task_name }}</v-list-tile-title>
          <v-list-tile-sub-title >{{ time.task.project.project_name }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-content>
          <h1><time>{{hours}}:{{ minutes }}</time></h1>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn v-if="running == false" @click.native="start()" dark color="green">
            <span>Start</span>
          </v-btn>
          <v-btn v-if="running == true" @click.native="stop()" dark color="red">
            <span>Stop</span>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider v-if="index + 1 < times.length" :key="`divider-${index}`"></v-divider>
</div>
</template>

<script>
export default {
  props: ['time', 'times', 'index'],
  name: 'Tasktime',
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
