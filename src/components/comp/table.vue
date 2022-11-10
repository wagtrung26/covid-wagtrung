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
    >
      <template v-slot:img="{ text, record }">
        <div class="flexCen justify-start space-x-4">
          <div class="bg-cover bg-no-repeat bg-center w-20 h-14 rounded border border-slate-100" :style="`background-image: url(${record.flag})`"></div>
          <div class="c">
          <h4 class="font-semibold ">{{ text }}</h4>
          <p class="text-slate-500 ">{{record.continent}} </p>
          </div>
        </div>
      </template>
        <template v-slot:cases ="{ text }">
        <p> {{numeralFunc(text)}} </p>
      </template>
    </a-table>

    <!-- END-Template -->
  </div>
</template>

<script>
import numeral from "numeral"
export default {
  components: {},
  name: "tableC",
  props: {
    continentArray: Array,
  },
  data() {
    return {
      data: [],
      columns: [
        //     { title: '',
        //     dataIndex: 'flag',
        //      key: 'flag',

        // },
           {
          title: "Country",
          dataIndex: "country",
          sorter: (a, b) => a.country.length - b.country.length,
          sortDirections: ["descend"],
          slots: {
            customRender: "img",
          },
           width: '20%',
           fixed: 'left',
          // render: (record) => {<img src={record.flag}/> },
        },
        {
          title: "Cases",
          dataIndex: "cases",
          defaultSortOrder: "descend",
          slots: {
            customRender: "cases",
          },
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
        },
        {
          title: "Today Deaths",
          dataIndex: "todayDeaths",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.cases - b.cases,
        },
        {
          title: "Today Recovered",
          dataIndex: "todayRecovered",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.cases - b.cases,
        },
      ],
    };
  },
  methods: {
     numeralFunc(num) {
      return numeral(num).format("0,0");
    },
    // setup() {
    //   (pagination, filters, sorter) => {
    //     console.log("params", pagination, filters, sorter);
    //   };
    // },
  },
  computed: {},
  created() {},
  updated() {
    this.data = this.continentArray;
    // this.columns[0].render =  () => {
    //  return (
    //   <div>
    //   <img src={this.continentArray.flag}/>

    //      <div>{this.continentArray.name}</div></div>
    // )}
  },
};
</script>

<style scoped></style>
