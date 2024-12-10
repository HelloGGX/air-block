<template>
    <div
        data-testid="card-box"
        v-show="isVisible"
        :class="[
            'rounded-lg p-3 flex justify-between items-center transition-colors duration-300 ease-in-out',
            isSelected ? 'bg-primary-500 text-white-800' : 'bg-white border border-gray-300 '
        ]"
        :style="{ width, height }"
        @click="selectPsg"
    >
        <div class="flex flex-col">
            <div :class="[isSelected ? 'text-white-800' : 'text-gray-600']">{{ num }}.{{ name }}</div>
            <div :class="['text-xl font-bold', isSelected ? 'text-white-400' : 'text-gray-400']">
                {{ seatNum }}
            </div>
        </div>
        <button
            v-show="showClose"
            @click.stop="handleClose"
            :class="[
                'focus:outline-none flex-shrink-0',
                isSelected ? 'text-primary-500' : 'text-white-800 hover:text-gray-200'
            ]"
            aria-label="Toggle selection"
        >
            <svg
                v-if="!isSelected"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 8.586L7.172 5.757L5.757 7.172L8.586 10L5.757 12.828L7.172 14.243L10 11.414L12.828 14.243L14.243 12.828L11.414 10L14.243 7.172L12.828 5.757L10 8.586Z"
                    fill="#B1B5BD"
                />
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 8.586L7.172 5.757L5.757 7.172L8.586 10L5.757 12.828L7.172 14.243L10 11.414L12.828 14.243L14.243 12.828L11.414 10L14.243 7.172L12.828 5.757L10 8.586Z"
                    fill="white"
                    fill-opacity="0.48"
                />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    num: {
        type: Number,
        default: 1
    },
    name: {
        type: String,
        default: 'placeholder'
    },
    seatNum: {
        type: String,
        default: 'defalute'
    },
    height: {
        type: String,
        default: '74px'
    },
    width: {
        type: String,
        default: '200px'
    },
    showClose: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'select'): void;
}>();

const id = ref(`air-card-${Date.now()}`);
const isVisible = ref(true);
const isSelected = ref(false);

function handleClose() {
    emit('close');
    isVisible.value = false;
}

function selectPsg() {
    emit('select');
    isSelected.value = !isSelected.value;
}
</script>
