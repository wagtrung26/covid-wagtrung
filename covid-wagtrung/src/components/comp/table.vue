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
// const columns = [
//   {
//     title: "Country",
//     dataIndex: "name",
//     // filters: [
//     //   {
//     //     text: "Joe",
//     //     value: "Joe",
//     //   },
//     //   {
//     //     text: "Jim",
//     //     value: "Jim",
//     //   },
//     //   {
//     //     text: "Submenu",
//     //     value: "Submenu",
//     //     children: [
//     //       {
//     //         text: "Green",
//     //         value: "Green",
//     //       },
//     //       {
//     //         text: "Black",
//     //         value: "Black",
//     //       },
//     //     ],
//     //   },
//     // ],
//     // onFilter: (value, record) => record.name.indexOf(value) === 0,
//     sorter: (a, b) => a.name.length - b.name.length,
//     sortDirections: ["descend"],
//   },
//   {
//     title: "Cases",
//     dataIndex: "cases",
//     defaultSortOrder: "descend",
//     sorter: (a, b) => a.cases - b.cases,
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     filters: [
//       {
//         text: "London",
//         value: "London",
//       },
//       {
//         text: "New York",
//         value: "New York",
//       },
//     ],
//     filterMultiple: false,
//     onFilter: (value, record) => record.address.indexOf(value) === 0,
//     sorter: (a, b) => a.address.length - b.address.length,
//     sortDirections: ["descend", "ascend"],
//   },
// ];
// const data =
// [
//   {

//     name: "John Brown",
//     cases: 32,
//     address: "New York No. 1 Lake Park",
//   },
//   {

//     name: "John Brown",
//     cases: 32,
//     address: "New York No. 1 Lake Park",
//   },
//   {

//     name: "John Brown",
//     cases: 32,
//     address: "New York No. 1 Lake Park",
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//   },
//   {
//     key: "4",
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//   },
// ];

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
          dataIndex: "name",
          
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ["descend"],

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
