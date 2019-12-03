<template>
  <div id="app" class="root_container">
    <div id="nav" class="nav_bar">
      <router-link to="/query">Query</router-link>|
      <router-link to="/upload">Upload</router-link>
    </div>
    <router-view style="padding-bottom: 100px;" />
  </div>
</template>

<!-- set styles here to apply to all children as well -->
<style>
.root_container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

.nav_bar {
  height: 10%;
  width: 100%;
  font-weight: bold;
}
.nav_bar a {
  color: #000000;
  padding: 0.5em;
}
.nav_bar a.router-link-exact-active {
  color: #42b983;
  font-size: +1.75em;
}

#log_area {
  font-family: "Courier New", Courier, monospace;
  background: #000;
  color: #ccc;
  display: block;
  width: 100%;
}

#footer {
  text-align: left;

  position: fixed;
  height: 15%;
  width: 100%;
  min-height: 100px;
  max-height: 600px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(0, 0, 0);
  overflow: scroll;
  resize: vertical;
  direction: unset;
}

div {
  padding: 0.25em;
}

.spacing {
  margin: 1em;
}

.instruction_text {
  display: inline-block;
  text-align: left;
  padding: 1em;
}

.clickable_button {
  font-size: 1em;
}
.clickable_button:enabled:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.clickable_button:enabled:active {
  background: #ffffff;
}

.monospaced {
  font-family: monospace;
}
</style>
