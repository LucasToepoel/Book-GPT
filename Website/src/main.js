
  async function handleSaveButtonClick() {
    const text = document.getElementById('textarea').value;
    if (!text.trim()) {
      console.log('Textarea is empty. Nothing to save.');
      return;
    }
    const fragments = text.split(/\n\n+/);
    const descriptions = [];

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
    const prompt = createCompositePromptObject(1, "Sample Title", "Sample Description");
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
    const response = await handleSaveButtonClick();
  console.log('Result:', response);
  });