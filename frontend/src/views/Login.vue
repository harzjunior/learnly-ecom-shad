<!-- frontend/src/views/Login.vue -->
<template>
  <div class="flex flex-col items-center justify-between min-h-screen bg-[#242424] text-gray-50 mt-1 -mb-5 ">
    <!-- login -->
    <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div class="flex items-center justify-center py-12">
        <div class="mx-auto grid w-[350px] gap-6">
          <div class="grid gap-2 text-center">
            <h1 class="text-3xl font-bold">Login</h1>
            <p class="text-balance text-muted-foreground text-gray-300">Enter your username below to login to your
              account</p>
          </div>
          <!-- form -->
          <form @submit.prevent="login">
            <div class="grid gap-4">
              <div class="grid gap-2">
                <label for="username" class="block text-lg font-semibold text-gray-300 mb-2 text-left">Username</label>
                <input type="text" id="username" v-model="loginUsername"
                  class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required />
              </div>
              <div class="grid gap-2">
                <div class="flex items-center">
                  <label for="password"
                    class="block text-lg font-semibold text-gray-300 mb-2 text-left">Password</label>
                  <a href="/forgot-password" class="ml-auto inline-block text-sm underline">Forgot your password?</a>
                </div>
                <input id="password" v-model="loginPassword" type="password"
                  class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required />
              </div>
              <button type="submit"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4">Login</button>
              <p v-if="errorMessage" class="mt-4 text-red-500 text-center">{{ errorMessage }}</p>
            </div>
          </form>
          <div class="mt-4 text-center text-sm">
            Don't have an account? <router-link to="/register" class="underline">Sign up</router-link>
            <!-- <a href="#" class="underline">Sign up</a> -->
          </div>
        </div>
      </div>
       <!-- Right Section: Image -->
      <div class="relative hidden lg:block overflow-hidden">
        <img src="https://wallpapercave.com/wp/wp7969113.jpg" alt="Image" width="1920" height="1080"
          class="h-full w-full object-cover" />
        <div
          class="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-black via-transparent to-black">
          <div class="text-center px-8 py-4 text-white backdrop-blur-md bg-black bg-opacity-50 rounded-lg shadow-lg">
            <h2 class="text-5xl font-extrabold mb-4 animate-pulse">Welcome Back!</h2>
            <p class="text-lg mb-4 animate-fade-in">We're glad to see you again. Please login to access your account.
            </p>
            <p class="text-md">New here? Sign up and join our community!</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script>
// import Footer from './Footer.vue';
import { toast } from 'vue-sonner';

export default {
  components: {
    // Footer
  },
  data() {
    return {
      loginUsername: '',
      loginPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    login() {
      if (!this.loginUsername || !this.loginPassword) {
        this.errorMessage = 'Please fill in all fields';
        return;
      }

      const user = {
        loginUsername: this.loginUsername,
        loginPassword: this.loginPassword
      };

      fetch('http://localhost:5050/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            this.errorMessage = data.message;
          } else {
            toast.success("Logged Successfully");
            console.log('User logged in:', data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            this.$root.username = this.loginUsername;
            this.loginUsername = '';
            this.loginPassword = '';
            this.errorMessage = '';
            this.$router.push('/products');
          }
        })
        .catch(error => {
          console.error('Error logging in:', error);
          this.errorMessage = 'An error occurred. Please try again.';
        });
    }
  }
};
</script>

<style>
@keyframes fade-in {
  0% {
    opacity: 0;
  }

  5% {
    opacity: 0.5;
  }

  100% {
    opacity: 0.8;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-in-out;
}

.backdrop-blur-md {
  backdrop-filter: blur(10px);
}
</style>
