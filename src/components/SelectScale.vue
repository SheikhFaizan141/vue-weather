<script setup>

const props = defineProps(['selected']);
defineEmits(['onScaleClick']);

console.log(props.selected);


// const get = computed()

</script>


<template>
    <div class="w-scale">
        <span
         @click="$emit('onScaleClick', 'c')" 
         :class="{ 'w-scale-active': selected === 'c' }" 
         class="w-scale-btn w-scale-celsius"
        >°C</span>
        <span>|</span>
        <span 
        @click="$emit('onScaleClick', 'f')" 
        :class="{ 'w-scale-active' : selected === 'f'}" class="w-scale-btn w-scale-fahrenheit"
        >°F</span>
    </div>
</template>


<style scoped>
.w-scale {
    display: flex;
    column-gap: .25rem;
    font-size: 1.25rem;
    font-weight: 500;
    padding: .5rem;
    cursor: pointer;
    color: var(--primary-color);
}


.w-scale-active {
    color: gray;
    cursor: text;
}
</style>