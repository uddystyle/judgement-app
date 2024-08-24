<script lang="ts">
  import { onMount } from "svelte";
  import type { Score } from "../types/Score";

  // プロパティの定義
  export let scores: Score[] = [];
  export let judgesCount: number = 5;
  export let scoresUsed: number = 3;

  let averageScore: number = 0;
  let sortColumn: keyof Score = "round";
  let sortDirection: "asc" | "desc" = "asc";

  // スコアの計算関数
  function calculateScore(scores: Score[]): number {
    if (scores.length < judgesCount) {
      return 0;
    }

    const sortedScores = scores.map((s) => s.value).sort((a, b) => b - a);
    const usedScores = sortedScores.slice(
      (judgesCount - scoresUsed) / 2,
      judgesCount - (judgesCount - scoresUsed) / 2
    );

    return usedScores.reduce((sum, score) => sum + score, 0) / scoresUsed;
  }

  function sortScores(column: keyof Score) {
    if (sortColumn === column) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      sortColumn = column;
      sortDirection = "asc";
    }

    scores = scores.sort((a, b) => {
      if (a[column] < b[column]) return sortDirection === "asc" ? -1 : 1;
      if (a[column] > b[column]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  // コンポーネントがマウントされたときに実行
  onMount(() => {
    averageScore = calculateScore(scores);
  });

  // スコアが変更されたときに再計算
  $: averageScore = calculateScore(scores);

  // ユニークなキーを生成する関数
  function generateKey(score: Score, index: number): string {
    return `${score.userId}-${score.round}-${index}`;
  }
</script>

<div class="score-display">
  <h2>スコア表示</h2>

  <table>
    <thead>
      <tr>
        <th on:click={() => sortScores("round")}>
          ラウンド {sortColumn === "round"
            ? sortDirection === "asc"
              ? "▲"
              : "▼"
            : ""}
        </th>
        <th on:click={() => sortScores("username")}>
          ユーザー名 {sortColumn === "username"
            ? sortDirection === "asc"
              ? "▲"
              : "▼"
            : ""}
        </th>
        <th on:click={() => sortScores("value")}>
          スコア {sortColumn === "value"
            ? sortDirection === "asc"
              ? "▲"
              : "▼"
            : ""}
        </th>
      </tr>
    </thead>
    <tbody>
      {#each scores as score, index (generateKey(score, index))}
        <tr>
          <td>{score.round}</td>
          <td>{score.username}</td>
          <td>{score.value}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="average-score">
    <h3>平均スコア: {averageScore.toFixed(2)}</h3>
    <p>※ {judgesCount}審{scoresUsed}採で計算</p>
  </div>
</div>

<style>
  .score-display {
    margin: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  .average-score {
    margin-top: 20px;
  }
</style>
