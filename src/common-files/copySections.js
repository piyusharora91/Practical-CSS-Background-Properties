//copy text to clipboard 
const copyParticularSectionToClipBoard = (targetText) => {
    if (targetText) {
        navigator.clipboard.writeText(targetText).then(() => {
            alert('Data Copied')
        })
    }
}

export default copyParticularSectionToClipBoard;