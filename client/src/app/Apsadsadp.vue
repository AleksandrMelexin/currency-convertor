<template>
  <v-app>
    <v-app-bar color="primary">
      <v-toolbar-title>Конвертер валют</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" variant="text">Главная</v-btn>
      <v-btn to="/history" variant="text">История</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
</script>