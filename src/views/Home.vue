<template>
  <section>
    <div>
      <b-field label="Full Name">
        <b-input
          v-model="fullname"
          placeholder="Full Name"
          type="text"
          required
        >
        </b-input>
      </b-field>
    </div>
    <div>
      <b-field label="Institution">
        <b-input
          v-model="institution"
          placeholder="Institution"
          type="text"
          required
        >
        </b-input>
      </b-field>
    </div>
    <div>
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
    </div>
    <div>
      <b-field label="Field">
        <b-input placeholder="Field" type="text" v-model="field"> </b-input>
      </b-field>
    </div>
    <div>
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
        <b-input
          placeholder="demo_fake_deploma_signature"
          type="text"
          v-model="filecontents"
        >
        </b-input>
      </b-field>
    </div>
    <div class="btn-group">
      <input
        class="button"
        type="button"
        value="Upload"
        @click="submit_form()"
      />
      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <input class="button" type="button" value="Query" @click="do_query()" />
    </div>
    <div>
      <p v-if="cors_workaround">if CORS issue, click for link <br /></p>
      <a :href="cors_workaround" target="_blank">
        {{ cors_workaround }}
      </a>
    </div>
  </section>
</template>

<script>
//import axios from "axios";

export default {
  name: "Home",
  data: function() {
    return {
      fullname: "",
      institution: "",
      degreelevel: "",
      field: "",
      file: null,
      filecontents: null,
      cors_workaround: ""
    };
  },
  methods: {
    do_query() {
      if (
        this.fullname.length == 0 ||
        this.institution.length == 0 ||
        this.degreelevel.length == 0
      ) {
        // then dont do query, not enough info!
        this.$buefy.dialog.alert({
          title: "Error",
          message: "Full name, Institution, and Degree Level are all required",
          type: "is-danger"
        });
        return null;
      } else {
        var formattedKey = this.format_key();
        //var formattedValue = this.format_value();
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
          '/abci_query?data="' +
          formattedKey +
          '"&height=&prove=';
        this.cors_workaround = endpoint;
        /*axios
          .get(endpoint)
          .then(response => {
            this.$buefy.dialog.alert({
              title: "return value",
              message: response.data,
              type: "is-success"
            });
            // eslint-disable-next-line no-console
            console.log(response.data["result"]["response"]["log"]);
            if (response.data["result"]["response"]["log"] == "exists") {
              // do buefy notification
              this.queryresponse = atob(response.data["result"]["response"]["key"]);
              this.filecontents = atob(response.data["result"]["response"]["value"]);             
            }
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error(error);
          });*/
      }
    },
    submit_form() {
      if (
        this.fullname.length == 0 ||
        this.institution.length == 0 ||
        this.degreelevel.length == 0
      ) {
        // then dont upload, not enough info!
        this.$buefy.dialog.alert({
          title: "Error",
          message: "Full name, Institution, and Degree Level are all required",
          type: "is-danger"
        });
        return null;
      } else {
        var formattedKey = this.format_key();
        var formattedValue = this.format_value();
        /*if (formattedKey.search("__") >= 0) {
          this.$buefy.dialog.alert({
            title: "Error",
            message:
              "First name, Last Name, Institution, and Degree Level are all required",
            type: "is-danger"
          });
          return null;
        }*/
        // otherwise commit to chain
        var endpoint =
          this.$root.$store.state.API_URI +
          '/broadcast_tx_commit?tx="' +
          formattedKey +
          "=" +
          formattedValue +
          '"';
        this.cors_workaround = endpoint;
        /*axios
          .get(endpoint)
          .then(response => {
            this.$buefy.dialog.alert({
              title: "return value",
              message: response.data,
              type: "is-success"
            });
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error(error);
          });*/
      }
    },
    format_key() {
      var ret =
        this.$root.encode_input_string(this.fullname) +
        "_" +
        this.$root.encode_input_string(this.institution) +
        "_" +
        this.$root.encode_input_string(this.degreelevel);
      if (this.field.length > 0) {
        ret += "_" + this.$root.encode_input_string(this.field);
      }
      return ret;
    },
    format_value() {
      var ret =
        this.filecontents.length > 0 ? this.filecontents : "some-placeholder_";
      if (this.file) {
        var reader = new FileReader();
        reader.readAsText(this.file, "UTF-8");
        reader.onload = function(evt) {
          this.filecontents = evt.target.result;
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
