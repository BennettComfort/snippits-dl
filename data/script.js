const codeInput = document.getElementById('code-input');
const codePreview = document.getElementById('code-preview');
const downloadBtn = document.getElementById('download-btn');

codeInput.addEventListener('input', () => {
    const code = codeInput.value;
    const language = detectLanguage(code);
    codePreview.className = `language-${language}`;
    codePreview.textContent = code;
    hljs.highlightElement(codePreview);
});

downloadBtn.addEventListener('click', () => {
    html2canvas(codePreview).then(canvas => {
        canvas.toBlob(blob => {
            saveAs(blob, "code-snippet.png");
        });
    });
});

function detectLanguage(code) {
    // Very basic language detection based on keywords
    if (code.includes('function') || code.includes('const') || code.includes('let')) {
        return 'javascript';
    } else if (code.includes('def') || code.includes('import')) {
        return 'python';
    } else if (code.includes('<div') || code.includes('<html>')) {
        return 'html';
    } else {
        return 'plaintext'; // Default
    }
}