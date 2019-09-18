<template>
  <div class="container">
    <div class="row">
      <div class="col-12 justify-content-center">
        <h3>Jobs</h3>
      </div>
      <div class="col-12">
        <p>Total Jobs: {{ users.length }}</p>
      </div>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <div v-if="filter">
          <p>Filtered Result: {{ searchResultCount }}</p>
        </div>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter On"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          description="Leave all unchecked to filter on all data"
          class="mb-0"
        >
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox value="companyname">Company Name</b-form-checkbox>
            <b-form-checkbox value="location">Location</b-form-checkbox>
            <b-form-checkbox value="experience">Experience</b-form-checkbox>
            <b-form-checkbox value="skills">Skills</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
      <div class="col-12">
        <b-table
          :items="users"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          @filtered="onFiltered"
        >
          <template v-slot:cell(applylink)="data">
            <a :href="data.item.applylink">Apply</a>
          </template>
        </b-table>
        <!-- <table class="table table-bordered user-table">
          <thead class="thead-light">
            <tr>
              <th class>Title</th>
              <th class="ds-none ds-sm-tb-cell">Profile Picture</th>
              <th class="ds-none ds-lg-tb-cell">First Name</th>
              <th class="ds-none ds-lg-tb-cell">Last Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" transition="item">
              <td>{{ user.title }}</td>
              <td class="ds-none ds-sm-tb-cell">
                <img :src="user.avatar" alt>
              </td>
              <td class="ds-none ds-lg-tb-cell">{{ user.first_name }}</td>
              <td class="ds-none ds-lg-tb-cell">{{ user.last_name }}</td>
            </tr>
          </tbody>
        </table>-->
      </div>
      <div class="col-12">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalUsers"
          :per-page="perPage"
          aria-controls="jobs-table"
          align="center"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'JobsTable',
  data() {
    return {
      id: 1,
      users: [],
      currentPage: 1,
      perPage: 10,
      totalUsers: 0,
      fields: [
        {
          key: "title",
          label: "Title"
        },
        {
          key: "jd",
          label: "Description"
        },
        {
          key: "companyname",
          label: "Company Name",
          sortable: true
        },
        {
          key: "location",
          label: "Location",
          sortable: true
        },
        {
          key: "experience",
          label: "Experience",
          sortable: true
        },
        {
          key: "salary",
          label: "Salary"
        },
        {
          key: "skills",
          label: "Skills"
        },
        {
          key: "startdate",
          label: "Start Date"
        },
        {
          key: "enddate",
          label: "End Date",
          sortable: true
        },
        {
          key: "source",
          label: "Source"
        },
        {
          key: "applylink",
          label: "Actions"
        }
      ],
      filter: null,
      filterOn: [],
      searchResultCount: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get("https://nut-case.s3.amazonaws.com/jobs.json").then(result => {
        const res = result.data;
        this.users = res.data;
        this.totalUsers = res.len;
      });
    },
    showExpiredJobs() {
      const currentTime = +new Date();
      this.users = this.users.filter(x => x.timestamp * 1000 < currentTime);
    },
    onFiltered(data, n) {
      this.searchResultCount = n;
    }
  },
  computed: {
    expiredFilter() {
      return this.showExpiredJobs;
    }
  }
};
</script>

<style>
th,
td {
  vertical-align: middle;
}

/* responsive-classes */
.ds-none {
  display: none;
}

/* ipad */
@media (min-width: 576px) {
  .ds-sm-tb-cell {
    display: table-cell;
  }
}

/* laptop */
@media (min-width: 992px) {
  .ds-lg-tb-cell {
    display: table-cell;
  }
}

/* ipad view */
@media (min-width: 576px) {
  .d-tb-large {
    display: table-cell;
  }
}

/* transition */
.list-enter-active {
  transition: all 1s;
}
/* .list-leave-active */
.list-enter {
  opacity: 0;
  transform: translateY(10px);
}
.list-leave-to {
  opacity: 0;
}
</style>
