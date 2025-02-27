<template>
    <div
        class="flex items-center justify-between max-w-4xl mx-auto"
        :class="isHorizontal ? 'flex-row' : 'flex-col min-h-80'"
    >
        <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex flex-1"
            :class="[isCenter && isHorizontal ? 'items-center' : '', isHorizontal ? 'flex-col' : 'flex-row']"
        >
            <!-- <div class="relative w-full"> -->
            <div class="flex items-center w-full" :class="isHorizontal ? 'flex-row' : 'flex-col mr-2'">
                <div
                    v-if="isCenter && isHorizontal"
                    :class="[
                        'flex-1',
                        index === 0 ? '' : index < active ? 'bg-primary-500' : 'bg-gray-300',
                        isHorizontal ? 'h-0.5' : 'w-0.5'
                    ]"
                ></div>
                <div
                    :class="[
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                        index < active ? 'bg-primary-500 text-white-800' : 'bg-gray-300 text-white-800'
                    ]"
                >
                    <template v-if="index < active - 1">
                        <!-- <el-icon class="w-5 h-5"><component :is="icon" /></el-icon> -->
                        <!-- <ElIcon class="w-5 h-5">
                <component :is="props.icon" />
            </ElIcon> -->

                        <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                    </template>
                    <template v-else>
                        {{ index + 1 }}
                    </template>
                </div>
                <div
                    :class="[
                        'flex-1',
                        index === steps.length - 1 ? '' : index < active - 1 ? 'bg-primary-500' : 'bg-gray-300',
                        isHorizontal ? 'h-0.5' : 'w-0.5'
                    ]"
                ></div>
            </div>

            <div
                class="mt-2 text-sm font-medium whitespace-nowrap flex flex-col"
                :class="[index < active ? 'text-primary-500' : 'text-gray-600', isCenter ? 'items-center' : '']"
            >
                <p>{{ step ? step?.label : '' }}</p>
                <p>{{ step ? step?.description : '' }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { iconPropType } from 'element-plus/es/utils/vue/icon';
import { Check } from '@element-plus/icons-vue';

defineOptions({ name: 'AirStep' });
const airstepRef = ref<HTMLElement>();

defineProps({
    active: {
        type: Number,
        default: 0
    },
    isCenter: {
        type: Boolean,
        default: false
    },
    steps: {
        type: Array as () => { label: string; description?: string | undefined }[],
        default: () => []
    },
    isHorizontal: {
        type: Boolean,
        default: true
    },
    icon: {
        type: iconPropType,
        default: () => Check
    }
});

defineExpose({ airstepRef });
</script>
