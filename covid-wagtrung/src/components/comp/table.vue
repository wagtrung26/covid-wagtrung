<template>
  <div>
    <!-- <p>{{ continentArray }}</p> -->
    <!-- START-Template -->
    <a-table
   
      :columns="columns"
      :data-source="data"
      :scroll="{ y: 500 }"
      :pagination="{ pageSize: 20 }"
      @change="onChange"
    />

    <!-- END-Template -->
  </div>
</template>

<script>

export default {
  components: {},
  name: "tableC",
  props: {
    continentArray: Array,
  },
  data() {
    return {
      data:[],
      columns: [
        
        {
          title: "Country",
          dataIndex: "country",
          sorter: (a, b) => a.country.length - b.country.length,
          sortDirections: ["descend"],
          // render: (record) => {<img src={record.flag}/> },

        },
        {
          title: "Cases",
          dataIndex: "cases",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.cases - b.cases,
        },
        {
          title: "Deaths",
          dataIndex: "deaths",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.cases - b.cases,
        },
        {
          title: "Actives",
          dataIndex: "active",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.cases - b.cases,
        },
        {
          title: "Recovered",
          dataIndex: "recovered",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.cases - b.cases,
        },
        {
          title: "Today Cases",
          dataIndex: "todayCases",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.cases - b.cases,
        },{
          title: "Today Deaths",
          dataIndex: "todayDeaths",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.cases - b.cases,
        },{
          title: "Today Recovered",
          dataIndex: "todayRecovered",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.cases - b.cases,
        },
      ],
    };
  },
  methods: {
    setup() {
      (pagination, filters, sorter) => {
        console.log("params", pagination, filters, sorter);
      };
    },
  },
  computed: {},
  created() {
    

  },
  updated() {
    this.data = this.continentArray;
    // this.columns[0].render =  () => {
    //  return (
    //   <div>
    //   <img src={this.continentArray.flag}/>

    //      <div>{this.continentArray.name}</div></div>
    // )}
  }
 
};
</script>

<style scoped></style>
