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
        <input
          type="file"
          @change="read_file_contents"
          accept="image/*,application/pdf"
        />
      </b-field>
      <object
        v-if="filecontents"
        :data="filecontents"
        height="55%"
        width="50%"
      />
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
import axios from "axios";

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
    read_file_contents(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.filecontents = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    compress_input_file(data) {
      return data
        .split("")
        .reduce((o, c) => {
          if (o[o.length - 2] === c && o[o.length - 1] < 35) o[o.length - 1]++;
          else o.push(c, 0);
          return o;
        }, [])
        .map(_ => (typeof _ === "number" ? _.toString(36) : _))
        .join("");
    },
    decompress_input_file(data) {
      return data
        .split("")
        .map((c, i, a) =>
          i % 2 ? undefined : new Array(2 + parseInt(a[i + 1], 36)).join(c)
        )
        .join("");
    },
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
        axios
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
              this.queryresponse = atob(
                response.data["result"]["response"]["key"]
              );
              this.filecontents = atob(
                response.data["result"]["response"]["value"]
              );
            }
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.error(error);
          });
      }
    },
    submit_form() {
      if (
        this.fullname.length == 0 ||
        this.institution.length == 0 ||
        this.degreelevel.length == 0 ||
        this.filecontents == null
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
        this.cors_workaround = endpoint;
        axios
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
          });
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
      var ret = null;
      if (this.filecontents) {
        ret =
          this.filecontents.length > 0 ? this.filecontents : "some-placeholder";
      }
      return ret;
    }
  }
};
</script>