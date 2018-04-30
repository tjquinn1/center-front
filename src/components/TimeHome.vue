
<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-left row wrap>
            <v-flex xs8 align-center>
                <v-btn dark large color="cyan" @click.stop="dialog = true">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-flex>
			<v-flex xs2 align-center>
				<h1>{{ this.dateString }}</h1>
			</v-flex>
			<v-flex xs1 align-center>
				<v-btn-toggle>
					<v-btn value="left" @click="previousDay" class="elevation-10" color="white">
						<v-icon color="black">chevron_left</v-icon>
					</v-btn>
					<v-btn value="center" @click="getToday" :ripple="{ class: 'purple--text accent-4' }"class="elevation-10" color="white">
						<span>Today</span>
					</v-btn>
					<v-btn value="right" @click="nextDay" class="elevation-10" color="white">
						<v-icon color="black">chevron_right</v-icon>
					</v-btn>
					<v-menu bottom offset-y>
						<v-btn slot="activator" class="elevation-10" color="white">
							<v-icon>date_range</v-icon>
						</v-btn>
						<v-list>
							<v-date-picker no-title v-model="picker" @click.native="pickerParse();"></v-date-picker>
						</v-list>
					</v-menu>
				</v-btn-toggle>
			</v-flex>
			<v-dialog
                v-model="dialog"
                max-width="500px"
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable>
                <v-card tile>
                    <v-toolbar card dark color="primary">
                        <v-btn icon @click.native="dialog = false" dark>
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Settings</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn v-if="time === ''" dark flat @click.native="dialog = false; addTask();">Start Timer</v-btn>
							<v-btn v-else dark flat @click.native="dialog = false; addTask(); save();">Save</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text>
                        <v-form
                            enctype="multipart/form-data">
                            <v-select
                                :items="items"
                                v-model="task"
                                label="Task"
                                class="input-group"
                                item-value="url"
                                item-text="task_name"
								autocomplete
								dense
                                ></v-select>
                            <v-layout row>
                                <v-flex xs5 class="mr-3">    
                                    <v-text-field
                                        label="Time"
                                        v-model="time"
                                        type="text"
                                        :mask="mask"
                                        required
										placeholder="00:00"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs6 class="ml-3 pt-3 pl-5">
                                    <v-checkbox label="Non-Billable" v-model="nonBillable"></v-checkbox>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-card-text>
                    <div style="flex: 1 1 auto;"></div>
                </v-card>
            </v-dialog>
			<v-flex xs12>
				<v-tabs
					color="white"
					slot="extension"
					v-model="tab"
					class="elevation-10"
					grow>
					<v-tabs-slider color="pink"></v-tabs-slider>
					<v-tab :ripple="{ class: 'red--text' }" href="#1" @click.native="tabDate(1)">
						<span>
							Mon
							<br>
							12:12
						</span>
					</v-tab>
					<v-tab :ripple="{ class: 'green--text' }" href="#2" @click.native="tabDate(2)">
						<span>
							Tue
							<br>
							2:12
						</span>
					</v-tab>
					<v-tab :ripple="{ class: 'purple--text' }" href="#3" @click.native="tabDate(3)">
						<span>
							Wed
							<br>
							9:12
						</span>
					</v-tab>
					<v-tab :ripple="{ class: 'orange--text' }" href="#4" @click.native="tabDate(4)">
						<span>
							Thur
							<br>
							7:12
						</span>
					</v-tab>
					<v-tab :ripple="{ class: 'teal--text' }" href="#5" @click.native="tabDate(5)">
						<span>
							Fri
							<br>
							0:00
						</span>
					</v-tab>
					<v-tab :ripple="{ class: 'pink--text' }" href="#6" @click.native="tabDate(6)">
						<span>
							Sat
							<br>
							1:00
						</span>
					</v-tab>
					<v-tab :ripple="{ class: 'yellow--text' }" href="#0" @click.native="tabDate(0)">
						<span>
							Sun
							<br>
							0:09
						</span>
					</v-tab>
					<v-tab :ripple="{ class: 'blue--text accent-4' }" href="#total">
						<span>
							Total: 23:23
						</span>
					</v-tab>
				</v-tabs>
				</v-toolbar>
				<v-tabs-items v-model="tab">
					<v-tab-item id="1">
						<v-card flat>
							<v-card-text>
								<task-item
									v-for="time in times"
									v-bind:time="time"
									v-bind:key="time.id">
								</task-item>
							</v-card-text>
						</v-card>
					</v-tab-item>
					<v-tab-item id="2">
						<v-card flat>
							<v-card-text>
								<task-item
									v-for="time in times"
									v-bind:time="time"
									v-bind:key="time.id">
								</task-item>
							</v-card-text>
						</v-card>
					</v-tab-item>
					<v-tab-item id="3">
						<v-card flat>
							<v-card-text>
								<task-item
									v-for="time in times"
									v-bind:time="time"
									v-bind:key="time.id">
								</task-item>
							</v-card-text>
						</v-card>
					</v-tab-item>
					<v-tab-item id="4">
						<v-card flat>
							<v-card-text>
								<task-item
									v-for="time in times"
									v-bind:time="time"
									v-bind:key="time.id">
								</task-item>
							</v-card-text>
						</v-card>
					</v-tab-item>
					<v-tab-item id="5">
						<v-card flat>
							<v-card-text>
								<task-item
									v-for="time in times"
									v-bind:time="time"
									v-bind:key="time.id">
								</task-item>
							</v-card-text>
						</v-card>
					</v-tab-item>
					<v-tab-item id="6">
						<v-card flat>
							<v-card-text>
								<task-item
									v-for="time in times"
									v-bind:time="time"
									v-bind:key="time.id">
								</task-item>
							</v-card-text>
						</v-card>
					</v-tab-item>
					<v-tab-item id="0">
						<v-card flat>
							<v-card-text>
								<task-item
									v-for="time in times"
									v-bind:time="time"
									v-bind:key="time.id">
								</task-item>
							</v-card-text>
						</v-card>
					</v-tab-item>
				</v-tabs-items>
			</v-flex>
		</v-layout>
      </v-container>
    </v-content>
</template>
<script>
import axios from 'axios';
import TaskItem from './TaskItem';
/* eslint-disable */
export default {
  name: 'TimeHome',
  data() {
    return {
      dialog: false,
      task: '',
      time: '',
      items: [],
      nonBillable: false,
      mask: 'time',
      today: new Date(),
      tomorrow: new Date(),
      dateString: '',
      now: new Date(),
      tasks: [],
      picker: null,
      tab: '',
      saveDate: '',
      times: null
    };
  },
  methods: {
    save() {
      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      axios
        .post(
          'http://127.0.0.1:8000/time/',
          {
            time: parseFloat(this.time).toFixed(2),
            task: this.task,
            non_billable: this.nonBillable
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then(function() {
          console.log('SUCCESS!!');
        })
        .catch(function() {
          console.log('FAILURE!!');
        });
    },
    getDay: function(date) {
      axios
        .get('http://127.0.0.1:8000/time/', {
          params: {
            created: date
          }
        })
        .then(response => {
          this.times = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getTask: function() {
      axios
        .get('http://127.0.0.1:8000/task/')
        .then(response => {
          // replaced function with =>
          this.items = response.data; // `this.items =` inst. of `items =`
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getToday: function() {
      this.today = this.now = new Date(Date.now());
      this.dateString = this.now.toDateString();
      this.saveDate = this.formatDate(this.now);
      this.getDay(this.saveDate);
      //set tab
      this.tab = this.now.getDay().toString();
    },
    nextDay: function() {
      this.tomorrow.setDate(this.today.getDate() + 1);
      this.now = this.today.setDate(this.tomorrow.getDate());
      this.dateString = this.today.toDateString();
      this.saveDate = this.formatDate(this.today);
      this.getDay(this.saveDate);
      //set tab
      this.tab = this.today.getDay().toString();
    },
    previousDay: function() {
      this.tomorrow.setDate(this.today.getDate() - 1);
      this.now = this.today.setDate(this.tomorrow.getDate());
      this.saveDate = this.formatDate(this.today);
      this.getDay(this.saveDate);
      this.dateString = this.today.toDateString();
      //set tab
      this.tab = this.today.getDay().toString();
    },
    formatDate: function(date) {
      var monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

      var dayNames = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth() + 1;
      var year = date.getFullYear();
      var dayIndex = date.getDay();

      return year + '-' + monthIndex + '-' + day;
    },
    addTask: function() {
      var t = {
        task: this.task,
        time: this.time,
        billable: this.nonBillable
      };
      this.tasks.push(t);
    },
    pickerParse: function() {
      var t = this.toDate(this.picker);
      this.dateString = t.toDateString();
      this.getDay(this.picker);
      //set tab
      this.tab = t.getDay().toString();
    },
    toDate: function(dateStr) {
      const [year, month, day] = dateStr.split('-');
      return new Date(year, month - 1, day);
    },
    tabDate: function(idx) {
      var dayIndex = this.today.getDay();
      if (idx > dayIndex) {
        if (dayIndex == 0) {
          dayIndex = 7;
        }
        var day = dayIndex - idx;
        this.tomorrow.setDate(this.today.getDate() - day);
        this.today.setDate(this.tomorrow.getDate());
        this.dateString = this.today.toDateString();
        this.saveDate = this.formatDate(this.today);
        this.getDay(this.saveDate);
      } else {
        if (idx == 0) {
          idx = 7;
          var day = idx - dayIndex;
        } else {
          var day = idx - dayIndex;
        }
        this.tomorrow.setDate(this.today.getDate() + day);
        this.today.setDate(this.tomorrow.getDate());
        this.dateString = this.today.toDateString();
        this.saveDate = this.formatDate(this.today);
        this.getDay(this.saveDate);
      }
    }
  },
  created() {
    this.getTask();
    this.getToday();
  },
  components: {
    TaskItem
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.float-left {
  float: left;
}
.no-border {
  border: none;
}
</style>

