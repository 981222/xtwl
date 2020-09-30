<template>
    <div>
        <h1>欢迎回来!</h1>
        <p>{{ username }}</p>
    </div>
</template>

<script>
    export default {
        props:['username', 'email', 'phone', 'grade'],
    };
</script>

<style scoped>

</style>