<script setup>
import { reactive, ref } from 'vue';
import Title2Component from '../Typography/Title/Title2Component.vue';

const props = defineProps({
  percentage: {
    type: Number,
    required: true
  }
})

const series = [props.percentage, 100 - props.percentage];

const color = ref();

if (props.percentage < 50) {
  color.value = 'var(--red-1)';
} else if (props.percentage < 75) {
  color.value = 'var(--yellow-1)';
} else {
  color.value = 'var(--green-1)';
}

const chartOptions = reactive({
  chart: {
    type: 'donut',
  },
  plotOptions: {
    pie: {
      customScale: 1,
      donut: {
        size: '75%',
      },
      expandOnClick: false,
      labels: {
        show: false,
      }
    }
  },
  legend: {
    show: false,
  },
  options: {
  },
  dataLabels: {
    enabled: false
  },
  fill: {
    colors: [color.value, '#D9D9D9'],
  },
})


</script>

<template>
  <div class="chart-percentage-wrapper">
    <div id="chart" class="chart">
      <apexchart type="donut" width="150px" :options="chartOptions" :series="series"></apexchart>
    </div>
    <Title2Component class="percentage-text">
      {{ props.percentage }}%
    </Title2Component>
  </div>
</template>

<style scoped>
.chart-percentage-wrapper {
  position: relative;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
}

.percentage-text {
  position: absolute;
  top: 48%;
  left: 52%;
  transform: translate(-50%, -50%);
}
</style>