<script>
  let email = '';
  let content = '';

  async function handleSubmit() {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify({ email, content })
      });
      
      const result = await response.json();
      if (result.success) {
        alert('メールを送信しました！');
        email = '';
        content = '';
      }
    } catch (error) {
      alert('メール送信に失敗しました：' + error.message);
    }
  }
</script>

<main>
  <h1>メール送信フォーム</h1>
  
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="email">メールアドレス：</label>
      <input 
        type="email" 
        id="email" 
        bind:value={email} 
        required
      />
    </div>
    
    <div>
      <label for="content">内容：</label>
      <textarea 
        id="content" 
        bind:value={content} 
        required
      ></textarea>
    </div>
    
    <button type="submit">送信</button>
  </form>
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input, textarea {
    width: 100%;
    padding: 8px;
  }

  textarea {
    height: 150px;
  }

  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
</style>
