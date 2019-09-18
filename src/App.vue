<template>
  <div id="app">
    <JobsTable msg="Hello Vue in CodeSandbox!"/>
  </div>
</template>

<script>
import JobsTable from "./components/JobsTable";

export default {
  name: "App",
  components: {
    JobsTable
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
