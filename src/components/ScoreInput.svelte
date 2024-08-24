<script lang="ts">
  import { createEventDispatcher } from "svelte";

  interface Score {
    userId: string;
    username: string;
    value: number;
    round: number;
  }

  export let currentRound: number = 1;
  export let userId: string;
  export let username: string;

  let currentInput: string = "";
  let errorMessage: string = "";

  const dispatch = createEventDispatcher<{
    submitScore: Score;
  }>();

  function addDigit(digit: number) {
    if (currentInput.length < 2) {
      currentInput += digit.toString();
    }
  }

  function clearInput() {
    currentInput = "";
    errorMessage = "";
  }

  function deleteLastDigit() {
    currentInput = currentInput.slice(0, -1);
  }

  function validateAndSubmit() {
    const scoreValue = parseInt(currentInput, 10);
    if (isNaN(scoreValue) || scoreValue < 0 || scoreValue > 99) {
      errorMessage = "スコアは0から99の間で入力してください。";
      return;
    }

    const score: Score = {
      userId,
      username,
      value: scoreValue,
      round: currentRound,
    };

    dispatch("submitScore", score);
    clearInput();
  }
</script>

<div class="score-input">
  <h2>スコア入力</h2>
  <p>現在のラウンド: {currentRound}</p>
  <div class="display">
    {currentInput || "00"}
  </div>
  <div class="numpad">
    {#each Array(9) as _, i}
      <button on:click={() => addDigit(i + 1)}>{i + 1}</button>
    {/each}
    <button on:click={clearInput}>C</button>
    <button on:click={() => addDigit(0)}>0</button>
    <button on:click={deleteLastDigit}>←</button>
  </div>
  <button class="submit" on:click={validateAndSubmit}>送信</button>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
</div>

<style>
  .score-input {
    margin: 20px;
    max-width: 300px;
  }
  .display {
    background-color: #f0f0f0;
    padding: 10px;
    font-size: 24px;
    text-align: right;
    margin-bottom: 10px;
  }
  .numpad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  button {
    padding: 15px;
    font-size: 18px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
  .submit {
    width: 100%;
    margin-top: 10px;
    background-color: #008cba;
  }
  .submit:hover {
    background-color: #007b9a;
  }
  .error {
    color: red;
    margin-top: 10px;
  }
</style>
