<template>
    <div class="overflow-hidden">
        <div class="carousel">
            <div class="carousel-track">
                <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-item">
                    <p class="text-white italic">“{{ testimonial.text }}”</p>
                    <p class="text-gray-300">— {{ testimonial.author }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        testimonials: Array,
    },
};
</script>

<style scoped>
.carousel {
    display: flex;
    overflow: hidden;
}

.carousel-track {
    display: flex;
    transition: transform 0.5s ease;
}

.testimonial-item {
    min-width: 300px;
    margin: 0 10px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
}
</style>