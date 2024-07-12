<template>
    <div
      class="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-[#242424] to-[#121212] text-gray-50 relative overflow-hidden">
      
      <!-- Hero Section -->
      <div class="text-center space-y-8 mt-20">
        <h1 class="text-6xl font-bold animate-fade-in">Coming Soon</h1>
        <p class="text-xl animate-slide-up">We are working hard to bring you something amazing. Stay tuned!</p>
        <div class="text-4xl font-semibold animate-bounce">
          <span>{{ days }}d </span>
          <span>{{ hours }}h </span>
          <span>{{ minutes }}m </span>
          <span>{{ seconds }}s</span>
        </div>
        <div class="mt-6 flex justify-center">
          <input type="email" placeholder="Enter your email" v-model="email"
            class="px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-blue-500" />
          <button @click="subscribe"
            class="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 px-4 rounded-r focus:outline-none transition-transform transform hover:scale-105">
            Subscribe
          </button>
        </div>
        <p v-if="message" class="mt-4 text-lg animate-fade-in">{{ message }}</p>
      </div>
  
      <!-- Teaser Content Section -->
      <div class="mt-10 text-center">
        <h2 class="text-3xl font-bold my-10">Sneak Peek of Our Products</h2>
        <div class="flex justify-center space-x-4">
          <div v-for="product in teaserProducts" :key="product.name" class="bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
            <img :src="product.image" :alt="product.name" class="rounded-lg w-40 h-40 object-cover mb-2" />
            <h3 class="text-white text-lg font-semibold">{{ product.name }}</h3>
          </div>
        </div>
      </div>
  
      <!-- Testimonials Section -->
      <div class="mt-10 w-full overflow-hidden my-5">
        <h2 class="text-3xl font-bold text-center my-10">What People Are Saying</h2>
        <div class="flex justify-center space-x-4 my-10">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 shadow-lg w-72 text-center transition-transform transform hover:scale-105">
            <p class="text-white italic">“{{ testimonial.text }}”</p>
            <p class="text-right font-bold text-white">{{ testimonial.author }}</p>
          </div>
        </div>
      </div>
  
      <!-- Social Media Links -->
      <div class="social-media-icons flex space-x-4 my-10">
        <a href="#" class="text-blue-500 hover:text-blue-600">Twitter</a>
        <a href="#" class="text-blue-500 hover:text-blue-600">Instagram</a>
        <a href="#" class="text-blue-500 hover:text-blue-600">Facebook</a>
      </div>
  
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet" class="absolute w-full h-full opacity-10">
          <defs>
            <filter id="f1">
              <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="40" fill="#ffffff" filter="url(#f1)" />
        </svg>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const email = ref('');
      const message = ref('');
      const targetDate = new Date('2024-12-31T23:59:59');
      const days = ref(0);
      const hours = ref(0);
      const minutes = ref(0);
      const seconds = ref(0);
  
      const teaserProducts = [
        { name: 'Neo Era Designers', image: 'https://i.etsystatic.com/42678828/r/il/b5bfb4/4878450308/il_600x600.4878450308_lfmv.jpg' },
        { name: 'Grandpa Street Style', image: 'https://img.freepik.com/premium-photo/cute-cartoon-cat-character-generative-ai_570929-3968.jpg' },
        { name: 'Neo Era Designers', image: 'https://img.freepik.com/premium-photo/image-cat-wearing-hoodie-generative-ai_97167-1329.jpg' },
      ];
  
      const testimonials = [
        { text: 'Fast delivery and top-notch quality. Highly recommended!', author: 'Tunde Ola' },
        { text: 'Amazing store! Great products and excellent customer service.', author: 'Akinde Lolade' },
        { text: 'Best shopping experience ever!', author: 'Acolyte Sasha' },
      ];
  
      const updateCountdown = () => {
        const now = new Date();
        const timeRemaining = targetDate - now;
  
        days.value = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        hours.value = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes.value = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        seconds.value = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      };
  
      const subscribe = () => {
        if (email.value) {
          message.value = 'Thank you for subscribing!';
          email.value = '';
        } else {
          message.value = 'Please enter a valid email.';
        }
      };
  
      onMounted(() => {
        updateCountdown();
        setInterval(updateCountdown, 1000);
      });
  
      return { email, message, days, hours, minutes, seconds, subscribe, teaserProducts, testimonials };
    },
  };
  </script>
  
  <style>
  .testimonials-track {
    display: flex;
    overflow: hidden;
    animation: scroll 15s linear infinite;
  }
  
  .testimonial-item {
    flex: 0 0 300px;
    margin: 0 20px;
    text-align: center;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  .animate-fade-in {
    animation: fadeIn 2s ease-in-out;
  }
  
  .animate-slide-up {
    animation: slideUp 2s ease-in-out;
  }
  
  .animate-bounce {
    animation: bounce 2s infinite;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  /* Add any additional styles you need */
  </style>
  