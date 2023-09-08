<script setup>
import { reactive, ref } from 'vue';
import TitleSmall from '../Typography/Title/TitleSmall.vue';

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
    <TitleSmall class="percentage-text">
      {{ props.percentage }}%
    </TitleSmall>
    <div class="chart-percentage-glass"></div>
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

.chart-percentage-glass {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: transparent;
  opacity: 0.5;
}
</style>