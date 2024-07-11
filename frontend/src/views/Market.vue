<template>
    <div class="flex flex-col items-center justify-between min-h-screen bg-gray-200 mt-1 mb-10 pt-10">
        <div class="flex w-10/12 justify-between items-center mb-5">
            <div>
                <h1 class="text-gray-700">Market</h1>
            </div>

            <div class="flex space-x-5 ">
                <div>
                    <form class="ml-auto flex-1 sm:flex-initial">
                        <div class="relative">
                            <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search products..." v-model="searchTerm"
                                class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] border-0 outline-none text-sm " />
                        </div>
                    </form>
                </div>

                <Toaster />
                <Button @click="addToCalendar">
                    Add to calendar
                </Button>

                <Button variant="outline" @click="showToast">
                    Show Toast
                </Button>
            </div>
        </div>

        <!-- login -->
        <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div class="flex items-center justify-center py-12">
                <div class="mx-auto grid w-[350px] gap-6">
                    <div class="grid gap-2 text-center">
                        <h1 class="text-3xl font-bold">
                            Login
                        </h1>
                        <p class="text-balance text-muted-foreground">
                            Enter your username below to login to your account
                        </p>
                    </div>
                    <!-- form -->
                    <form @submit.prevent="login">
                        <div class="grid gap-4">
                            <div class="grid gap-2">
                                <Label for="username">username</Label>
                                <Input type="text" id="username" v-model="loginUsername" required />
                            </div>
                            <div class="grid gap-2">
                                <div class="flex items-center">
                                    <Label for="password">Password</Label>
                                    <a href="/forgot-password" class="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" v-model="loginPassword" type="password" required />
                            </div>
                            <Button type="submit" class="w-full">
                                Login
                            </Button>
                            <p v-if="errorMessage" class="mt-4 text-red-500 text-center">{{ errorMessage }}</p>
                            <!-- <Button variant="outline" class="w-full">
                                Login with Google
                            </Button> -->
                        </div>
                    </form>
                    <div class="mt-4 text-center text-sm">
                        Don't have an account?
                        <a href="#" class="underline">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
            <div class="hidden bg-muted lg:block">
                <img src="https://wallpapercave.com/wp/wp7969113.jpg" alt="Image" width="1920" height="1080"
                    class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale">
            </div>
        </div>

        <Footer />
    </div>
</template>

<script setup>
import Footer from './Footer.vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Activity, ArrowUpRight, CircleUser, CreditCard, DollarSign, Menu, Package2, Search, Users } from 'lucide-vue-next';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast/use-toast';
import { Toaster } from '@/components/ui/toast';
import { ToastAction } from '@/components/ui/toast';

const { toast } = useToast();

const router = useRouter();
const loginUsername = ref('');
const loginPassword = ref('');
const errorMessage = ref('');
const searchTerm = ref('');

const login = () => {
    if (!loginUsername.value || !loginPassword.value) {
        errorMessage.value = 'Please fill in all fields';
        return;
    }

    const user = {
        loginUsername: loginUsername.value,
        loginPassword: loginPassword.value
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
                errorMessage.value = data.message;
            } else {
                console.log('User logged in:', data);
                localStorage.setItem('token', data.token); // Store token in localStorage
                localStorage.setItem('username', data.username); // Store username in localStorage
                loginUsername.value = '';
                loginPassword.value = '';
                errorMessage.value = '';
                router.push('/products');
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
            errorMessage.value = 'An error occurred. Please try again.';
        });
};

const addToCalendar = () => {
    toast({
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM',
    });
};

const showToast = () => {
    toast({
        description: 'Your message has been sent.',
    });
};
</script>

<style>
/* Add your styles here */
</style>
