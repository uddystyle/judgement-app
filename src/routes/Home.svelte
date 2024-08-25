<script lang="ts">
  import { Link } from "svelte-routing";
  import { fly } from "svelte/transition";

  let features = [
    {
      title: "スコア入力",
      description: "簡単な数字キーパッドでスコアを素早く入力",
      icon: "📝",
    },
    {
      title: "リアルタイム集計",
      description: "入力されたスコアをリアルタイムで集計",
      icon: "📊",
    },
    {
      title: "柔軟な採点方式",
      description: "n審n採に対応した柔軟な採点システム",
      icon: "🔢",
    },
    {
      title: "データエクスポート",
      description: "集計結果をExcelで簡単エクスポート",
      icon: "📁",
    },
  ];
</script>

<main in:fly={{ y: 50, duration: 500 }}>
  <h1>スコアリングアプリへようこそ</h1>

  <p class="intro">
    このアプリケーションは、グループ内でのスコアリングを簡単かつ効率的に行うためのツールです。
    様々な採点方式に対応し、リアルタイムで結果を確認できます。
  </p>

  <div class="cta-buttons">
    <Link to="/score-input" class="button primary">スコア入力を開始</Link>
    <Link to="/score-display" class="button secondary">過去のスコアを表示</Link>
  </div>

  <h2>主な機能</h2>
  <div class="features">
    {#each features as feature}
      <div class="feature-card">
        <div class="feature-icon">{feature.icon}</div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    {/each}
  </div>

  <footer>
    <p>
      さあ、スコアリングを始めましょう！右上のメニューからナビゲートできます。
    </p>
  </footer>
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    color: #333;
    text-align: center;
  }

  .intro {
    text-align: center;
    margin-bottom: 30px;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 40px;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .feature-card {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
  }

  .feature-icon {
    font-size: 2em;
    margin-bottom: 10px;
  }

  footer {
    margin-top: 40px;
    text-align: center;
    color: #666;
  }
</style>
