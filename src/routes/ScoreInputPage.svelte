<script lang="ts">
  import ScoreInput from "../components/ScoreInput.svelte";
  import type { Score } from "../types/Score";

  let currentRound: number = 1;
  let userId: string = "user123";
  let username: string = "Judge 1";

  function handleScoreSubmit(event: CustomEvent<Score>) {
    const score = event.detail;
    console.log("Submitted score:", score);
    // ここでスコアを保存したり、他のコンポーネントに渡したりします
  }
</script>

<h1>スコア入力</h1>
<ScoreInput
  {currentRound}
  {userId}
  {username}
  on:submitScore={handleScoreSubmit}
/>
