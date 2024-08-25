<script lang="ts">
  import { supabase } from "../lib/supabaseClient";
  import { authStore } from "../stores/authStore";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let loading: boolean = false;
  let errorMessage: string = "";
  let successMessage: string = "";

  // For signUp form
  let signUpUsername: string = "";
  let signUpEmail: string = "";
  let signUpPassword: string = "";
  let showSignUpPassword: boolean = false;

  // For login form
  let loginEmail: string = "";
  let loginPassword: string = "";
  let showLoginPassword: boolean = false;

  function handleError(error: unknown) {
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "An unknown error occurred";
    }
    console.error("Auth error:", error);
  }

  async function handleRegister(event: Event) {
    event.preventDefault();
    try {
      loading = true;
      errorMessage = "";
      successMessage = "";
      const { data, error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
        options: {
          data: { username: signUpUsername },
        },
      });

      if (error) throw error;

      successMessage = "登録が成功しました。確認メールをチェックしてください。";
    } catch (error) {
      handleError(error);
    } finally {
      loading = false;
    }
  }

  async function handleLogin(event: Event) {
    event.preventDefault();
    try {
      loading = true;
      errorMessage = "";
      successMessage = "";
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) throw error;
      successMessage = "ログイン成功";
      dispatch("signedIn");
    } catch (error: unknown) {
      handleError(error);
    } finally {
      loading = false;
    }
  }

  function handleSighOut() {
    loading = true;
    authStore
      .signOut()
      .then(() => {
        loading = true;
        dispatch("signedOut");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
        loading = false;
      });
  }

  function togglePasswordVisibility(formType: "signUp" | "login") {
    if (formType === "signUp") {
      showSignUpPassword = !showSignUpPassword;
    } else {
      showLoginPassword = !showLoginPassword;
    }
  }
</script>

<main>
  {#if $authStore.user}
    <div class="welcome-container">
      <p>{$authStore.user.username} ({$authStore.user.email})</p>
      <div class="button-container">
        <button
          on:click={handleSighOut}
          disabled={loading}
          class="logout-button"
        >
          {loading ? "ログアウト中..." : "ログアウト"}
        </button>
      </div>
    </div>
  {:else}
    <h2>ユーザー認証</h2>
    <div class="auth-forms">
      <form on:submit={handleRegister}>
        <h3>新規登録</h3>
        <input
          type="text"
          bind:value={signUpUsername}
          placeholder="ユーザー名"
          required
        />
        <input
          type="email"
          bind:value={signUpEmail}
          placeholder="メールアドレス"
          required
        />
        <div class="password-input">
          <input
            type="password"
            bind:value={signUpPassword}
            placeholder="パスワード"
            required
            class:show-password={showSignUpPassword}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "登録中..." : "登録"}
        </button>
      </form>

      <div class="divider"></div>

      <form on:submit={handleLogin}>
        <h3>ログイン</h3>
        <input
          type="email"
          bind:value={loginEmail}
          placeholder="メールアドレス"
          required
        />
        <div class="password-input">
          <input
            type="password"
            bind:value={loginPassword}
            placeholder="パスワード"
            required
            class:show-password={showLoginPassword}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "ログイン中..." : "ログイン"}
        </button>
      </form>
    </div>
  {/if}

  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
  {#if successMessage}
    <p class="success">{successMessage}</p>
  {/if}
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  .auth-forms {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
  }
  .divider {
    width: 1px;
    background-color: #ccc;
    align-self: stretch;
  }
  form {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
    max-width: 300px;
  }
  h3 {
    margin-bottom: 10px;
    color: #333;
  }
  input,
  button {
    padding: 10px;
    border: 1px sold #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  button {
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  button:hover {
    background-color: #45a049;
  }
  button:disabled {
    background-color: #cccccc;
  }
  .error {
    color: red;
    background-color: #131313;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
  }
  .success {
    color: green;
    background-color: #131313;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
  }
  .password-input {
    position: relative;
  }
  .password-input input {
    padding-right: 60px;
  }
  .welcome-container {
    margin-bottom: 20px;
  }
  .button-container {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  .logout-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
  }
  .logout-button {
    background-color: #f44336;
    color: white;
  }
  .logout-button:hover {
    background-color: #d32f2f;
  }
  .logout-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  @media (max-width: 600px) {
    .auth-forms {
      flex-direction: column;
      align-items: center;
    }
    .divider {
      width: 100%;
      height: 1px;
      margin: 20px 0;
    }
    form {
      width: 100%;
    }
    .password-input input {
      padding-right: 70px;
    }
  }
</style>
