<!-- This file builds the /produce web page. Allows the user to send different 
types of messages to the api to be sent over the VERDI architecture. -->
<template>
  <section>
    <b-field label="First Name">
      <b-input
        v-model="firstname"
        placeholder="First Name"
        type="text"
        required
      >
      </b-input>
    </b-field>

    <b-field label="Last Name">
      <b-input v-model="lastname" placeholder="Last Name" type="text" required>
      </b-input>
    </b-field>

    <b-field label="Institution">
      <b-input
        v-model="institution"
        placeholder="Institution"
        type="text"
        required
      >
      </b-input>
    </b-field>
    <b-field label="Degree Level">
      <b-select
        placeholder="Select a Degree level"
        required
        v-model="degreelevel"
      >
        <option value="GED">GED</option>
        <option value="HS">High School</option>
        <option value="AS">Associate's</option>
        <option value="BS">Bachelor's</option>
        <option value="MS">Master's</option>
        <option value="DR">Doctoral</option>
        <option value="PHD">Profesional</option>
      </b-select>
    </b-field>
    <b-field label="Field">
      <b-input placeholder="Field" type="text" v-model="field"> </b-input>
    </b-field>
    <b-field label="Diploma file">
      <b-upload v-model="file">
        <a class="button is-primary">
          <b-icon icon="upload"></b-icon>
          <span>Click to upload</span>
        </a>
      </b-upload>
      <span class="file-name" v-if="file">
        {{ file.name }}
      </span>
    </b-field>
    <div class="btn-group">
      <input type="button" value="Upload" @click="submit_form()" />
      <input type="button" value="Query" @click="do_query()" />
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data: function() {
    return {
      firstname: "",
      lastname: "",
      institution: "",
      degreelevel: "",
      field: "",
      file: null,
      filecontents: null
    };
  },
  methods: {
    do_query() {
      if (
        this.firstname.length == 0 ||
        this.lastname.length == 0 ||
        this.institution.length == 0 ||
        this.degreelevel.length == 0
      ) {
        // then dont do query, not enough info!
        this.$buefy.dialog.alert({
          title: "Error",
          message:
            "First name, Last Name, Institution, and Degree Level are all required",
          type: "is-danger"
        });
        return null;
      } else {
        var formattedKey = this.format_key();
        var formattedValue = this.format_value();
        if (formattedKey.search("__") >= 0) {
          this.$buefy.dialog.alert({
            title: "Error",
            message:
              "First name, Last Name, Institution, and Degree Level are all required",
            type: "is-danger"
          });
          return null;
        }
        // otherwise commit to chain
        var endpoint =
          this.$root.$store.state.API_URI +
          '/abci_query?path="' +
          formattedKey +
          '"&data=&height=&prove=';
        axios.get(endpoint).then(response => {
          this.$buefy.dialog.alert({
            title: "return value",
            message: response.data,
            type: "is-success"
          });
        });
      }
    },
    submit_form() {
      if (
        this.firstname.length == 0 ||
        this.lastname.length == 0 ||
        this.institution.length == 0 ||
        this.degreelevel.length == 0
      ) {
        // then dont upload, not enough info!
        this.$buefy.dialog.alert({
          title: "Error",
          message:
            "First name, Last Name, Institution, and Degree Level are all required",
          type: "is-danger"
        });
        return null;
      } else {
        var formattedKey = this.format_key();
        var formattedValue = this.format_value();
        if (formattedKey.search("__") >= 0) {
          this.$buefy.dialog.alert({
            title: "Error",
            message:
              "First name, Last Name, Institution, and Degree Level are all required",
            type: "is-danger"
          });
          return null;
        }
        // otherwise commit to chain
        var endpoint =
          this.$root.$store.state.API_URI +
          '/broadcast_tx_commit?tx="' +
          formattedKey +
          "=" +
          formattedValue +
          '"';
        axios.get(endpoint).then(response => {
          this.$buefy.dialog.alert({
            title: "return value",
            message: response.data,
            type: "is-success"
          });
        });
      }
    },
    format_key() {
      var ret =
        this.$root.encode_input_string(this.firstname) +
        "_" +
        this.$root.encode_input_string(this.lastname) +
        "_" +
        this.$root.encode_input_string(this.institution);
      //"_" +
      //this.degreelevel;
      if (this.field.length > 0) {
        ret += "_" + this.$root.encode_input_string(this.field);
      }
      return ret;
    },
    format_value() {
      var ret = this.$root.encode_input_string(this.degreelevel) + "_";
      if (this.file) {
        var reader = new FileReader();
        reader.readAsText(this.file, "UTF-8");
        reader.onload = function(evt) {
          ret = evt.target.result;
        };
        reader.onerror = function(evt) {
          this.$buefy.dialog.alert({
            title: "Error",
            message: evt.target,
            type: "is-danger"
          });
          ret = "error reading file";
        };
        reader.readAsText(this.file);
      }
      return ret;
    },
    update_form_fields(key) {
      var log_action = "response from /v2/fields/";

      this.$root.log("Attempting to get " + log_action + key);

      // attempt to get the form data from the api
      axios
        .get(this.$root.$store.state.API_URI + "/v2/fields/" + key)
        .then(response => {
          this.$root.log("Received " + log_action + ": " + response.data);
          this.active_form_items = response.data;
        })
        .catch(error => {
          this.$root.log("Failed " + log_action + ": " + error);
        });
    }
  }
};
</script>

<style>
.upload_container {
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 90%;
  width: 100%;
}
.btn-group button {
  background-color: #4caf50; /* Green background */
  border: 1px solid green; /* Green border */
  color: white; /* White text */
  padding: 10px 24px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  float: left; /* Float the buttons side by side */
}

.btn-group button:not(:last-child) {
  border-right: none; /* Prevent double borders */
}

/* Clear floats (clearfix hack) */
.btn-group:after {
  content: "";
  clear: both;
  display: table;
}

/* Add a background color on hover */
.btn-group button:hover {
  background-color: #3e8e41;
}
</style>
