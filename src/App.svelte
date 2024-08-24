<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import UserAuth from "./components/UserAuth.svelte";
  import GroupManagement from "./components/GroupManagement.svelte";
  import ScoringSession from "./components/ScoringSession.svelte";
  import ScoreInput from "./components/ScoreInput.svelte";
  import ScoreDisplay from "./components/ScoreDisplay.svelte";
  import ReportGeneration from "./components/ReportGeneration.svelte";
  import Home from "./routes/Home.svelte";
  import type { Score } from "./types/Score";

  export let url = "";

  let isLoggedIn = false; // 例: ログイン状態を管理する変数

  let currentRound: number = 1;
  let userId: string = "user123";
  let username: string = "Judge 1";

  function handleScoreSubmit(event: CustomEvent<Score>) {
    const score = event.detail;
    console.log("Submitted score:", score);
  }
</script>

<Router {url}>
  <main>
    <h1>スコアリングアプリ</h1>

    {#if !isLoggedIn}
      <UserAuth />
    {:else}
      <nav>
        <Link to="/">ホーム</Link>
        <Link to="/group">グループ管理</Link>
        <Link to="/scoring">スコアリング</Link>
        <Link to="/report">レポート生成</Link>
      </nav>

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
    {/if}
  </main>
</Router>

<style>
  nav {
    padding: 1rem;
    background-color: #f0f0f0;
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
  main {
    padding: 1rem;
  }
</style>
