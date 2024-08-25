<script lang="ts">
  import { authStore } from "../stores/authStore";
  import { navigate } from "svelte-routing";

  const LOGIN_PATH: string = "/login";

  $: if ($authStore.loading) {
  } else if (!$authStore.user) {
    navigate(LOGIN_PATH);
  }
</script>

{#if $authStore.user}
  <slot></slot>
{:else if $authStore.loading}
  <p>Loading...</p>
{/if}
