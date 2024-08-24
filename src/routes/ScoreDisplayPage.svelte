<script lang="ts">
  import ScoreDisplay from "../components/ScoreDisplay.svelte";
  import type { Score } from "../types/Score";

  // ダミーデータ（実際のアプリケーションでは、データベースやストアから取得します）
  let scores: Score[] = [
    { userId: "user1", username: "Judge 1", value: 85, round: 1 },
    { userId: "user2", username: "Judge 2", value: 90, round: 1 },
    // ... 他のスコア
  ];
</script>

<h1>スコア表示</h1>
<ScoreDisplay {scores} judgesCount={5} scoresUsed={3} />
