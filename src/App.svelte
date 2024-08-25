<script lang="ts">
  import { Router, Link, Route, navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { authStore } from "./stores/authStore";
  import UserAuth from "./components/UserAuth.svelte";
  import GroupManagement from "./components/GroupManagement.svelte";
  import ScoringSession from "./components/ScoringSession.svelte";
  import ScoreInput from "./components/ScoreInput.svelte";
  import ScoreDisplay from "./components/ScoreDisplay.svelte";
  import ReportGeneration from "./components/ReportGeneration.svelte";
  import Home from "./routes/Home.svelte";
  import type { Score } from "./types/Score";

  export let url = "";

  let currentRound: number = 1;
  let userId: string = "user123";
  let username: string = "Judge 1";

  function handleScoreSubmit(event: CustomEvent<Score>) {
    const score = event.detail;
    console.log("Submitted score:", score);
  }

  function handleSignedIn() {
    console.log("User signed in");
    navigate("/");
  }

  function handleSignedOut() {
    console.log("User signed out");
    navigate("/");
  }

  function handleNavigateHome() {
    console.log("Navigating home");
    navigate("/");
  }

  onMount(() => {
    const unsubscribe = authStore.subscribe((state) => {
      console.log("Auth state changed:", state);
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<Router {url}>
  <main>
    <nav>
      {#if $authStore.user}
        <Link to="/">Home</Link>
        <Link to="/group">Group</Link>
        <Link to="/scoring">Scoring</Link>
        <Link to="/report">Report</Link>
        <span class="user-info">
          <UserAuth on:signedOut={handleSignedOut} />
        </span>
      {:else}
        <span class="auth-button">
          <UserAuth on:signedIn={handleSignedIn} />
        </span>
      {/if}
    </nav>

    <div class="content">
      {#if $authStore.user}
        <Route path="/" component={Home} />
        <Route path="/group" component={GroupManagement} />
        <Route path="/scoring">
          <ScoringSession />
          <ScoreInput
            {currentRound}
            {userId}
            {username}
            on:submitScore={handleScoreSubmit}
          />
          <ScoreDisplay />
        </Route>
        <Route path="/report" component={ReportGeneration} />
      {:else}
        <Home />
      {/if}
    </div>
  </main>
</Router>

<style>
  main {
    padding: 1rem;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .auth-button {
    margin-left: auto;
  }
  :global(nav a) {
    padding: 0.5rem;
    color: #333;
    text-decoration: none;
    margin-right: 10px;
  }
  :global(nav a:hover) {
    background-color: #ddd;
  }
  .content {
    margin-top: 2rem;
  }
</style>
