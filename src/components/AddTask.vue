
<template>
	<v-content>
		<v-container fluid fill-height text-xs-center>
			<v-layout align-center justify-center>
				<v-flex xs6>
					<v-card class="elevation-12">
						<v-toolbar dark color="primary">
							<v-toolbar-title>Create New Task</v-toolbar-title>
							<v-spacer></v-spacer>
						</v-toolbar>
						<v-card-text>
							<v-form
							enctype="multipart/form-data">
								<v-select
									:items="items"
									v-model="project"
									label="Choose a Project"
									class="input-group--focused"
									item-value="url"
									item-text="project_name"
									></v-select>
								<v-text-field
									label="Task Name"
									v-model="task"
									required
								></v-text-field>
							</v-form>
						</v-card-text>
						<v-card-actions>
							<v-flex>
								<v-btn @click="save()" color="primary">Submit</v-btn>
							</v-flex>
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-content>
</template>
<script>
import axios from 'axios';
/* eslint-disable */
export default {
  name: 'Project',
  data() {
    return {
      project: '',
      task: '',
      items: []
    };
  },
  methods: {
    save() {
      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      axios
        .post(
          'http://127.0.0.1:8000/task/',
          {
            project: this.project,
            task_name: this.task
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then(function() {
          console.log('SUCCESS!!');
          window.location.href = 'http://localhost:8080';
        })
        .catch(function() {
          console.log('FAILURE!!');
        });
    },
    getProject: function() {
      axios
        .get('http://127.0.0.1:8000/project/')
        .then(response => {
          // replaced function with =>
          console.log(response.data);
          this.items = response.data; // `this.items =` inst. of `items =`
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getProject();
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
</style>
