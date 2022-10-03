<template>

  <nav>
    <router-link to="/">Country</router-link> |
    <router-link to="/worldwide">worldwide</router-link>
  </nav>
  <router-view/>

</template>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.textXl {
  font-size: 4rem;
}
.mr{
  margin: 0 0 0px 20px;
}
.mb{
  margin: 0 0 20px 0px;
}
.m0{
 margin: 0px;
}
.mb0{
  margin-bottom: 0!important;
}
.pl{
  padding-left: 40px;
}
.textLeft{
  text-align:left;
}
.chart {
  /* box-shadow: 0px 3px 20px rgb(124, 124, 124); */
  margin: 30px 0px 0;
  position: relative;
}
.btnGroup {
  position: absolute;
  top: 20px;
  left: 180px;
  z-index: 1;
}
.btnGroup2 {
  position: absolute;

  top: 20px;
  right: 80px;
  z-index: 1;
}
.btn {
  padding: 10px;
  background-color: rgb(229, 229, 229);
  border: none;
  margin-right: 5px;
  transition: all 0.5s;
  /* box-shadow: 0px 3px 20px rgb(124, 124, 124); */
}
.btn:hover {
  background-color: rgb(198, 198, 198);
}
.btn.active {
  background-color: rgb(15, 19, 47);
  color: #fff;
  /* border: 2px solid #333; */
}
</style>
