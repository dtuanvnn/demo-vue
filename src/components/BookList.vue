<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Book List
        <b-link href="#/add-book">(Add Book)</b-link>
      </h2>
      <div>
        <b-btn v-b-toggle.collapse3 class="m-1">Toggle Collapse</b-btn>
      </div>
      <b-collapse visible id="collapse3">
        <b-table striped hover :items="books" :fields="fields">
          <template slot="actions" scope="row">
            <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>
          </template>
        </b-table>
      </b-collapse>
      <ul v-if="errors && errors.length">
        <li v-for="error in errors" :key="error.message">
          {{error.message}}
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";

export default {
  name: "BookList",
  data() {
    return {
      fields: {
        isbn: { label: "ISBN", sortable: true, class: "text-center" },
        title: { label: "Book Title", sortable: true },
        actions: { label: "Action", class: "text-center" }
      },
      books: [],
      errors: []
    };
  },
  created() {
    axios
      .get(`http://localhost:3000/book`)
      .then(response => {
        this.books = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {
    details(book) {
      this.$router.push({
        name: "ShowBook",
        params: { id: book._id }
      });
    }
  }
};
</script>