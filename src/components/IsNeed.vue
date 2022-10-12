<template>
    <div class="text-danger mt-2 text-sm">
       {{ text ?? '* field is compulsory' }}
    </div>
</template>
<script>

export default {
    name:"IsNeed",
    props:['text'],
    setup() {
        
    },
};
</script>
