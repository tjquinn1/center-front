
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
							label="email"
							v-model="email"
							type='email'
							required
						></v-text-field>
						<v-text-field
							label="Password"
							v-model="password"
							type='password'
							required
						></v-text-field>
						<v-text-field
							label="Re-enter Password"
							v-model="password2"
							type='password'
							required
						></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-flex>
						<v-btn @click="save()" color="primary">Login</v-btn>
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
      email: '',
      password: '',
      password2: ''
    };
  },
  methods: {
    save() {
      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      axios
        .post(
          'http://127.0.0.1:8000/all-auth/login/',
          {
            email: this.email,
            password: this.password,
            password2: this.passwaord2
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
