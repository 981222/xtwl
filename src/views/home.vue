<template>
    <div>
        <h1>欢迎回来!</h1>
        <p>{{ username }}</p>
        <br>
        <p style="color: red">系统提示：目前系统不允许一个账号同时登陆,否则会被挤下线！</p>
    </div>
</template>

<script>
    export default {
        props:['username', 'email', 'phone', 'grade'],
    };
</script>

<style scoped>

</style>