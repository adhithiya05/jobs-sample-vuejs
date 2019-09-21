<template>
  <div class="container">
    <div class="row">
      <div class="col-12 justify-content-center">
        <h3>Jobs</h3>
      </div>
      <div class="col-12">
        <p>Total Jobs: {{ getJobs.length }}</p>
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
      <b-col>
       <b-form-checkbox
      v-model="showExpired"
      name="checkbox1"
      :value="true"
      :unchecked-value="false"
    >
      Show Expired Jobs
        </b-form-checkbox>
      </b-col>
      <div v-if="loading" class="col-12 justify-content-center">
        <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
      </div>
      <div class="col-12" v-else>
        <b-table
          :items="getJobs"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          @filtered="onFiltered"
        >
          <template v-slot:cell(startdate)="data">
            <p>{{ data.item.startdate ? dateFormat(data.item.startdate) : '-' }}</p>
          </template>
          <template v-slot:cell(enddate)="data">
            <p>{{ data.item.enddate ? dateFormat(data.item.enddate) : '-' }}</p>
          </template>
          <template v-slot:cell(applylink)="data">
            <a :href="data.item.applylink">Apply</a>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalJobs"
          :per-page="perPage"
          aria-controls="jobs-table"
          align="center"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

const JOBS_URL = process.env.VUE_APP_JOBSURL

export default {
  name: 'JobsTable',
  data() {
    return {
      id: 1,
      jobs: [],
      showExpired: false,
      expiredJobs: [],
      currentPage: 1,
      perPage: 10,
      totalJobs: 0,
      loading: true,
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
  async created() {
    try {
      const res = await axios.get(JOBS_URL)
      const jobs = res.data
      this.jobs = jobs.data
      this.totalJobs = jobs.len
    } catch (err) {
      console.log(err)
    } finally {
      this.loading = false
    }
  },
  methods: {
    onFiltered(data, n) {
      this.searchResultCount = n;
    },
    dateFormat(str) {
      const dateStr = new Date(str)
      return dateStr.toLocaleDateString()
    }
  },
  computed: {
    getJobs() {
      return this.showExpired ? this.getExpiredJobs : this.jobs
    },
    // since this is a computed function result of the function is cached
    // after the first call result is returned without computation if there is no change in data
    getExpiredJobs() {
      const currentTime = +new Date()
      return this.jobs.filter(x => {
        if (x.enddate) {
          const date = new Date(x.enddate)
          return date.getTime() < currentTime
        }
      })
    }
  }
}
</script>

<style>
th,
td {
  vertical-align: middle;
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
