<template>
  <div class="mt-10 bg-gray-100 py-10 text-center text-gray-800">
    <h2 class="text-3xl font-bold mb-4">Contact Us</h2>
    <p class="text-lg mb-8">Have any questions? Reach out to us using the form below!</p>
    <form @submit.prevent="submitForm" class="max-w-lg mx-auto">
      <div class="mb-4">
        <input type="text" v-model="name" placeholder="Your Name" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required>
      </div>
      <div class="mb-4">
        <input type="email" v-model="email" placeholder="Your Email" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" required>
      </div>
      <div class="mb-4">
        <textarea v-model="message" placeholder="Your Message" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" rows="5" required></textarea>
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none">Send Message</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      message: ''
    };
  },
  methods: {
    submitForm() {
      alert(`Message sent by ${this.name}`);
      // Add form submission logic here
      this.name = '';
      this.email = '';
      this.message = '';
    }
  }
};
</script>

<style scoped>
</style>
