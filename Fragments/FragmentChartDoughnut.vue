<script setup>
import { reactive } from 'vue';

const props = defineProps({
  labels: {
    type: Array,
    required: true
  },
  series: {
    type: Array,
    required: true
  }
})

const chartOptions = reactive({
  chart: {
    type: 'donut',
  },
  labels: props.labels,
  plotOptions: {
    pie: {
      customScale: 1,
      donut: {
        size: '75%',
      },
      expandOnClick: false,
    }
  },
  legend: {
    position: 'right',
    fontFamily: 'Montserrat',
    verticalAlign: 'center',
    fontSize: '12px',
  },
  options: {
  },
  dataLabels: {
    enabled: false
  },
})


</script>

<template>
  <div id="chart" class="chart">
    <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style>
svg#SvgjsSvg4260 {
  display: flex;
  align-items: center;
}

.apexcharts-legend.apexcharts-align-center.apx-legend-position-right {
  display: flex;
  text-align: left;
  padding: 0;
  row-gap: .25rem;
  margin: 0;
  margin-top: -22px;
  justify-content: center;
}
</style>