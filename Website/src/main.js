async function handleSaveButtonClick() {
  const text = getTextAreaValue();
  if (!text.trim()) {
    console.log('Textarea is empty. Nothing to save.');
    return;
  }

  const { title, fragments, descriptions } = processText(text);
  const prompt = createCompositePromptObject(1, title, "Sample Description");
  console.log('Prompt object:', prompt);

  try {
    const createdPrompt = await createCompositePrompt(prompt);
    console.log('Composite prompt created:', createdPrompt);

    await saveFragments(createdPrompt, fragments, descriptions);
    console.log('Prompt saved successfully!');
    return createdPrompt;
  } catch (error) {
    console.error('Error saving text:', error);
  }
}

function getTextAreaValue() {
  return document.getElementById('textarea').value;
}

function processText(text) {
  const fragments = text.split(/\n\n+/);
  const descriptions = [];
  const title = fragments[0].split('\n')[0];

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

  return { title, fragments, descriptions };
}

async function saveFragments(createdPrompt, fragments, descriptions) {
  for (const fragment of fragments) {
    const fragmentObject = createPromptFragmentObject(createdPrompt.author_id, fragment, descriptions[fragments.indexOf(fragment)]);
    const createdFragment = await createPromptFragment(fragmentObject);
    console.log('Fragment created:', createdFragment);
    await linkFragmentToCompositePrompt(createdPrompt.id, createdFragment.id, fragments.indexOf(fragment));
    console.log(`Linked fragment ${createdFragment.id} to composite prompt ${createdPrompt.id}`);
  }
}

document.getElementById('saveButton').addEventListener('click', async () => {
  const newPrompt = await handleSaveButtonClick();
  if (newPrompt) {
    await displayExpandedPrompt(newPrompt);
  }
});

async function displayExpandedPrompt(newPrompt) {
  const response = await getCompositePromptExpanded(newPrompt.id);
  const tags = await fetchTags();
  const allContent = response.fragments.map(fragment => fragment.content).join('\n\n');
  console.log('Expanded prompt:', response);

  clearTextArea();
  hideTextArea();
  displayFormContainer(response, tags, allContent);
}

function clearTextArea() {
  document.getElementById('textarea').value = '';
}

function hideTextArea() {
  document.getElementById('textarea').style.display = 'none';
}

function displayFormContainer(response, tags, allContent) {
  const formContainer = document.getElementById('formContainer');
  formContainer.innerHTML = ''; // Clear previous content

  const table = createTable(response, tags);
  formContainer.appendChild(table);

  const sendButton = createSendButton(allContent);
  formContainer.appendChild(sendButton);

  formContainer.style.display = 'block';
}

function createTable(response, tags) {
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
  return table;
}

function createSendButton(allContent) {
  const sendButton = document.createElement('button');
  sendButton.textContent = 'Send Prompt to Chat GPT';
  sendButton.addEventListener('click', () => {
    window.open(`https://chatgpt.com/?q=${encodeURIComponent(allContent)}`, '_blank');
  });
  return sendButton;
}