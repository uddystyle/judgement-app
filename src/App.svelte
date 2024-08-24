<script lang="ts">
  import UserAuth from './components/UserAuth.svelte';
  import GroupManagement from './components/GroupManagement.svelte';
  import ScoringSession from './components/ScoringSession.svelte';
  import ScoreInput from './components/ScoreInput.svelte';
  import ScoreDisplay from './components/ScoreDisplay.svelte';
  import ReportGeneration from './components/ReportGeneration.svelte';

  // ここに必要なロジックを追加
  let isLoggedIn = false; // 例: ログイン状態を管理する変数
</script>

<main>
  <h1>スコアリングアプリ</h1>

  {#if !isLoggedIn}
    <UserAuth />
  {:else}
    <nav>
      <!-- ナビゲーションメニューなど -->
    </nav>

    <GroupManagement />
    <ScoringSession />
    <ScoreInput />
    <ScoreDisplay />
    <ReportGeneration />
  {/if}
</main>

<style>
  /* スタイルをここに追加 */
</style>