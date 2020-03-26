<template>
  <div>
      <div>
        <b-navbar class="menu-wrapper">
          <template slot="start" >
            <b-navbar-item href="">
              COVID-19
            </b-navbar-item>
          </template>
          <template slot="end">
            <b-navbar-item href="">
              Model Prediction
            </b-navbar-item>
            <b-navbar-item href="">
              About Us
            </b-navbar-item>
            <b-navbar-item href="">
              Sources
            </b-navbar-item>
            <b-navbar-item href="">
              Contribute
            </b-navbar-item>
            <b-navbar-item href="">
              <button class="button has-text-primary" style="background-color: #80B5FF">Contact us</button>
            </b-navbar-item>

          </template>

        </b-navbar>
      </div>

    <section class="content">

        <div class="container">
          <h1 class="title is-3">
              Novel Corona Virus (COVID19)
          </h1>

            <div class="columns" style="margin-top: 10px">
                <div class="column totalCases">
                    <p class="title is-4">
                        Affected People
                    </p>
                    <p class="subtitle is-2">
                        {{confirmedCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}}
                    </p>
                </div>
                <div class="column totalCases">
                    <p class="title is-4">
                        People Cured
                    </p>
                    <p class="subtitle is-2" >
                        {{recoveredCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}}
                    </p>
                </div>
                <div class="column totalCases">
                    <p class="title is-4">
                        People Died
                    </p>
                    <p class="subtitle is-2">
                        {{deathCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}}
                    </p>
                </div>
            </div>

         <div class="confirmedCasesChart">
           <div id="main" style="width:100%; height:300px; padding-top:1rem">

           </div>
         </div>

             <div class="columns" style="margin-top: 10px">
               <div class="column mortalCases">
                     <div id="pieChart" style="height:400px; width:100% ;">
                     </div>
               </div>

                 <div class="column mortalCases" style="margin-left: 1rem">
                     <div id="bar" style="height:400px; width:100% ;">
                     </div>
                 </div>
             </div>

     </div>
    </section>

<!--  <section class="secondContent">-->
<!--      <div class="container">-->
<!--          <h1 class="title is-3">-->
<!--              Regional Corona Virus Outbreak-->
<!--          </h1>-->
<!--      </div>-->
<!--  </section>-->

      <section class="moreInfoContent">
          <div class="container">
              <h1 class="title is-3">
                  More Info
              </h1>
              <div class="columns">
                  <div class="column">
                      <div class="card">
                              <figure class="image is-3by2" >
                                  <img src="../assets/Image2.png" style="border-radius: 15px">
                              </figure>
                          <div class="card-content">
                              <h1 class="title" style="color:#031C3F">
                                Symptoms
                              </h1>
                              <button class="button has-text-primary" style="background-color:#031C3F">Know More</button>
                          </div>
                      </div>
                  </div>
                  <div class="column">
                      <div class="card">
                          <figure class="image is-3by2">
                              <img src="../assets/Image1.png" style="border-radius: 15px">
                          </figure>
                          <div class="card-content">
                              <h1 class="title"  style="color:#031C3F">
                                  Precautions
                              </h1>
                              <button class="button has-text-primary" style="background-color:#031C3F">Know More</button>
                          </div>
                      </div>
                  </div>
                  <div class="column">
                      <div class="card">
                          <figure class="image is-3by2">
                              <img src="../assets/Image5.png" style="border-radius: 15px">
                          </figure>
                          <div class="card-content">
                              <h1 class="title"  style="color:#031C3F">
                                  HelpLine
                              </h1>
                              <button class="button has-text-primary" style="background-color:#031C3F">Know More</button>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      <section class="hero is-medium backgroundImage">
          <div class="hero-body">
              <div class="container">
                  <h1 class="title">
                     Want to know how we are doing this?
                  </h1>
                  <button class="button">Know Our Process?</button>
              </div>
          </div>
      </section>

      <section class="hero is-medium" style="background-color: #042554">
          <div class="hero-body">
              <div class="container">
                  <h1 class="title">
                     Spread a word about us
                  </h1><br>
                  <h1 class="subtitle has-text-primary">
                      Let your friends and family know about us, Together We can overcome this crises
                  </h1>

              </div>
          </div>
      </section>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'HelloWorld',
  data(){
    return{
      totalCases:'',
      confirmedCases: '',
      recoveredCases: '',
      deathCases: '',
      totalCountriesAffected: ''
    }
  },

  mounted(){
    this.axiosInstance = axios.create({
      timeout:50000,
      headers:{
        'Content-Type': 'application/json',
      }
    });
    this.totalCasesWorld();
    this.drawChart();
    this.drawMortalityBarGraph();
    this.totalNumberCases();

  },


  methods:{

      totalNumberCases(){
          this.$data.totalCases= this.$data.confirmedCases+this.$data.recoveredCases+this.$data.deathCases;
      },

      totalCasesWorld(){
        this.axiosInstance.get("/cases/total")
        .then(response=> {
          var str= response.data;
          if (str.includes("\"")) {
            var valid_str = JSON.parse(str);
          }
          this.$data.confirmedCases = valid_str.confirmed;
          this.$data.recoveredCases = valid_str.recovered;
          this.$data.deathCases = valid_str.deaths;
          this.$data.totalCountriesAffected = valid_str.totalCountries;

            // eslint-disable-next-line no-undef
            var myChart = echarts.init(document.getElementById('pieChart'));

            myChart.setOption({
                title: {
                    // text: '天气情况统计',
                    // subtext: '虚构数据',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    // formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    // orient: 'vertical',
                    // top: 'middle',
                    bottom: 10,
                    left: 'center',
                    data: ['Affected People','Recovered', 'Deaths']
                },
                series: [
                    {
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: [
                            {
                                // value: 1548,
                                // name: '幽州',
                                label: {
                                    // formatter: [
                                    //     '{title|{b}}{abg|}',
                                    //     '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
                                    //     '{hr|}',
                                    //     '  {Sunny|}{value|202}{rate|55.3%}',
                                    //     '  {Cloudy|}{value|142}{rate|38.9%}',
                                    //     '  {Showers|}{value|21}{rate|5.8%}'
                                    // ].join('\n'),
                                    backgroundColor: '#eee',
                                    borderColor: '#777',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    rich: {
                                        title: {
                                            color: '#eee',
                                            align: 'center'
                                        },
                                        abg: {
                                            backgroundColor: '#333',
                                            width: '100%',
                                            align: 'right',
                                            height: 25,
                                            borderRadius: [4, 4, 0, 0]
                                        },
                                        Sunny: {
                                            height: 30,
                                            align: 'left',

                                        },
                                        Cloudy: {
                                            height: 30,
                                            align: 'left',

                                        },
                                        Showers: {
                                            height: 30,
                                            align: 'left',

                                        },
                                        // weatherHead: {
                                        //     color: '#333',
                                        //     height: 24,
                                        //     align: 'left'
                                        // },
                                        hr: {
                                            borderColor: '#777',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        value: {
                                            width: 20,
                                            padding: [0, 20, 0, 30],
                                            align: 'left'
                                        },
                                        valueHead: {
                                            color: '#333',
                                            width: 20,
                                            padding: [0, 20, 0, 30],
                                            align: 'center'
                                        },
                                        rate: {
                                            width: 40,
                                            align: 'right',
                                            padding: [0, 10, 0, 0]
                                        },
                                        rateHead: {
                                            color: '#333',
                                            width: 40,
                                            align: 'center',
                                            padding: [0, 10, 0, 0]
                                        }
                                    }
                                }
                            },
                            {value: this.$data.confirmedCases, name: 'Affected People'},
                            {value: this.$data.recoveredCases, name: 'Recovered'},
                            {value: this.$data.deathCases, name: 'Deaths'},
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })

        }).catch(error=>{
          console.log(error.response.data)
        })
      },

      drawChart(){
          // eslint-disable-next-line no-undef
          var myChart = echarts.init(document.getElementById('main'));
          this.axiosInstance.get("/cases")
                .then(response=>{
                  console.log(response.data)
                  var str=response.data;
                  if (str.includes("\"")) {
                    var valid_str = JSON.parse(str);
                  }

                   var arr_x = valid_str.json_xax;
                   var arr_y = valid_str.confirmed;
                   var recovered = valid_str.recovered;
                   var death = valid_str.death;

                   //timestamp is in nanoseconds
                   ////convert timestamp to human readable form
                    var array_humanDate=[]
                    arr_x.forEach(function(arr){
                    var arr_humanDate = (new Date(arr/1000000)).toLocaleDateString();
                    array_humanDate.push(arr_humanDate)

                     myChart.setOption({
                         title: {
                             text: 'Statistics'
                         },
                         tooltip: {
                             trigger: 'axis',
                             axisPointer: {
                                 type: 'cross',
                                 label: {
                                     backgroundColor: '#6a7985'
                                 }
                             }
                         },
                         legend: {
                             data: ['Affected People','Recovered', 'Deaths']
                         },
                         toolbox: {
                             feature: {
                                 saveAsImage: {}
                             }
                         },
                         grid: {
                             left: '3%',
                             right: '4%',
                             bottom: '3%',
                             containLabel: true
                         },
                         xAxis: [
                             {
                                 type: 'category',
                                 boundaryGap: false,
                                 data: array_humanDate
                             }
                         ],
                         yAxis: [
                             {
                                 type: 'value'
                             }
                         ],
                         series: [
                             {
                                 name: 'Deaths',
                                 type: 'line',
                                 stack: '总量',
                                 areaStyle: {},
                                 data: death
                             },
                             {
                                 name: 'Recovered',
                                 type: 'line',
                                 stack: '总量',
                                 areaStyle: {},
                                 data: recovered
                             },

                             {
                                 name: 'Affected People',
                                 type: 'line',
                                 stack: '总量',
                                 label: {
                                     normal: {
                                         show: true,
                                         position: 'top'
                                     }
                                 },
                                 areaStyle: {},
                                 data: arr_y
                             }
                         ]
                     });
                   });

                }).catch(error=> {
                     console.log(error.response.data);
                   });

      },

      drawMortalityBarGraph(){
      // eslint-disable-next-line no-undef
      var myChart = echarts.init(document.getElementById('bar'));
      this.axiosInstance.get("/perCountry/mortality")
      .then(response=>{
        console.log(response.data)
        var str=response.data;
        if (str.includes("\"")) {
          var valid_str = JSON.parse(str);
        }

        var arr_x = valid_str.json_xax;
        var arr_y = valid_str.json_yax;
        console.log(arr_y,arr_x)

        myChart.setOption(
                 {
                     title: {
                         text: 'Mortality in Countries',
                         subtext: '(World-wide)'
                     },
                     tooltip: {
                         trigger: 'axis',
                         axisPointer: {
                             type: 'shadow'
                         }
                     },
                     legend: {
                         data: ['Mortality']
                     },
                     grid: {
                         left: '3%',
                         right: '4%',
                         bottom: '3%',
                         containLabel: true
                     },
                     xAxis: {
                         type: 'value',
                         boundaryGap: [0, 0.01]
                     },
                     yAxis: {
                         type: 'category',
                         data: arr_y
                     },
                     series: [
                         {
                             name: 'Mortality Rate',
                             type: 'bar',
                             data: arr_x,
                             color:'#334B5C',
                         },

                     ]
                }

      )
      }).catch(error=>{
        console.log(error.response.data)
      })

    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title.is-3{
  color:white;
  padding-top: 2rem;
  padding-bottom: 3rem;
}
  .content{
    width:100%;
    height:80rem;
    background-color: #01132c;
    margin-bottom: auto!important;
  }
.confirmedCasesChart{
  width:100%;
  height:20rem;
  background-color: white;
  padding:0rem 3rem 0rem 3rem;
  border-radius: 15px;
}
  .title.is-4{
    color: #01132c;
    padding-bottom: 1rem;
    padding-top: 1rem;
  }

.mortalCases{
  height:28rem;
  background-color: white;
  padding: 1rem 1rem 1rem 1rem;
  border-radius: 15px;
}
.secondContent{
    padding: 0rem;
    width:100%;
    height:40rem;
    background-color: #042554;
}
.moreInfoContent{
    width:100%;
    height:40rem;
    background-color: #042554;
    margin-bottom: auto!important;
}
.backgroundImage{
    background-image: url("../assets/Artboard.png");
    background-repeat: no-repeat;
}
</style>
