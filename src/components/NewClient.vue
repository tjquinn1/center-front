
<template>
	<v-content>
	  <v-container fluid fill-height text-xs-center>
		<v-layout align-center justify-center>
		  <v-flex xs6>
			<v-card class="elevation-12">
			  <v-toolbar dark color="primary">
				<v-toolbar-title>Create New Client</v-toolbar-title>
				<v-spacer></v-spacer>
			  </v-toolbar>
			  <v-card-text>
				<v-form enctype="multipart/form-data">
					<v-text-field
						label="Name"
						v-model="name"
						required
					></v-text-field>
						<v-menu
							ref="menu"
							lazy
							:close-on-content-click="false"
							v-model="menu"
							transition="scale-transition"
							offset-y
							full-width
							:nudge-right="40"
							min-width="290px"
							:return-value.sync="start_date">
							<v-text-field
							slot="activator"
							label="Start Date"
							v-model="start_date"
							prepend-icon="event"
							readonly
							></v-text-field>
							<v-date-picker v-model="start_date" @input="$refs.menu.save(start_date)"></v-date-picker>

						</v-menu>
						<v-menu
							ref="menu2"
							lazy
							:close-on-content-click="false"
							v-model="menu2"
							transition="scale-transition"
							offset-y
							full-width
							:nudge-right="40"
							min-width="290px"
							:return-value.sync="end_date"
						>
							<v-text-field
							slot="activator"
							label="End Date"
							v-model="end_date"
							prepend-icon="event"
							readonly
							></v-text-field>
							<v-date-picker v-model="end_date" @input="$refs.menu2.save(end_date)"></v-date-picker>
						</v-menu>
					<v-text-field
					label="Notes"
					v-model="notes"
					required
					></v-text-field>
				</v-form>
			  </v-card-text>
			  <v-card-actions>
				<v-flex>
					<v-btn @click="save()" color="primary">Save</v-btn>
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
  name: 'NewClient',
  data() {
    return {
      name: '',
      start_date: null,
      end_date: null,
      notes: '',
      menu: false,
      menu2: false
    };
  },
  methods: {
    save() {
      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      axios
        .post(
          'http://127.0.0.1:8000/client/',
          {
            name: this.name,
            start_date: this.start_date,
            end_date: this.end_date,
            notes: this.notes
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
    }
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
