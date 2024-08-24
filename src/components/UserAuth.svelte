<script lang="ts">
  // TypeScriptのコードをここに記述
  let username: string = "";
  let email: string = "";
  let password: string = "";

  function handleRegister() {
    // 登録ロジックをここに実装
  }

  function handleLogin() {
    // ログインロジックをここに実装
  }
</script>

<main>
  <h2>ユーザー認証</h2>

  <form on:submit|preventDefault={handleRegister}>
    <input
      type="text"
      bind:value={username}
      placeholder="ユーザー名"
      required
    />
    <input
      type="email"
      bind:value={email}
      placeholder="メールアドレス"
      required
    />
    <input
      type="password"
      bind:value={password}
      placeholder="パスワード"
      required
    />
    <button type="submit">登録</button>
  </form>

  <form on:submit|preventDefault={handleLogin}>
    <input
      type="email"
      bind:value={email}
      placeholder="メールアドレス"
      required
    />
    <input
      type="password"
      bind:value={password}
      placeholder="パスワード"
      required
    />
    <button type="submit">ログイン</button>
  </form>
</main>

<style>
  /* コンポーネント固有のスタイルをここに記述 */
</style>
