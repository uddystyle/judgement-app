<script lang="ts">
  import { onMount } from "svelte";
  import type { Score } from "../types/Score";

  // def property
  export let scores: Score[] = [];
  export let judgesCount: number = 5;
  export let scoresUsed: number = 3;

  let averageScore: number = 0;
  let sortColumn: keyof Score = "round";
  let sortDirection: "asc" | "desc" = "asc";

  // calculate Score
  function calculateScore(scores: Score[]): number {
    if (scores.length < judgesCount) {
      return 0;
    }

    const sortedScores = scores.map((s) => s.value).sort((a, b) => b - a);
    const usedScores = sortedScores.slice(
      (judgesCount - scoresUsed) / 2,
      judgesCount - (judgesCount - scoresUsed) / 2,
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

  // run when component is mounted
  onMount(() => {
    averageScore = calculateScore(scores);
  });

  // Recalculate when score changes
  $: averageScore = calculateScore(scores);

  // function to generate unique keys
  function generateKey(score: Score, index: number): string {
    return `${score.userId}-${score.round}-${index}`;
  }
</script>

<div class="score-display">
  <h2>Display Score</h2>

  <table>
    <thead>
      <tr>
        <th on:click={() => sortScores("round")}>
          Round {sortColumn === "round"
            ? sortDirection === "asc"
              ? "▲"
              : "▼"
            : ""}
        </th>
        <th on:click={() => sortScores("username")}>
          User name {sortColumn === "username"
            ? sortDirection === "asc"
              ? "▲"
              : "▼"
            : ""}
        </th>
        <th on:click={() => sortScores("value")}>
          Score {sortColumn === "value"
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
    <h3>Averaee Score: {averageScore.toFixed(2)}</h3>
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
