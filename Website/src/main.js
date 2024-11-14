
  async function handleSaveButtonClick() {
    const text = document.getElementById('textarea').value;
    if (!text.trim()) {
      console.log('Textarea is empty. Nothing to save.');
      return;
    }
    const fragments = text.split(/\n\n+/);
    const descriptions = [];

    const title = fragments[0].split('\n')[0]; // Get the first line as the title without removing it from the fragment

    for (let i = 0; i < fragments.length; i++) {
      const lines = fragments[i].split('\n');
      const lastLine = lines[lines.length - 1];
      if (lastLine.startsWith('//')) {
      descriptions.push(lastLine);
      lines.pop();
      fragments[i] = lines.join('\n');
      } else {
      descriptions.push('');
      }
    }
    const prompt = createCompositePromptObject(1, title, "Sample Description");
    console.log('Prompt object:', prompt); 
    const createdPrompt = await createCompositePrompt(prompt);
    console.log('Composite prompt created:', createdPrompt);
    try {
      for (const fragment of fragments) {
        const fragmentObject = createPromptFragmentObject(createdPrompt.author_id, fragment, descriptions[fragments.indexOf(fragment)]);
        const createdFragment = await createPromptFragment(fragmentObject);
        console.log('Fragment created:', createdFragment);
        await linkFragmentToCompositePrompt(createdPrompt.id, createdFragment.id, fragments.indexOf(fragment));
        console.log(`Linked fragment ${createdFragment.id} to composite prompt ${createdPrompt.id}`);
      }
      console.log('Prompt saved successfully!');
      return createdPrompt;
    } catch (error) {
      console.error('Error saving text:', error);
    }
  }

  document.getElementById('saveButton').addEventListener('click', async () => {
    const newprompt = await handleSaveButtonClick();
    const response = await getCompositePromptExpanded(newprompt.id);
    const tags = await fetchTags();
    const allContent = response.fragments.map(fragment => fragment.content).join('\n\n');
    console.log('Expanded prompt:', response);
    document.getElementById('textarea').value = '';
    document.getElementById('textarea').style.display = 'none';

    const formContainer = document.getElementById('formContainer');
    const table = document.createElement('table');
    table.className = 'table';
    table.innerHTML = `
      <thead>
      <tr>
        <th>Tags</th>
        <th><textarea style="width: 100%; height: auto;">${response.title}</textarea></th>
        <th><textarea style="width: 100%; height: auto;">${response.description}</textarea></th>
      </tr>
      </thead>
      <tbody>
      ${response.fragments.map(fragment => `
      <tr>
        <td>
        <select>
          ${tags.map(tag => `<option value="${tag.name}">${tag.name}</option>`).join('')}
        </select>
        </td>
        <td><textarea style="width: 100%; height: auto;">${fragment.content}</textarea></td>
        <td><textarea style="width: 100%; height: auto;">${fragment.description}</textarea></td>
      </tr>
      `).join('')}
      </tbody>
        `;
   formContainer.appendChild(table);
    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send Prompt to Chat GPT';
    sendButton.addEventListener('click', async () => {
      window.open(`https://chatgpt.com/?q=${encodeURIComponent(allContent)}`, '_blank');
    });
    formContainer.appendChild(sendButton);
    document.getElementById('textarea').style.display = 'none';
    formContainer.style.display = 'block';
  });