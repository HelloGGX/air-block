<template>
    <div class="flex flex-col h-full">
        <!-- 头部插槽 -->
        <header class="flex items-center px-10 h-16">
            <slot name="header"> </slot>
        </header>

        <!-- 中间可滚动内容 -->
        <main class="flex-auto px-10 overflow-y-auto">
            <slot></slot>
        </main>

        <!-- 底部插槽 -->
        <footer class="flex items-center h-24 px-10">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* 如有需要，可添加额外样式 */
</style>
