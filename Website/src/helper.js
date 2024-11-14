//constructors for the objects
/**
 * @typedef {Object} Author
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} PromptFragment
 * @property {number} authorId
 * @property {string} content
 * @property {string} description
 */

/**
 * @typedef {Object} Tag
 * @property {string} name
 * @property {string} color
 * @property {string} description
 */

/**
 * @typedef {Object} CompositePrompt
 * @property {number} authorId
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} ResultExample
 * @property {number} compositePromptId
 * @property {string} resultContent
 */

/**
 * @typedef {Object} ContextFile
 * @property {number} compositePromptId
 * @property {string} filename
 * @property {string} filePath
 * @property {string} description
 */

/**
 * @param {number} id
 * @param {string} name
 * @returns {Author}
 */
const createAuthorObject = (id, name) => {
    return { id, name };
};

/**
 * @param {number} authorId
 * @param {string} content
 * @param {string} description
 * @returns {PromptFragment}
 */
const createPromptFragmentObject = (authorId, content, description) => {
    return { authorId, content, description };
};

/**
 * @param {string} name
 * @param {string} color
 * @param {string} description
 * @returns {Tag}
 */
const createTagObject = (name, color, description) => {
    return { name, color, description };
};

/**
 * @param {number} authorId
 * @param {string} title
 * @param {string} description
 * @returns {CompositePrompt}
 */
const createCompositePromptObject = (authorId, title, description) => {
    return { authorId, title, description };
};

/**
 * @param {number} compositePromptId
 * @param {string} resultContent
 * @returns {ResultExample}
 */
const createResultExampleObject = (compositePromptId, resultContent) => {
    return { compositePromptId, resultContent };
};

/**
 * @param {number} compositePromptId
 * @param {string} filename
 * @param {string} filePath
 * @param {string} description
 * @returns {ContextFile}
 */
const createContextFileObject = (compositePromptId, filename, filePath, description) => {
    return { compositePromptId, filename, filePath, description };
};

// Authors

const fetchAuthors = async () => {
    const response = await fetch('http://localhost:8000/authors');
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching authors');
    }
};

const createAuthor = async (author) => {
    const response = await fetch('http://localhost:8000/authors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author_id: author.id,
            name: author.name
        })
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error creating author');
    }
};

const getAuthor = async (id) => {
    const response = await fetch(`http://localhost:8000/authors/${id}`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching author');
    }
};

const updateAuthor = async (id, author) => {
    const response = await fetch(`http://localhost:8000/authors/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": author
        })
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error updating author');
    }
};

const deleteAuthor = async (id) => {
    const response = await fetch(`http://localhost:8000/authors/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        return;
    } else {
        throw new Error('Error deleting author');
    }
};

// Prompt Fragments
const fetchPromptFragments = async () => {
    const response = await fetch('http://localhost:8000/prompt_fragments');
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching prompt fragments');
    }
};

const createPromptFragment = async (fragment) => {
    const response = await fetch('http://localhost:8000/prompt_fragments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author_id: fragment.authorId,
            content: fragment.content,
            description: fragment.description
          })
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorMessage = `Error creating prompt fragment: ${JSON.stringify(fragment)}`;
        throw new Error(errorMessage);
    }
};

const getPromptFragment = async (id) => {
    const response = await fetch(`http://localhost:8000/prompt_fragments/${id}`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching prompt fragment');
    }
};

const updatePromptFragment = async (id, fragment) => {
    const response = await fetch(`http://localhost:8000/prompt_fragments/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author_id: fragment.authorId,
            content: fragment.content,
            description: fragment.description // Add a description if needed
        })
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error updating prompt fragment');
    }
};

const deletePromptFragment = async (id) => {
    const response = await fetch(`http://localhost:8000/prompt_fragments/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        return;
    } else {
        throw new Error('Error deleting prompt fragment');
    }
};

const getPromptFragmentWithTags = async (id) => {
    const response = await fetch(`http://localhost:8000/prompt_fragments/${id}/with_tags`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching prompt fragment with tags');
    }
};

const linkTagToPromptFragment = async (fragmentId, tagId) => {
    const response = await fetch(`http://localhost:8000/prompt_fragments/${fragmentId}/tags/${tagId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        return;
    } else {
        throw new Error('Error linking tag to prompt fragment');
    }
};

const unlinkTagFromPromptFragment = async (fragmentId, tagId) => {
    const response = await fetch(`http://localhost:8000/prompt_fragments/${fragmentId}/tags/${tagId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        return;
    } else {
        throw new Error('Error unlinking tag from prompt fragment');
    }
};

// Tags
const fetchTags = async () => {
    const response = await fetch('http://localhost:8000/tags');
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching tags');
    }
};

const createTag = async (tag) => {
    const response = await fetch('http://localhost:8000/tags', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: tag.name,
            content: tag.color,
            description: tag.description 
        })
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error creating tag');
    }
};

const getTag = async (id) => {
    const response = await fetch(`http://localhost:8000/tags/${id}`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching tag');
    }
};

const updateTag = async (id, tag) => {
    const response = await fetch(`http://localhost:8000/tags/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: tag.name,
            content: tag.color,
            description: tag.description 
        })
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error updating tag');
    }
};

const deleteTag = async (id) => {
    const response = await fetch(`http://localhost:8000/tags/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        return;
    } else {
        throw new Error('Error deleting tag');
    }
};

// Composite Prompts
const fetchCompositePrompts = async () => {
    const response = await fetch('http://localhost:8000/composite_prompts');
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching composite prompts');
    }
};

const createCompositePrompt = async (prompt) => {
    const response = await fetch('http://localhost:8000/composite_prompts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "author_id": prompt.authorId,
            "title": prompt.title,
            "description": prompt.description
        })
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error creating composite prompt');
    }
};

const getCompositePrompt = async (id) => {
    const response = await fetch(`http://localhost:8000/composite_prompts/${id}`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching composite prompt');
    }
};

const updateCompositePrompt = async (id, prompt) => {
    const response = await fetch(`http://localhost:8000/composite_prompts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "author_id": prompt.authorId,
            "title": prompt.title,
            "description": prompt.description 
        })
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error updating composite prompt');
    }
};

const deleteCompositePrompt = async (id) => {
    const response = await fetch(`http://localhost:8000/composite_prompts/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        return;
    } else {
        throw new Error('Error deleting composite prompt');
    }
};

const getCompositePromptExpanded = async (id) => {
    const response = await fetch(`http://localhost:8000/composite_prompts/${id}/expanded`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching expanded composite prompt');
    }
};

const linkFragmentToCompositePrompt = async (compositeId, fragmentId, order) => {
    const response = await fetch(`http://localhost:8000/composite_prompts/${compositeId}/fragments/${fragmentId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            order_index: order 
        })
    });
    if (response.ok) {
        console.log("I worked");
        return;
    } else {
        throw new Error('Error linking fragment to composite prompt');
    }
};

const unlinkFragmentFromCompositePrompt = async (compositeId, fragmentId) => {
    const response = await fetch(`http://localhost:8000/composite_prompts/${compositeId}/fragments/${fragmentId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        return;
    } else {
        throw new Error('Error unlinking fragment from composite prompt');
    }
};

const updateFragmentOrderInCompositePrompt = async (compositeId, fragmentId, order) => {
    const response = await fetch(`http://localhost:8000/composite_prompts/${compositeId}/fragments/${fragmentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            order_index: order 
        })
    });
    if (response.ok) {
        return;
    } else {
        throw new Error('Error updating fragment order in composite prompt');
    }
};

// Result Examples
const fetchResultExamples = async () => {
    const response = await fetch('http://localhost:8000/result_examples');
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching result examples');
    }
};

const createResultExample = async (example) => {
    const response = await fetch('http://localhost:8000/result_examples', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "composite_prompt_id": example.compositePromptId,
            "result_content": example.resultContent,
        })
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error creating result example');
    }
};

const getResultExample = async (id) => {
    const response = await fetch(`http://localhost:8000/result_examples/${id}`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching result example');
    }
};

const updateResultExample = async (id, example) => {
    const response = await fetch(`http://localhost:8000/result_examples/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "composite_prompt_id": example.compositePromptId,
            "result_content": example.resultContent,
        })
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error updating result example');
    }
};

const deleteResultExample = async (id) => {
    const response = await fetch(`http://localhost:8000/result_examples/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        return;
    } else {
        throw new Error('Error deleting result example');
    }
};

// Context Files
const fetchContextFiles = async () => {
    const response = await fetch('http://localhost:8000/context_files');
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching context files');
    }
};

const createContextFile = async (file) => {
    const response = await fetch('http://localhost:8000/context_files', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "composite_prompt_id": file.compositePromptId,
            "filename": file.filename,
            "file_path": file.filePath,
            "description": file.description
          })
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error creating context file');
    }
};

const getContextFile = async (id) => {
    const response = await fetch(`http://localhost:8000/context_files/${id}`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching context file');
    }
};

const updateContextFile = async (id, file) => {
    const response = await fetch(`http://localhost:8000/context_files/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "composite_prompt_id": file.compositePromptId,
            "filename": file.filename,
            "file_path": file.filePath,
            "description": file.description
          })
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error updating context file');
    }
};

const deleteContextFile = async (id) => {
    const response = await fetch(`http://localhost:8000/context_files/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        return;
    } else {
        throw new Error('Error deleting context file');
    }
};
