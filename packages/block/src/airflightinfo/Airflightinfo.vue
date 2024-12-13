<template>
    <div class="bg-white rounded-lg border border-gray-300 p-4 flex items-center justify-between max-w-4xl mx-auto">
        <div class="flex items-center">
            <div>
                <p class="font-normal text-gray-600">
                    {{ flightNum }} |
                    <span v-if="carriageFlightNum" class="text-gray-500">承运{{ carriageFlightNum }}</span>
                    <span class="px-4">{{ flightDate }}</span>
                </p>
            </div>
            <div
                v-if="flightTag"
                class="bg-orange-400 text-white-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center justify-between leading-6"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8 15.5C3.85775 15.5 0.5 12.1423 0.5 8C0.5 3.85775 3.85775 0.5 8 0.5C12.1423 0.5 15.5 3.85775 15.5 8C15.5 12.1423 12.1423 15.5 8 15.5ZM11.615 11.807C12.5708 10.8975 13.1491 9.66157 13.2349 8.34503C13.3207 7.02848 12.9077 5.7279 12.078 4.70209C11.2483 3.67629 10.0628 3.00047 8.75743 2.80913C7.45205 2.61779 6.12247 2.92496 5.0333 3.6695C3.94412 4.41405 3.1752 5.54138 2.87955 6.82717C2.58391 8.11295 2.78321 9.46291 3.43779 10.6084C4.09238 11.7539 5.15426 12.611 6.41212 13.009C7.66998 13.407 9.03159 13.3169 10.226 12.7565L9.49475 11.4403C8.75442 11.762 7.93001 11.8363 7.14409 11.652C6.35816 11.4678 5.65267 11.0349 5.13247 10.4176C4.61228 9.80032 4.30515 9.03167 4.25675 8.22589C4.20834 7.4201 4.42125 6.62021 4.86381 5.94511C5.30637 5.27 5.95497 4.75573 6.71319 4.47873C7.47141 4.20173 8.29878 4.17678 9.0723 4.40761C9.84583 4.63844 10.5242 5.11271 11.0067 5.75993C11.4891 6.40715 11.7498 7.19277 11.75 8H9.5L11.615 11.807Z"
                        fill="white"
                    />
                </svg>
                {{ flightTag }}
            </div>
        </div>
        <div class="flex items-center flex-1 pl-16">
            <span class="text-gray-600 text-nowrap font-bold text-xl">{{ depFlight }}</span>
            <div class="border-t border-dashed border-gray-300 w-1/3"></div>
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13.053 11L8 19H6L8.526 11L3.166 11L1.5 14H0L1 9.5L0 5H1.5L3.167 8L8.527 8L6 0L8 0L13.053 8H18.5C18.8978 8 19.2794 8.15804 19.5607 8.43934C19.842 8.72064 20 9.10218 20 9.5C20 9.89782 19.842 10.2794 19.5607 10.5607C19.2794 10.842 18.8978 11 18.5 11H13.053Z"
                    fill="#50545E"
                />
            </svg>
            <div class="border-t border-dashed border-gray-300 w-1/3"></div>
            <span class="text-gray-600 text-nowrap font-bold text-xl">{{ arrFlight }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({ name: 'Airflightinfo' });
const airflightinfoRef = ref<HTMLElement>();

const props = defineProps({
    flightNum: {
        type: String,
        default: ''
    },
    carriageFlightNum: {
        type: String,
        default: ''
    },
    flightDate: {
        type: String,
        default: ''
    },
    flightTag: {
        type: String,
        default: ''
    },
    depFlight: {
        type: String,
        default: ''
    },
    arrFlight: {
        type: String,
        default: ''
    }
});

defineExpose({ airflightinfoRef });
</script>
