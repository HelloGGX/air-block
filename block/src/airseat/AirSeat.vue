<template>
    <div class="air-seat flex flex-col items-center cursor-pointer" @click="handleClick">
        <svg
            v-if="status === 'available'"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="6.5" y="5.49935" width="27" height="27" rx="3.5" fill="#EDF4FF" stroke="#ABCAFF" />
            <rect x="31" y="9.99935" width="6" height="20.908" rx="3" fill="white" stroke="#ABCAFF" />
            <rect x="3" y="9.99935" width="6" height="20.908" rx="3" fill="white" stroke="#ABCAFF" />
            <rect
                x="34.5"
                y="35.4994"
                width="29"
                height="6"
                rx="3"
                transform="rotate(180 34.5 35.4994)"
                fill="white"
                stroke="#ABCAFF"
            />
        </svg>
        <svg
            v-else-if="status === 'selected'"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="6.5" y="5.49935" width="27" height="27" rx="3.5" fill="#5584F2" stroke="#ABCAFF" />
            <rect x="31" y="9.99935" width="6" height="20.7224" rx="3" fill="#5584F2" stroke="#ABCAFF" />
            <rect x="3" y="9.99935" width="6" height="20.7224" rx="3" fill="#5584F2" stroke="#ABCAFF" />
            <rect
                x="34.5"
                y="35.4994"
                width="29"
                height="6"
                rx="3"
                transform="rotate(180 34.5 35.4994)"
                fill="#5584F2"
                stroke="#ABCAFF"
            />

            <text
                x="50%"
                y="50%"
                fill="white"
                font-size="12"
                font-family="Arial"
                text-anchor="middle"
                dominant-baseline="middle"
            >
                {{ seatNumber }}
            </text>
        </svg>
        <svg
            v-else-if="status === 'unavailable'"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g opacity="0.7">
                <rect x="6.5" y="5.49935" width="27" height="27" rx="3.5" fill="#CCCDD3" stroke="#838791" />
                <path d="M25 12.9994L15 22.9994" stroke="#50545E" stroke-width="1.5" stroke-linecap="round" />
                <path d="M15.0002 12.9994L25.0002 22.9994" stroke="#50545E" stroke-width="1.5" stroke-linecap="round" />
                <rect x="31" y="9.99935" width="6" height="20.9078" rx="3" fill="#CCCDD3" stroke="#838791" />
                <rect x="3" y="9.99935" width="6" height="20.9078" rx="3" fill="#CCCDD3" stroke="#838791" />
                <rect
                    x="34.5"
                    y="35.4994"
                    width="29"
                    height="6"
                    rx="3"
                    transform="rotate(180 34.5 35.4994)"
                    fill="#CCCDD3"
                    stroke="#838791"
                />
            </g>
        </svg>
        <svg
            v-else-if="status === 'emergency-left'"
            width="28"
            height="40"
            viewBox="0 0 28 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#clip0_1_2315)">
                <path d="M0 4C2.20914 4 4 5.79086 4 8V32C4 34.2091 2.20914 36 0 36V4Z" fill="#33BB53" />
                <path
                    d="M24 8V31L27 32L10 33L7 32V8H24Z"
                    fill="url(#paint0_linear_1_2315)"
                    stroke="url(#paint1_linear_1_2315)"
                    stroke-width="2"
                    stroke-linejoin="round"
                />
                <g clip-path="url(#clip1_1_2315)">
                    <path
                        d="M18.67 17.79L20.5 18.456V22H22.5V17.05H22.485L17.217 15.132C16.973 15.039 16.707 14.992 16.435 15.001C15.8915 15.0146 15.3657 15.1971 14.9308 15.5233C14.4958 15.8495 14.1733 16.3031 14.008 16.821C13.822 17.404 13.652 17.798 13.498 18.003C13.0326 18.6236 12.4289 19.1272 11.735 19.4739C11.041 19.8205 10.2757 20.0007 9.5 20V22C10.5327 22.0011 11.5528 21.7733 12.4869 21.3329C13.421 20.8925 14.2458 20.2504 14.902 19.453L15.483 22.75L13.5 24.67V32H15.5V26.014L17.55 24.027L18.497 28.325L25.391 27.11L25.043 25.14L20.119 26.008L18.67 17.79ZM15 14.5C15.5304 14.5 16.0391 14.2893 16.4142 13.9142C16.7893 13.5391 17 13.0304 17 12.5C17 11.9696 16.7893 11.4609 16.4142 11.0858C16.0391 10.7107 15.5304 10.5 15 10.5C14.4696 10.5 13.9609 10.7107 13.5858 11.0858C13.2107 11.4609 13 11.9696 13 12.5C13 13.0304 13.2107 13.5391 13.5858 13.9142C13.9609 14.2893 14.4696 14.5 15 14.5Z"
                        fill="white"
                    />
                </g>
            </g>
            <defs>
                <linearGradient id="paint0_linear_1_2315" x1="17" y1="8" x2="17" y2="33" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#41BE5F" />
                    <stop offset="1" stop-color="#8DD99F" />
                </linearGradient>
                <linearGradient id="paint1_linear_1_2315" x1="17" y1="8" x2="17" y2="33" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#41BE5F" />
                    <stop offset="1" stop-color="#8DD99F" />
                </linearGradient>
                <clipPath id="clip0_1_2315">
                    <rect width="28" height="40" fill="white" />
                </clipPath>
                <clipPath id="clip1_1_2315">
                    <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 28.5 9)" />
                </clipPath>
            </defs>
        </svg>
        <svg
            v-else-if="status === 'emergency-right'"
            width="28"
            height="40"
            viewBox="0 0 28 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#clip0_1_2321)">
                <path d="M24 8C24 5.79086 25.7909 4 28 4V36C25.7909 36 24 34.2091 24 32V8Z" fill="#33BB53" />
                <path
                    d="M4 8V31L1 32L18 33L21 32V8H4Z"
                    fill="url(#paint0_linear_1_2321)"
                    stroke="url(#paint1_linear_1_2321)"
                    stroke-width="2"
                    stroke-linejoin="round"
                />
                <g clip-path="url(#clip1_1_2321)">
                    <path
                        d="M9.33 17.79L7.5 18.456V22H5.5V17.05H5.515L10.783 15.132C11.027 15.039 11.293 14.992 11.565 15.001C12.1085 15.0146 12.6343 15.1971 13.0692 15.5233C13.5042 15.8495 13.8267 16.3031 13.992 16.821C14.178 17.404 14.348 17.798 14.502 18.003C14.9674 18.6236 15.5711 19.1272 16.265 19.4739C16.959 19.8205 17.7243 20.0007 18.5 20V22C17.4673 22.0011 16.4472 21.7733 15.5131 21.3329C14.579 20.8925 13.7542 20.2504 13.098 19.453L12.517 22.75L14.5 24.67V32H12.5V26.014L10.45 24.027L9.503 28.325L2.609 27.11L2.957 25.14L7.881 26.008L9.33 17.79ZM13 14.5C12.4696 14.5 11.9609 14.2893 11.5858 13.9142C11.2107 13.5391 11 13.0304 11 12.5C11 11.9696 11.2107 11.4609 11.5858 11.0858C11.9609 10.7107 12.4696 10.5 13 10.5C13.5304 10.5 14.0391 10.7107 14.4142 11.0858C14.7893 11.4609 15 11.9696 15 12.5C15 13.0304 14.7893 13.5391 14.4142 13.9142C14.0391 14.2893 13.5304 14.5 13 14.5Z"
                        fill="white"
                    />
                </g>
            </g>
            <defs>
                <linearGradient id="paint0_linear_1_2321" x1="11" y1="8" x2="11" y2="33" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#41BE5F" />
                    <stop offset="1" stop-color="#8DD99F" />
                </linearGradient>
                <linearGradient id="paint1_linear_1_2321" x1="11" y1="8" x2="11" y2="33" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#41BE5F" />
                    <stop offset="1" stop-color="#8DD99F" />
                </linearGradient>
                <clipPath id="clip0_1_2321">
                    <rect width="28" height="40" fill="white" />
                </clipPath>
                <clipPath id="clip1_1_2321">
                    <rect width="24" height="24" fill="white" transform="translate(-0.5 9)" />
                </clipPath>
            </defs>
        </svg>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AirSeat' });

const props = defineProps({
    status: {
        type: String as () => 'available' | 'selected' | 'unavailable' | 'emergency-left' | 'emergency-right',
        default: 'available'
    },
    seatNumber: {
        type: Number,
        default: '1'
    }
});

const emit = defineEmits<{
    (e: 'click', { status, seatNumber }: { status: typeof props.status; seatNumber?: number }): void;
}>();

// 处理点击事件
const handleClick = () => {
    // 只有在 selected 状态下才传递 seatNumber
    const payload = { status: props.status } as { status: typeof props.status; seatNumber?: number };
    if (props.status === 'selected') {
        payload.seatNumber = props.seatNumber;
    }
    emit('click', payload);
};
</script>
