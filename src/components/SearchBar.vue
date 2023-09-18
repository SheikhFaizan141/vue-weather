<script setup>
import { ref,onMounted, watchEffect } from "vue";

const searchTag = ref();

const list = ref([]);

onMounted(() => {
    document.addEventListener('click', (e) => {
        console.dir(e.target);
        if (!e.target.closest('#search-bar')) {
            searchValue.value = '';
            selected.value = -1;
        }
        console.log(e.target.closest('#search-bar'));
    })
})



defineProps(['modelValue']);
const emit = defineEmits(['clickOnLoc', 'location']);

const searchValue = ref('')
const selected = ref(-1);


function onSearchClick() {
    searchTag.value.focus();
}

function handleKeyDown(index) {
    selected.value = selected.value < list.value.length ? selected.value + 1 : 0;
}

function handleKeyUp(e) {
    selected.value = selected.value > -1 ? selected.value - 1 : list.value.length - 1;
}

function handleClick(index) {
    console.log('hi');
    let lat = list.value[index]['lat'];
    let lon = list.value[index]['lon'];

    emit('location', lat, lon);

    searchValue.value = '';
}

watchEffect(async () => {
    if (searchValue.value !== '') {
        try {
            const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchValue.value}&limit=5&appid=d5cf16c9a343a988a0ba9ec47620dc88`);

            if (!res.ok) {
                console.log('error');
            }

            const data = await res.json();
            list.value = data;
            // console.log(data);

        } catch (error) {

        }
    }
});



</script>

<template>
    <div id="search-bar" class="search-container">
        <div class="w-search-box">
            <i @click="onSearchClick">🔍</i>
            <!-- <div > -->
            <form @submit.prevent="$emit('onSubmit', modelValue)">
                <input 
                    ref="searchTag" type="search" 
                    id="w-search" placeholder="Search City" 
                    autocomplete="off"
                    v-model.trim="searchValue"
                    @keydown.down="handleKeyDown"
                    @keydown.up="handleKeyUp"
                >
            </form>
            <!-- </div> -->
            <button class="s-loc-btn" @click="$emit('clickOnLoc')">
                <i>Loc</i>
            </button>
        </div>
        <ul 
         class="search-ul" v-if="searchValue"
       
        >
            <li 
             class="s-items" v-for="({ name, state, country }, index) in list" 
             @click.stop="handleClick(index)"
             :class="{'s-item-selected': index === selected}"
            >


                <!-- <i></i> -->
                <span class="s-item-city">
                    {{ name }},
                </span>
                <span v-if="state" class="s-item-state">
                    {{ state }},
                </span>
                <span class="s-item-con">
                    {{ country }}
                </span>


            </li>
        </ul>
    </div>
</template>


<style scoped>
.search-container {
    color: #000;
    position: relative;
    background-color: rgb(187, 187, 187);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    z-index: 5;
    /* padding: .5rem .5rem 0 .5rem; */
    /* padding-block-end: 10px; */

}

/* .s-loc-btn {
    background-color: greenyellow;
} */

.search-container ul {
    position: absolute;
    /* margin-block-start: .25rem; */
    list-style: none;
    width: 100%;
    background-color: inherit;
    padding-left: 0;
    padding-block-end: 1rem;
    border-end-end-radius: 3px;
    border-end-start-radius: 3px;
}

.search-ul li {
    list-style-type: none;
    padding: .25rem .75rem .25rem .75rem;
    /* margin-block-end: .25rem; */
    /* font-size: 1.05rem; */
    cursor: default;
    /* border-block-end: 1px solid rgb(255, 255, 255); */
}

.search-ul> :last-child {
    /* padding-block-end: 0; */
    margin-block-end: 0;
    border-block-end: 0;
}

.search-ul li:hover {
    /* transition: background-color 100ms ease-in-out ; */
    background-color: rgb(175, 175, 175);
    /* border-inline-start: .25rem solid rgb(0, 0, 0); */
}

.s-item-selected {
    background-color: rgb(175, 175, 175);
    border-inline-start: .25rem solid rgb(0, 0, 0);
}

.w-search-box {
    display: flex;
    align-items: stretch;
    margin-right: .5rem;
    column-gap: .25rem;

    padding: .75rem .5rem;

}

.search-container [type="search"] {
    background-color: inherit;
    color: white;
    column-rule-color: orange;
    border: 0;
    height: 100%;
    outline: none;
    font-size: 1rem;

    display: block;
    caret-color: rgb(255, 255, 255);
}

.search-container [type="search"]::placeholder {
    color: #ffffff;

}

/*  */
</style>