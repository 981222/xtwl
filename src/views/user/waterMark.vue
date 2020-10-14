<template>
    <div>
        <div class="text-event">
            <DragImage
                    :w="150"
                    :h="150"
                    :x="50"
                    :y="50"
                    :min-width="50"
                    :min-height="50"
                    :parent="true"
                    :grid="[10,10]"
                    @dragging="onDrag"
                    @resizing="onResize">
                    <img style="width: 100%" src="https://icweiliimg6.pstatp.com/weili/l/919608410013958149.webp" alt="">
                    X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}
            </DragImage>
        </div>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                width: 0,
                height: 0,
                x: 0,
                y: 0,
            }
        },
        methods: {
            onResize: function(x, y, width, height) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            },
            onDrag: function(x, y) {
                this.x = x;
                this.y = y;
            }
        },
    };
</script>

<style scoped>
    .text-event {
        height: 500px;
        width: 500px;
        border: 1px solid red;
        position: relative;
        background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 10px 10px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 10px 10px;
    }

</style>